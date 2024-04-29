import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';

const IconComponent = ({name, style, iconHeight, fill}) => {
  return (
    <View style={[styles.mainContainer, style]}>
      {iconHeight ? (
        <SvgXml xml={name} height={iconHeight} fill={fill} />
      ) : (
        <SvgXml xml={name} fill={fill} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default IconComponent;
