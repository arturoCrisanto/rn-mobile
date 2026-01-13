import { styles } from '@/assets/styles/home.styles.js'
import { COLORS } from '@/constants/colors.js'
import { formatAmount } from '@/lib/utils.js'
import { Text, View } from 'react-native'

const BalanceCard = ({ summary }) => {
  return (
    <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Total Balance</Text>
        <Text style={styles.balanceAmount}>₱{formatAmount(summary.balance)}</Text>

        <View style={styles.balanceStats}>
            {/* this is the Income */}
            <View style={styles.balanceStatItem}>
                <Text style={styles.balanceStatLabel}>Income</Text>
                <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
                    +₱{formatAmount(summary.income)}
                </Text>
            </View>
            {/* this is the divider */}
            <View style={[styles.balanceStatItem, styles.statDivider]}/>


                {/* this is the Expense */}
            <View style={styles.balanceStatItem}>
                <Text style={styles.balanceStatLabel}>Expense</Text>
                <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
                    -₱{formatAmount(Math.abs(summary.expenses))}
                </Text>
            </View>
        </View>



    </View>
  )
}

export default BalanceCard