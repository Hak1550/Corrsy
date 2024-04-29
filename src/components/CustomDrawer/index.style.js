import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

export const styles = StyleSheet.create({
  imageContainer: {
    paddingTop: SIZES.h10 * 2,
  },
  profileView: {
    marginTop: SIZES.padding2,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: SIZES.padding2,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: SIZES.padding * 2,
  },
  name: {
    ...FONTS.Regular19,
    paddingLeft: SIZES.base * 1.5,
  },
  email: {
    ...FONTS.Regular12,
    paddingLeft: SIZES.base * 1.5,
  },
  flatListView: {
    paddingTop: SIZES.h20,
  },
  touchableBtn: {
    marginVertical: 1,
    paddingVertical: SIZES.h15,
  },
  listNames: {
    paddingLeft: SIZES.base,
    ...FONTS.Medium15,
    width: "70%",
  },
  icon: {
    width: "12%",
  },
  accordian_view: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  iconComponent: {
    right: SIZES.base * 2,
  },
  footer: {
    height: SIZES.base * 12,
  },
});
