import { styles } from '@/assets/styles/home.styles.js'
import BalanceCard from '@/components/BalanceCard.jsx'
import PageLoader from '@/components/PageLoader'
import { SignOutButton } from '@/components/SignOutButton.jsx'
import { COLORS } from '@/constants/colors.js'
import { extractUsername } from '@/lib/utils.js'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useEffect, useMemo } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useTransactions } from '../../hooks/useTransactions'

export default function Page() {
  const { user } = useUser()
  const router = useRouter()
  const {transactions, summary, loading, loadData, deleteTransaction} = useTransactions(user?.id)

  // Memoize the username extraction to avoid unnecessary recalculations
  // used the extractUsername utility function to get username from user object
  const username = useMemo(() => extractUsername(user), [user])

  useEffect(() => {
    loadData();
  }, [loadData]);

 if(loading) return <PageLoader />

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
                  <Text style={styles.usernameText}>
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
      style={styles.transactionsList}
      contentContainerStyle={styles.transactionsListContent}
      data={transactions}
      renderItem={({item})=>(
        <TransactionItem item={item} onDelete={handleDelete} />
      )}


      /> 
    </View>
  )
}
