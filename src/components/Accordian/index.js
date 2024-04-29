import React from "react";
import { View,TouchableOpacity } from "react-native";
import { Text } from "../index"
import { styles } from "./index.style";
import { SIZES } from "../../constants";

export default function Accordian({ data, expanded }) {

  return (
    <TouchableOpacity style={styles.view} activeOpacity={0.7} onPress={data.route} >
     {expanded && <View style={styles.emptyView} /> } 
      {expanded && <Text text={data.name} style={styles.text} />}
    </TouchableOpacity>
  );
}
