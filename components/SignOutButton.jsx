import { styles } from '@/assets/styles/home.styles.js'
import { COLORS } from '@/constants/colors.js'
import logger from '@/lib/logger'
import { useClerk } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Alert, TouchableOpacity } from 'react-native'

export const SignOutButton = () => {
 
  const { signOut } = useClerk();

  const handleSignOut = async () => {Alert.alert(
    "Confirm Sign Out",
    "Are you sure you want to sign out to Wallet?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            signOut();
          } catch (err) {
            logger.error('Error during sign-out:', err)
          }
        }
      }
    ]
  )
}


  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
      <Ionicons name="log-out-outline" size={24} color={COLORS.text} />
    </TouchableOpacity>
  )
}