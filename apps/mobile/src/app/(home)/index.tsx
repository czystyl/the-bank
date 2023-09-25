import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import { useAuth } from "~/lib/authProvider";

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView className="flex flex-1 justify-between px-4" edges={["top"]}>
      <View className="mt-4 flex flex-row items-center justify-between">
        <Image
          source={{ uri: "https://placehold.co/600x400?text=Clerk User" }}
          className="h-10 w-10 rounded-full"
        />
        <Text className="ml-4 text-3xl font-light">
          Hello{" "}
          <Text className="text-3xl font-bold italic">{"?.firstName"} 👋</Text>
        </Text>
        <Pressable
          onPress={() => {
            void signOut();
          }}
        >
          <MaterialIcons name="logout" size={32} color="black" />
        </Pressable>
      </View>

      <View className="flex flex-1 items-center justify-center">
        <Text className="text-3xl text-slate-500">Balance:</Text>
        <Text className="mt-4 text-5xl font-bold text-slate-700">
          {!user ? <ActivityIndicator size="large" color="green" /> : null}
          0$
        </Text>

        <View className="mt-10 flex flex-row items-center justify-center gap-x-10">
          <Pressable className="w-1/3 rounded-full bg-gray-300 px-6 py-4">
            <Text className="text-center text-lg font-bold text-slate-800">
              Add Money
            </Text>
          </Pressable>

          <Pressable className="w-1/3 rounded-full bg-gray-300 px-6 py-4">
            <Text className="text-center text-lg font-bold text-slate-800">
              Transfer
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
