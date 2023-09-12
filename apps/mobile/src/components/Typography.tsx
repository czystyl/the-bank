import type { TextProps } from "react-native";
import { StyleSheet, Text } from "react-native";

interface TypographyProps extends TextProps {
  children: React.ReactNode;
  font?: keyof typeof styles;
  /**
   * NativeWind catch className prop, so we have to use something else
   * @see: https://www.nativewind.dev/guides/custom-components#passing-styles-to-components
   */
  classNames?: string;
}

export default function Typography({
  children,
  classNames = "",
  font = "regular",
  ...props
}: TypographyProps) {
  return (
    <Text {...props} className={classNames} style={styles[font]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontFamily: "RobotoMono-Bold",
  },
  boldItalic: {
    fontFamily: "RobotoMono-BoldItalic",
  },
  italic: {
    fontFamily: "RobotoMono-Italic",
  },
  extraLight: {
    fontFamily: "RobotoMono-ExtraLight",
  },
  extraLightItalic: {
    fontFamily: "RobotoMono-ExtraLightItalic",
  },
  light: {
    fontFamily: "RobotoMono-Light",
  },
  lightItalic: {
    fontFamily: "RobotoMono-LightItalic",
  },
  medium: {
    fontFamily: "RobotoMono-Medium",
  },
  mediumItalic: {
    fontFamily: "RobotoMono-MediumItalic",
  },
  regular: {
    fontFamily: "RobotoMono-Regular",
  },
  semiBold: {
    fontFamily: "RobotoMono-SemiBold",
  },
  semiBoldItalic: {
    fontFamily: "RobotoMono-SemiBoldItalic",
  },
  thin: {
    fontFamily: "RobotoMono-Thin",
  },
  thinItalic: {
    fontFamily: "RobotoMono-ThinItalic",
  },
});
// RobotoMono-Bold
// RobotoMono-BoldItalic
// RobotoMono-Italic
// RobotoMono-ExtraLight
// RobotoMono-ExtraLightItalic
// RobotoMono-Light
// RobotoMono-LightItalic
// RobotoMono-Medium
// RobotoMono-MediumItalic
// RobotoMono-Regular
// RobotoMono-SemiBold
// RobotoMono-SemiBoldItalic
// RobotoMono-Thin
// RobotoMono-ThinItalic
