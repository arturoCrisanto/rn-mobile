import { styles } from '@/assets/styles/home.styles.js';
import { COLORS } from '@/constants/colors.js';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const NoTransactionFound = () => {
    const router = useRouter();
  return (
    <View style={styles.emptyState}>
        <Ionicons 
        name="receipt-outline" 
        size={60} 
        color={COLORS.textLight}
        style={styles.emptyStateIcon} />
        <Text style={styles.emptyStateTitle}>No transactions yet!</Text>
        <Text style={styles.emptyStateText}>
        Start adding your expenses and income to see them listed here.
        </Text>
        <Pressable style={styles.emptyStateButton} onPress={() => router.push('/create')}>
            <Ionicons name="add-circle" size={20} color={COLORS.white} />
            <Text style={styles.emptyStateButtonText}>Add Transaction</Text>
        </Pressable>
    </View>
  )
}

export default NoTransactionFound