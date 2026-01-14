import SafeScreen from "@/components/SafeScreen.jsx";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Slot } from "expo-router";


export default function RootLayout() {
  return (
    // this the ClerkProvider to provide authentication context
    <ClerkProvider tokenCache={tokenCache}>
      {/* this is the SafeScreen component to provide safe area view */}
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </ClerkProvider>
  )
}