import "@total-typescript/ts-reset";

import React, { createContext, useEffect, useState } from "react";
import {
  router,
  SplashScreen,
  useRootNavigationState,
  useSegments,
} from "expo-router";

import { useOnboardingSettings } from "./useOnboardingSettings";

SplashScreen.preventAutoHideAsync();

interface AuthContextType {
  user: boolean;
  signOut: () => void;
  signIn: () => void;
  resetOnboarding: () => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider(props: { children: React.ReactNode }) {
  const [navigated, setNavigated] = useState(false);

  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();
  const {
    isOnboardingCompleted,
    isOnboardingValueChecked,
    resetOnboarding,
    completeOnboarding,
  } = useOnboardingSettings();

  // TODO: Replace with Clerk User!
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (navigated) {
      void SplashScreen.hideAsync();
    }
  }, [navigated]);

  useEffect(() => {
    if (!rootNavigationState?.key || !isOnboardingValueChecked) {
      return;
    }

    const isAuthSegment = segments[0] === "(auth)";

    setNavigated(true);

    if (user && isAuthSegment) {
      console.log("Navigating to home screen");
      return router.replace("/(home)/");
    }

    if (!user) {
      if (!isOnboardingCompleted) {
        return router.replace("/(auth)/onboarding");
      }

      return router.replace("/(auth)/sign-in");
    }
  }, [
    rootNavigationState?.key,
    segments,
    user,
    isOnboardingCompleted,
    isOnboardingValueChecked,
  ]);

  function signOut() {
    setUser(false);
  }

  function signIn() {
    setUser(true);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut,
        signIn,
        resetOnboarding,
        completeOnboarding,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// This hook can be used to access the user info.
export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
