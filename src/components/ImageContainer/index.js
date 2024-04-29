import React from "react";
import { ImageBackground } from "react-native";
import { images } from "../../constants";
import { styles } from "./index.style";

function ImageContainer({ children, style, onBoarding_background }) {
  return (
    <ImageBackground
      style={[styles.main_view, style]}
      source={
        onBoarding_background
          ? images.onboarding_background
          : images.background_image1
      }
      resizeMode="stretch"
    >
      {children}
    </ImageBackground>
  );
}

export default ImageContainer;
