import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const Loader = ({ style, color, size }) => {
  return (
    <ActivityIndicator
      style={[style, { marginTop: SIZES.padding }]}
      color={color || COLORS.primary}
      size={size || "large"}
    />
  );
};

export default Loader;

const styles = StyleSheet.create({});
