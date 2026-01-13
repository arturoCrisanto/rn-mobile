import { styles } from '@/assets/styles/home.styles.js';
import { COLORS } from '@/constants/colors.js';
import { formatAmount, formatDate } from '@/lib/utils.js';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';


// Map categories to their respective icons
const CATEGORY_ICONS = {
  "Food & Drinks": "fast-food",
  Shopping: "cart",
  Transportation: "car",
  Entertainment: "film",
  Bills: "receipt",
  Income: "cash",
  Other: "ellipsis-horizontal",
};


export const TransactionItem = ({ item, onDelete }) => {
const isIncome = parseFloat(item.amount) >= 0;
const iconName = CATEGORY_ICONS[item.category] || "pricetag-outline";

    return (
    <View style={styles.transactionCard}>
        <TouchableOpacity style={styles.transactionContent}>

            {/* this is for category icon */}
            <View style={styles.categoryIconContainer}>
                <Ionicons
                name={iconName}
                size={22}
                color={isIncome ? COLORS.income : COLORS.expense}
                />
            </View>

            {/* this is for transaction details */}
            <View style={styles.transactionLeft}>
                <Text style={styles.transactionTitle}>{item.title}</Text>
                <Text style={styles.transactionCategory}>{item.category}</Text>
            </View>
            {/* this is for the transaction amount and date */}
            <View style={styles.transactionRight}>
                <Text
                 style={[styles.transactionAmount, { color: isIncome ? COLORS.income : COLORS.expense }]}
                >
                {isIncome ? "+₱" : "-₱"}{formatAmount(Math.abs(parseFloat(item.amount)))}
                </Text>
                <Text style={styles.transactionDate}>{formatDate(item.created_at)}</Text>
            </View>
        </TouchableOpacity>
        {/* this is for the delete button */}
        {/* item._id is for the unique identifier of the transaction in the mongodb ._id */}
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item._id)}>
            <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
        </TouchableOpacity>
    </View>
    );

}