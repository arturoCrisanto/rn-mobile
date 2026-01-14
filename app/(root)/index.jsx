import { styles } from '@/assets/styles/home.styles.js'
import BalanceCard from '@/components/BalanceCard.jsx'
import NoTransactionFound from '@/components/NoTransactionFound.jsx'
import PageLoader from '@/components/PageLoader'
import { SignOutButton } from '@/components/SignOutButton.jsx'
import { TransactionItem } from '@/components/TransactionItem.jsx'
import { COLORS } from '@/constants/colors.js'
import { extractUsername } from '@/lib/utils.js'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { Alert, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import { useTransactions } from '../../hooks/useTransactions'

export default function Page() {
  // this is for fetching user data from clerk
  const { user } = useUser()
  const router = useRouter()
  const [refreshing, setRefreshing] =useState(false);

  const {transactions, summary, loading, loadData, deleteTransaction} = useTransactions(user?.id)

  // Memoize the username extraction to avoid unnecessary recalculations
  // used the extractUsername utility function to get username from user object
  const username = useMemo(() => extractUsername(user), [user])

  // this is the onRefresh function to handle pull to refresh
  // this is used to refresh the data when user pulls down the list
  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }

// this  is the useEffect to load data on component mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = async (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteTransaction(id);
          }
        }
      ]
    )
  }

  // the simple logic of this is if loading and not refreshing then show the page loader
 if(loading && !refreshing) return <PageLoader />

  return (
    <View style={styles.container}>
      {/* this is the main content container */}
      <View style={styles.content}>
            {/* header */}
            <View style={styles.header}>
            {/*LEFT*/}
            <View style={styles.headerLeft}>
                <Image 
                source={require('@/assets/images/logo.png')}
                style={styles.headerLogo}
                contentFit='contain'
                />
                <View style={styles.welcomeContainer}>
                  <Text style={styles.welcomeText}>Welcome</Text>
                  {/* this is the username text that is displayed below the welcome message */}
                  <Text style={styles.usernameText}>
                    {/* this is the username extracted from the user object from above */}
                    {username}
                  </Text>

                </View>
            </View>
            {/*RIGHT*/}
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.addButton} onPress={() => router.push('/create')}>
                <Ionicons name="add" size={24} color={COLORS.white} />
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
              <SignOutButton />
            </View>
          </View>

          {/* this is the Balance Card for the summary */}
      <BalanceCard summary={summary} />

      <View style={styles.transactionsHeaderContainer}>
        <Text style={styles.sectionTitle}>
          Recent Transactions
        </Text>

      </View>

      </View>

      <FlatList
      // this is for the list of transaction styles for the FlatList
      style={styles.transactionsList}
      // this is for the container that holds all the transaction items
      contentContainerStyle={styles.transactionsListContent}
      data={transactions}
      // this is to render each transaction item
      renderItem={({item})=>(
        <TransactionItem item={item} onDelete={handleDelete} />
      )}
      // this is for the list empty component
      ListEmptyComponent={<NoTransactionFound />}
      // this is to remove the scroll indicator
      showsVerticalScrollIndicator={false}

      //the refresh control is from react native to handle pull to refresh
      // not a component
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      /> 
    </View>
  )
}
