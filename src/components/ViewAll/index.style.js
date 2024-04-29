import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

export const styles = StyleSheet.create({
  view: {
    paddingVertical: SIZES.padding2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    ...FONTS.Medium20,
  },
  text: {
    padding: SIZES.padding2 / 2,
    ...FONTS.Regular14,
    color: COLORS.primary,
    textDecorationLine: "underline",
    textDecorationColor: COLORS.primary,
  },
});
