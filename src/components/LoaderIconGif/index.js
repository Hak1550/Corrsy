import React from 'react';
import LottieView from 'lottie-react-native';

const LoaderIconGif = ({left, up, width, height}) => {
  return (
    <LottieView
      source={require('../../assets/gif/Pre-Loader.json')}
      autoPlay
      loop
      style={{
        width: width ?? 15,
        height: height ?? 10,
        transform: [{rotate: left ? '180deg' : up ? '270deg' : '0deg'}],
      }}
    />
  );
};

export default LoaderIconGif;
