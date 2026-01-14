# RN Wallet (mobile)

React Native + Expo app for a personal wallet dashboard. Users sign in with Clerk, view income/expense summaries, browse transactions from the wallet API, and remove entries. Built with Expo Router and runs on iOS, Android, and web.

## Features

- Email/password auth via Clerk with protected/root routes
- Transaction list with delete flow and loading states
- Income, expense, and balance summary fetched from the API
- Shared UI components (balance card, transaction item, empty state) and safe-area wrapper

## Tech stack

- React Native 0.81, Expo SDK 54, Expo Router
- Clerk Expo SDK for authentication
- React Navigation primitives for stacks/tabs

## Requirements

- Node.js 18+ and npm
- Expo CLI (installed via `npm i -g expo-cli` is optional; `npx expo start` also works)
- iOS Simulator, Android Emulator, or Expo Go for running locally

## Environment variables

Create a `.env` file in the project root:

```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
EXPO_PUBLIC_API_URL=https://your-api.example.com
```

`EXPO_PUBLIC_API_URL` should point to the backend that serves `/api/transactions/:userId` and `/api/transactions/summary/:userId`.

## Getting started

1. Install deps

```bash
npm install
```

2. Run the app (choose one target)

```bash
npm run start     # Expo Dev Tools
npm run android   # Launch Android emulator or device
npm run ios       # Launch iOS simulator
npm run web       # Run in a web browser
```

When Dev Tools open, choose to run in a development build, simulator/emulator, or Expo Go.

## Useful scripts

- `npm run lint` – lint the project
- `npm run reset-project` – reset to a blank app shell (keeps starter in `app-example`)
