import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useOnboardingSettings() {
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
