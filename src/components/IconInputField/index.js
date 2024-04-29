import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import TextInputMask from 'react-native-text-input-mask';
import { Colors } from '../../constants/Colors';
import { FONTS, images } from '../../constants';
import IconComponent from '../Icons';
import CustomText from '../Text';
import Icon from 'react-native-vector-icons/AntDesign';

const MasKInput = ({
  icon,
  mask,
  text,
  style,
  image,
  name,
  error,
  value,
  type,
  editable,
  hasError,
  isSecure,
  maxLength,
  iconName,
  iconColor,
  isDisbale,
  textStyle,
  rightIcon,
  inputStyle,
  iconStyle,
  onIconClick,
  placeholder,
  keyboardType,
  onChangeText,
  rightIconPress,
  placeholderTextColor,
  rightIconColor,
  ...inputProps
}) => {
  return (
    <View style={{ marginVertical: 3 }}>
      {text ? (
        <CustomText style={[{ marginBottom: 5 }, textStyle]} text={text} />
      ) : null}
      <View style={[styles.input(style)]}>
        {icon && <IconComponent name={icon} style={[styles.icon, iconStyle]} />}
        <TextInputMask
          style={[styles.inputMask, inputStyle]}
          name={name}
          secureTextEntry={isSecure}
          iconName={iconName}
          isDisbale={isDisbale}
          placeholder={placeholder}
          editable={editable}
          value={value}
          keyboardType={keyboardType}
          maxLength={maxLength}
          defaultValue={value}
          placeholderTextColor={'#c9c9c9'}
          mask={mask}
          onChangeText={text => onChangeText(name, text)}
          {...inputProps}
        />
        {rightIcon ? (
          <TouchableOpacity
            source={rightIconPress}
            style={{ marginLeft: name === 'mobile' ? -32 : -30 }}
          >
            {/* <IconComponent name={rightIcon} /> */}
            <Icon name={rightIcon} color={rightIconColor ?? Colors.dangerColor} size={20} style={{ marginHorizontal: 5 }} />

          </TouchableOpacity>
        ) : null}
      </View>
      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default MasKInput;

const styles = StyleSheet.create({
  input: style => [
    {
      flexDirection: 'row',
      alignItems: 'center',
    },
    style,
  ],
  inputMask: [
    {
      width: '100%',
      color: '#000',
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    FONTS?.Regular14,
  ],

  errorText: [
    FONTS.Regular12,
    {
      color: 'red',
      paddingHorizontal: 5,
      paddingVertical: 5,
    },
  ],
  errorInput: {
    borderColor: 'red',
    backgroundColor: Colors.white,
  },
  icon: {
    marginHorizontal: 20,
  },
});
