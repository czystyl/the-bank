import { Redirect } from "expo-router";

import { useAuth } from "../utils/authProvider";

export default function Index() {
  const { ready } = useAuth();

  if (!ready) {
    return null;
  }

  return <Redirect href="/home/" />;
}
