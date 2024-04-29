import { View } from 'react-native';
import React from 'react';
import { FONTS } from '../../constants';
import CustomText from '../Text';
import { formatCurrency } from '../../utils/Helper';
import { Colors } from '../../constants/Colors';

const CustomAmount = ({ price, style, cutPrice, vertical, textStyle }) => {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
      <CustomText text={`Tzs`} style={[cutPrice ? FONTS.Regular12 : FONTS.SemiBold14, { ...textStyle }]} />

      <CustomText
        text={` ${price ? formatCurrency(price)?.split('.')[0] : 0}.`}
        style={[vertical ? FONTS.Bold10 : cutPrice ? FONTS.Bold14 : FONTS.Bold16, { color: cutPrice ? Colors.border : Colors.blue, ...textStyle }]}
      />
      <CustomText
        text={`${price ? formatCurrency(price)?.split('.')[1] : 0} `}
        style={[vertical ? FONTS.SemiBold10 : cutPrice ? FONTS.Bold10 : FONTS.Regular12, { color: cutPrice ? Colors.border : Colors.blue, marginTop: 2, ...textStyle }]}
      />
    </View>
  );
};

export default CustomAmount;
