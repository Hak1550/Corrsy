import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

export const styles = StyleSheet.create({
    main_view: {
      backgroundColor: COLORS.white,
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 5,
      marginTop: SIZES.padding,
      borderColor:COLORS.primary,
      borderWidth:1,
      paddingHorizontal:SIZES.padding2
      
    },
    value: {
      ...FONTS.Regular15,
      color: COLORS.text_gray2,
      textAlign: "left",
    },
  });