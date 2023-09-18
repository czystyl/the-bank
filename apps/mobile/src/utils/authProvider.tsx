import "@total-typescript/ts-reset";

import React, { createContext, use, useEffect, useState } from "react";
import {
  router,
  SplashScreen,
  useRootNavigationState,
  useSegments,
} from "expo-router";
import { useAuth as useClerkAuth, useUser } from "@clerk/clerk-expo";
import type { UserResource } from "@clerk/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

interface AuthContextType {
  signOut: () => Promise<void>;
  user: UserResource | null;
  ready: boolean;
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

  const { user } = useUser();
  const { isLoaded, signOut } = useClerkAuth();

  useEffect(() => {
    if (navigated) {
      void SplashScreen.hideAsync();
    }
  }, [navigated]);

  useEffect(() => {
    if (!rootNavigationState?.key || !isLoaded || !isOnboardingValueChecked) {
      return;
    }

    const isAuthSegment = segments[0] === "(auth)";

    setNavigated(true);

    if (user && isAuthSegment) {
      return router.replace("/(home)/");
    }

    if (!user) {
      if (!isOnboardingCompleted) {
        return router.replace("/(auth)/onboarding");
      }

      return router.replace("/(auth)/sign-in");
    }
  }, [
    isLoaded,
    rootNavigationState?.key,
    segments,
    user,
    isOnboardingCompleted,
    isOnboardingValueChecked,
  ]);

  return (
    <AuthContext.Provider
      value={{
        signOut,
        user: user ?? null,
        ready: isLoaded && isOnboardingValueChecked,
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

function useOnboardingSettings() {
  const [value, setValue] = useState<boolean | null | undefined>(undefined);

  useEffect(() => {
    AsyncStorage.getItem("ONBOARDING_COMPLETE")
      .then((value) => {
        if (!value) {
          return setValue(false);
        }

        try {
          const parsedValue = JSON.parse(value);

          setValue(Boolean(parsedValue));
        } catch (error) {
          setValue(false);
        }
      })
      .catch(() => {
        setValue(false);
      });
  });

  return {
    isOnboardingCompleted: value,
    isOnboardingValueChecked: value !== undefined,
    completeOnboarding: () => {
      setValue(true);
      void AsyncStorage.setItem("ONBOARDING_COMPLETE", JSON.stringify(true));
    },
    resetOnboarding: () => {
      setValue(false);
      void AsyncStorage.setItem("ONBOARDING_COMPLETE", JSON.stringify(false));
    },
  };
}
