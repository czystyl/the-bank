import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

const SLIDE_PADDINGS = 10;
const SLIDER_WIDTH = Dimensions.get("window").width - SLIDE_PADDINGS * 2;
const SLIDE_POINT_SIZE = 60;
const SLIDER_RADIUS = SLIDE_POINT_SIZE / 10;

const CONFIRM_COLOR = "#16a34a";

interface PropsSliderValue {
  onSlideConfirm: () => void;
  children?: React.ReactNode;
  reset: boolean;
  sliderEnabled?: boolean;
}

export default function Slider({ onSlideConfirm }: PropsSliderValue) {
  return (
    <>
      <ImageBackground
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        source={require("../images/cover.png")}
        style={styles.container}
      >
        <Pressable onPress={onSlideConfirm}>
          <Text style={[styles.textPosition]}>🎉 Confirm!</Text>
        </Pressable>
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
    justifyContent: "center",
    alignItems: "center",
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
