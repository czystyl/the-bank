import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";

import { useAuth } from "~/utils/authProvider";
import { cn } from "~/utils/cn";
import MainBackground from "../../images/welcome.png";

export default function Onboarding() {
  const { completeOnboarding } = useAuth();

  const translationX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translationX.value = withSpring(event.contentOffset.x / 4);
    },
  });

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translationX.value }],
    };
  });

  return (
    <>
      <Image source={MainBackground} style={StyleSheet.absoluteFillObject} />

      <SafeAreaView className="flex-1">
        <Pressable
          className="absolute right-6 top-20 z-10"
          onPress={completeOnboarding}
        >
          {({ pressed }) => (
            <View
              className={cn("px-2 py-1", {
                "bg-gray-300": pressed,
                "shadow-xl": !pressed,
              })}
            >
              <Text
                className={cn("text-lg text-neutral-50", {
                  "text-black": pressed,
                })}
              >
                SKIP
              </Text>
            </View>
          )}
        </Pressable>

        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
        >
          <View className="w-screen flex-1 justify-center gap-y-4 px-10">
            <Text className="text-6xl font-light text-green-400">Today,</Text>
            <Text className="text-6xl font-light text-orange-400">
              tomorrow,
            </Text>

            <Text className="text-6xl font-light text-amber-400">
              in the future
            </Text>

            <Text className="text-xl font-light text-neutral-200">
              We will do everything, but count coins. Faster, easier, and more
              convenient.
            </Text>
          </View>

          <View className="w-screen flex-1 justify-center gap-y-4 px-10 ">
            <Text className="text-6xl font-light text-blue-300">
              TypeScript,
            </Text>
            <Text className="text-6xl font-light text-red-400">Next.js,</Text>

            <Text className="text-6xl font-light text-gray-300">Expo</Text>

            <Text className="text-xl font-light text-neutral-200">
              The Full Stack projects is what makes a difference.
            </Text>
          </View>

          <View className="w-screen flex-1 justify-center gap-y-4 px-10 ">
            <Text className="text-6xl font-light text-red-400">tRCP,</Text>
            <Text className="text-6xl font-light text-yellow-400">
              Drizzle,
            </Text>
            <Text className="text-6xl font-light text-zinc-400">TurboRepo</Text>

            <Text className="text-xl font-light text-neutral-200">
              Will take care of your backend side.
            </Text>
          </View>
          <View className="w-screen flex-1 justify-center gap-y-4 px-10 ">
            <Text className="text-6xl font-light text-pink-400">Tailwind,</Text>
            <Text className="text-6xl font-light text-blue-400">
              ReAnimated,
            </Text>
            <Text className="text-6xl font-light text-rose-400">shadcn/ui</Text>

            <Text className="text-xl font-light text-neutral-200">
              Will make your app looks amazing.
            </Text>
          </View>
        </Animated.ScrollView>

        <View className="absolute bottom-1/4 flex flex-row">
          <View className="h-1 flex-1 bg-slate-500" />
          <View className="h-1 flex-1 bg-slate-500" />
          <View className="h-1 flex-1 bg-slate-500" />
          <View className="h-1 flex-1 bg-slate-500" />
          <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
        </View>

        <Pressable
          className="absolute bottom-10  flex w-full flex-1 flex-row items-center justify-center"
          onPress={completeOnboarding}
        >
          <Text className="mr-2 text-xl uppercase text-neutral-300">
            Open an account
          </Text>
          <AntDesign name="right" size={10} color="white" />
        </Pressable>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: "absolute",
    height: 4,
    backgroundColor: "rgb(226 232 240)",
    width: "25%",
  },
});
