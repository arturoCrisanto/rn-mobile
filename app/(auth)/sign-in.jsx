import { styles } from '@/assets/styles/auth.style.js';
import { COLORS } from '@/constants/colors.js';
import logger from '@/lib/logger';
import { useSignIn } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export default function Page() {
  const { signIn, setActive, isLoaded } =useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] =useState('')
  const [password, setPassword] =useState('')
  const [error, setError] = useState("")

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        setError('Additional authentication steps are required. Please try again.')
        logger.error('Sign-in incomplete:', JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      if (err.errors && err.errors.length > 0) {
        const errorMessages = err.errors.map(e => e.longMessage).join('\n');
        setError(errorMessages);
      } else {
        setError('Verification failed. Please try again.');
      }
    }
  }
 
  return (
    <KeyboardAwareScrollView
    style={{flex: 1}}
    contentContainerStyle={{ flexGrow: 1 }}
    enableOnAndroid={true}
    enableAutomaticScroll={true}
    extraScrollHeight={100}
    >
      <View style={styles.container} >
         <Image
           source={require("../../assets/images/revenue-i4.png")}
           style={styles.illustration}
           contentFit="contain"
         />

          {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={() => setError("")}>
                  <Ionicons name="close" size={20} color={COLORS.textLight} />
                </TouchableOpacity>
              </View>
          ) : null}

        <Text style={styles.title}>Welcome back</Text>
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholderTextColor="#9A8478"
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
        />
          <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
            <TouchableOpacity onPress={onSignInPress} style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>


        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/sign-up')}>
            <Text style={styles.linkText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}