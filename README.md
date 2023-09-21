# The Brew

## Installation

TBA

## About

```
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ mobile
  |   ├─ Expo SDK 49
  |   ├─ React Native using React 18
  |   ├─ Navigation using Expo Router
  |   ├─ Tailwind using Nativewind
  |   └─ Typesafe API calls using tRPC
  └─ web
      ├─ Next.js 13
      ├─ React 18
      ├─ Tailwind CSS
      └─ shadcn UI
tooling
  ├─ eslint
  |   └─ Eslint config for monorepo packages
  ├─ prettier
  |   └─ Prettier config for monorepo packages
  ├─ tailwind
  |   └─ Tailwind configuration shared in WEB and mobile
  └─ tsconfig
      └─ TypeScript config for monorepo packages
packages
  ├─ api
  |   └─ tRPC v10 router definition
  ├─ core
  |   └─ Shared business logic
  ├─ env
  |   └─ Shared Tailwind & Eslint configs
  ├─ scripts
  |   └─ Scripts to interact with DB like seed etc
  └─ db
      └─ Typesafe db calls using Drizzle
```

## Quick Start

To get it running, follow the steps below:

### Setup dependencies

```diff
# Install dependencies
pnpm i

# Configure environment variables.
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env
cp apps/mobile/.env.example .env

# Push the Drizzle schema to your database
pnpm db:push
```

### Configure Expo `dev`-script

#### Use iOS Simulator

1. Make sure you have XCode and XCommand Line Tools installed [as shown on expo docs](https://docs.expo.dev/workflow/ios-simulator/).
   > **NOTE:** If you just installed XCode, or if you have updated it, you need to open the simulator manually once. Run `npx expo start` in the root dir, and then enter `I` to launch Expo Go. After the manual launch, you can run `pnpm dev` in the root directory.

```diff
+  "dev": "expo start --ios",
```

3. Run `pnpm dev` at the project root folder.

> **TIP:** It might be easier to run each app in separate terminal windows so you get the logs from each app separately. This is also required if you want your terminals to be interactive, e.g. to access the Expo QR code. You can run `pnpm --filter expo dev` and `pnpm --filter nextjs dev` to run each app in a separate terminal window.

#### For Android

1. Install Android Studio tools [as shown on expo docs](https://docs.expo.dev/workflow/android-studio-emulator/).
2. Change the `dev` script at `apps/expo/package.json` to open the Android emulator.

```diff
+  "dev": "expo start --android",
```

3. Run `pnpm dev` at the project root folder.

## Deployment
