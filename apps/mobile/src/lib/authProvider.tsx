import "@total-typescript/ts-reset";

import React, { createContext, useEffect, useState } from "react";
import {
  router,
  SplashScreen,
  useRootNavigationState,
  useSegments,
} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

interface AuthContextType {
  setUser: (arg: boolean) => void;
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

  return (
    <AuthContext.Provider
      value={{
        resetOnboarding,
        setUser,
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
