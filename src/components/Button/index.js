import React from 'react';
import {COLORS, FONTS,} from '../../constants';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icons, Loader} from '../index';
import {Colors} from '../../constants/Colors';
import CustomText from '../Text';

const CustomButton = ({
  style,
  onPress,
  buttonText,
  textStyle,
  icon_view,
  iconStyle,
  disabled,
  icon,
  leftIcon,
  loading,
  activeOpacity,
  greenBack,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity ?? 0.8}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: greenBack
            ? Colors.greenColor
            : disabled
            ? COLORS.disabled
            : Colors.primary,
        },
        style,
      ]}
      disabled={disabled}>
      {leftIcon && (
        <Icons
          name={leftIcon ? leftIcon : null}
          style={[styles.icon, iconStyle]}
        />
      )}
      {loading ? (
        <Loader />
      ) : (
        <View style={[styles.row, icon_view]}>
          <CustomText
            style={[styles.defaultText, textStyle]}
            text={buttonText}
          />

          {icon && (
            <Icons name={icon ? icon : null} style={[styles.icon, iconStyle]} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  defaultText: {
    ...FONTS.Medium15,
    color: COLORS.white,
  },
  icon: {
    width: '12%',
    paddingRight: 30,
  },
});

export default CustomButton;
