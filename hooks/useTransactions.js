import logger from "@/lib/logger";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);

  // usecallback is used to memoize the fetchTransactions function and performace optimization
  const fetchTransactions = useCallback(async () => {
    if (!userId) {
      logger.warn("Skipping fetchTransactions: userId is undefined");
      return;
    }

    try {
      const url = `${API_URL}/api/transactions/${userId}`;
      logger.info("Fetching transactions from:", url);
      const response = await fetch(url);

      if (!response.ok) {
        const text = await response.text();
        logger.error(`API Error (${response.status}):`, text.substring(0, 200));
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      logger.error("Error fetching transactions:", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    if (!userId) {
      logger.warn("Skipping fetchSummary: userId is undefined");
      return;
    }

    try {
      const url = `${API_URL}/api/transactions/summary/${userId}`;
      logger.info("Fetching summary from:", url);
      const response = await fetch(url);

      if (!response.ok) {
        const text = await response.text();
        logger.error(`API Error (${response.status}):`, text.substring(0, 200));
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      // Extract the data object from the API response
      setSummary(data.data || data);
    } catch (error) {
      logger.error("Error fetching summary:", error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    try {
      // Fetch transactions and summary in parallel for efficiency
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      logger.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete transaction");
      // Refresh transactions and summary after deletion
      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      logger.error("Error deleting transaction:", error);
      Alert.alert("Error", "Failed to delete transaction");
    }
  };

  return {
    transactions,
    summary,
    loading,
    loadData,
    deleteTransaction,
  };
};
