import { Image, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { api } from "~/utils/api";
import { useAuth } from "~/utils/authProvider";
import Typography from "~/components/Typography";

export default function HomeScreen() {
  const { user } = useAuth();

  const apiUtils = api.useContext();

  const { data: userBalance, refetch: refetchBalance } =
    api.user.balance.useQuery();

  const { mutate: addFoundsMutation } = api.transaction.addFounds.useMutation({
    onSettled: () => {
      void refetchBalance();
      void apiUtils.transaction.all.refetch();
    },
  });

  return (
    <SafeAreaView
      className="flex flex-1 justify-between bg-gray-50 px-4"
      edges={["top"]}
    >
      <View className="mt-4 flex flex-row items-center">
        <Image
          source={{ uri: user?.imageUrl }}
          className="h-10 w-10 rounded-full"
        />
        <Typography classNames="text-2xl" font="light">
          Welcome <Typography font="italic">{user?.firstName} 👋</Typography>
        </Typography>
      </View>

      <View className="flex flex-1 items-center justify-center">
        <Typography classNames="text-xl text-slate-500">Balance:</Typography>
        <Typography classNames="mt-4 text-5xl text-slate-700" font="bold">
          ${userBalance?.toFixed(2)}
        </Typography>

        <View className="mt-10 flex flex-row items-center justify-center gap-x-10">
          <Pressable
            className="w-1/3 rounded-full bg-gray-300 px-6 py-4"
            onPress={() => {
              addFoundsMutation({
                value: Math.random() * 100,
              });
            }}
          >
            <Typography
              classNames="text-center text-lg text-slate-800"
              font="medium"
            >
              Add Money
            </Typography>
          </Pressable>

          <Pressable
            className="w-1/3 rounded-full bg-gray-300 px-6 py-4"
            onPress={() => {
              router.push("/transfer");
            }}
          >
            <Typography
              classNames="text-center text-lg text-slate-800"
              font="medium"
            >
              Transfer
            </Typography>
          </Pressable>
        </View>
      </View>

      <Typography classNames="text-xl text-slate-500 m-2">
        Last transaction:
      </Typography>
      <ScrollView className="flex flex-1 gap-y-1">
        {[10.2, -22.02, 300, 1999, 99].map((value) => (
          <Pressable className="flex flex-row gap-3" key={value}>
            <Image
              source={{ uri: user?.imageUrl }}
              className="h-16 w-16 rounded-full"
            />
            <View className="flex flex-1 justify-center">
              <Typography font="bold">John Doe</Typography>
              <Typography numberOfLines={1}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </Typography>
              <Typography font="italic">{new Date().toDateString()}</Typography>
            </View>

            <View className="flex  justify-center">
              <Typography classNames="text-xl" font="bold">
                ${value.toFixed(2)}
              </Typography>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
