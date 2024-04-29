import React from "react";
import { ScrollView, View } from "react-native";
import { styles } from "./index.style";

export default function Container({ children, scroll, customStyle }) {
  return (
    <>
      {scroll ? (
        <ScrollView
          keyboardShouldPersistTaps="handxled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollView, customStyle]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.view, customStyle]}>{children}</View>
      )}
    </>
  );
}
