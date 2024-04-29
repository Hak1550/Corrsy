import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../index";
import { styles } from "./index.style";

export default function ViewAll({ title, isViewAll = true, onPress,titleStyle }) {
  return (
    <View style={styles.view}>
      {title ? <Text text={title} style={[styles.title,titleStyle]} /> : <View />}
      {isViewAll && (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          <Text text={"View All"} style={styles.text} />
        </TouchableOpacity>
      )}
    </View>
  );
}
