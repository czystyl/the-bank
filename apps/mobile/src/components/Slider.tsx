import { useEffect } from "react";
import { Dimensions, ImageBackground, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const SLIDE_PADDINGS = 10;
const SLIDER_WIDTH = Dimensions.get("window").width - SLIDE_PADDINGS * 2;
const SLIDE_POINT_SIZE = 60;
const SLIDER_RADIUS = SLIDE_POINT_SIZE / 10;

const END_POINT = SLIDER_WIDTH - SLIDE_POINT_SIZE - SLIDE_PADDINGS * 2;

const CONFIRM_THRESHOLD = 0.6;

const CONFIRM_COLOR = "#16a34a";
const ARROW_START_COLOR = "#334155";
const ARROW_END_COLOR = "#cbd5e1";

interface PropsSliderValue {
  onSlideConfirm: () => void;
  children?: React.ReactNode;
  reset: boolean;
  sliderEnabled?: boolean;
}

export default function Slider({
  children,
  onSlideConfirm,
  reset,
  sliderEnabled,
}: PropsSliderValue) {
  const isPressed = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const startX = useSharedValue(0);

  useEffect(() => {
    if (reset) {
      startX.value = 0;
      offsetX.value = withTiming(0);
    }
  }, [offsetX, reset, startX]);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      const newX = e.translationX + startX.value;
      const isOnEnd = startX.value === END_POINT;

      if (newX > 0 && newX < END_POINT && !isOnEnd && sliderEnabled) {
        offsetX.value = e.translationX + startX.value;
      }
    })
    .onEnd(() => {
      if (offsetX.value > END_POINT * CONFIRM_THRESHOLD) {
        startX.value = END_POINT;
        offsetX.value = withTiming(END_POINT);

        runOnJS(onSlideConfirm)();
      } else {
        startX.value = 0;
        offsetX.value = withTiming(0);
      }
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  const animatedPointStyles = useAnimatedStyle(() => {
    return { transform: [{ translateX: offsetX.value }] };
  });

  const animatedArrowOpacityStyles = useAnimatedStyle(() => {
    return { opacity: withTiming(offsetX.value < END_POINT * 0.9 ? 1 : 0) };
  });

  const animatedArrowStyles1 = useAnimatedStyle(() => {
    const color = interpolateColor(
      offsetX.value,
      [0, END_POINT * 0.9],
      [ARROW_START_COLOR, ARROW_END_COLOR],
    );

    return { color };
  });

  const animatedArrowStyles2 = useAnimatedStyle(() => {
    const color = interpolateColor(
      offsetX.value,
      [0, END_POINT * 0.7],
      [ARROW_START_COLOR, ARROW_END_COLOR],
    );

    return { color };
  });

  const animatedArrowStyles3 = useAnimatedStyle(() => {
    const color = interpolateColor(
      offsetX.value,
      [0, END_POINT * 0.5],
      [ARROW_START_COLOR, ARROW_END_COLOR],
    );

    return { color };
  });

  const animatedConfirmStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      offsetX.value,
      [0, END_POINT * 0.9, END_POINT],
      [0, 0, 1],
    );

    return {
      opacity,
    };
  });

  const slideTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(offsetX.value, [0, END_POINT], [1, 0], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return {
      left: offsetX.value + SLIDE_POINT_SIZE * 1.5,
      opacity,
    };
  });

  const releaseTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      offsetX.value,
      [
        END_POINT * (CONFIRM_THRESHOLD * 0.5),
        END_POINT * CONFIRM_THRESHOLD,
        END_POINT * 0.9,
        END_POINT,
      ],
      [0, 1, 1, 0],
      { extrapolateLeft: Extrapolation.CLAMP },
    );

    return {
      left: offsetX.value - SLIDE_POINT_SIZE * 1.7,
      opacity,
    };
  });

  const confirmTextStyle = useAnimatedStyle(() => {
    const opacity = withTiming(offsetX.value === END_POINT ? 1 : 0, {
      duration: 200,
    });

    const top = withSpring(offsetX.value === END_POINT ? "35%" : "0%");

    return {
      left: offsetX.value - SLIDE_POINT_SIZE * 2.5,
      opacity,
      top,
    };
  });

  return (
    <>
      <ImageBackground
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        source={require("../images/cover.png")}
        style={styles.container}
      >
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.slidePoint, animatedPointStyles]}>
            <AnimatedAntDesign
              name="right"
              size={24}
              animatedProps={animatedArrowStyles1}
              style={[animatedArrowOpacityStyles]}
            />
            <AnimatedAntDesign
              name="right"
              size={24}
              animatedProps={animatedArrowStyles2}
              style={[animatedArrowOpacityStyles]}
            />
            <AnimatedAntDesign
              name="right"
              size={24}
              animatedProps={animatedArrowStyles3}
              style={[animatedArrowOpacityStyles]}
            />
            <AnimatedAntDesign
              name="check"
              size={32}
              color={CONFIRM_COLOR}
              style={[
                {
                  position: "absolute",
                },
                animatedConfirmStyles,
              ]}
            />
          </Animated.View>
        </GestureDetector>
        <Animated.View style={[slideTextStyle, styles.textContainer]}>
          {children}
        </Animated.View>

        <Animated.Text
          style={[
            styles.textContainer,
            styles.textPosition,
            styles.confirm,
            releaseTextStyle,
          ]}
        >
          🫵 Release
        </Animated.Text>
        {/* </Animated.View> */}

        <Animated.Text style={[styles.textPosition, confirmTextStyle]}>
          🎉 Confirmed!
        </Animated.Text>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SLIDER_RADIUS,
    borderRadius: SLIDER_RADIUS,
    marginHorizontal: SLIDE_PADDINGS,
    height: SLIDE_POINT_SIZE + SLIDE_PADDINGS * 2,
    width: SLIDER_WIDTH,
    overflow: "hidden",
  },
  slidePoint: {
    position: "absolute",
    top: SLIDE_PADDINGS,
    left: SLIDE_PADDINGS,
    width: SLIDE_POINT_SIZE,
    height: SLIDE_POINT_SIZE,
    borderRadius: SLIDER_RADIUS,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: -10,
    backgroundColor: "#e5e5e5",
  },
  textContainer: {
    position: "absolute",
    top: "40%",
  },
  textPosition: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fbfbfb",
  },
  confirm: {
    color: CONFIRM_COLOR,
  },
});
