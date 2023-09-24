# The Bank

## Project Structure

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

## Pre-requirements

Make sure that you have installed and configured:

- **Node.js**: I recommend using NVM (Node Version Manager). [Installation Guide](https://github.com/nvm-sh/nvm)
- **pnpm**: [Installation Guide](https://pnpm.io/installation#using-npm)
- **Docker**: [Installation Guide](https://docs.docker.com/engine/install/)
- **iOS Simulator**: [Installation Guide](https://docs.expo.dev/workflow/ios-simulator/)
- **Android Studio Emulator**: [Installation Guide](https://docs.expo.dev/workflow/android-studio-emulator/)

## Quick Start

To get it running, follow the steps below:

### Setup dependencies

- Install dependencies

  ```sh
  pnpm i
  ```

- Copy example .env files

  ```sh
  cp .env.example .env
  # Expo needs a different .env file
  cp apps/mobile/.env.example .env
  ```

- Database setup

  ```sh
  docker run --name the-bank-mysql -e MYSQL_ROOT_PASSWORD=password -d -p 3306:3306 mysql
  ```

  > You can also get one from https://planetscale.com/

- Database synchronization (optional)
  ```
  pnpm db:push
  ```

## Get started!

We need to run mobile and web in parallel

- Web:

  ```sh
  pnpm web
  ```

- iOS simulator:

  ```sh
  pnpm mobile
  ```

## Clear workspace

If you need to reinstall all packages run:

```sh
# Clear all deps and cache
pnpm clean:workspaces

# Install all dependencies
pnpm i
```
