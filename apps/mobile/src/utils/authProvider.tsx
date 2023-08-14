import React, { createContext, useEffect } from "react";
import {
  router,
  SplashScreen,
  useRootNavigationState,
  useSegments,
} from "expo-router";
import { useAuth as useClerkAuth, useUser } from "@clerk/clerk-expo";
import type { UserResource } from "@clerk/types";

SplashScreen.preventAutoHideAsync();

interface AuthContextType {
  signOut: () => Promise<void>;
  user: UserResource | null;
  ready: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider(props: { children: React.ReactNode }) {
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();

  const { user } = useUser();
  const { isLoaded, signOut } = useClerkAuth();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!rootNavigationState?.key || !isLoaded) {
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      return router.replace("/sign-in");
    }

    if (user && inAuthGroup) {
      return router.replace("/");
    }
  }, [isLoaded, rootNavigationState?.key, segments, user]);

  return (
    <AuthContext.Provider
      value={{
        signOut,
        user: user ?? null,
        ready: isLoaded,
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
