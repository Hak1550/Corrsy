import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FONTS, images } from '../../constants';
import SmartImage from '../SmartImage';
import { Colors } from '../../constants/Colors';
import CustomText from '../Text';
import CustomAmount from '../CustomAmount';

const AsLowAs = ({ list, perCarton, }) => {
  let lowestPrice = list[list.length - 1]?.DiscountedPrice
  lowestPrice = perCarton ? perCarton * lowestPrice : lowestPrice

  return (
    <View style={styles.main}>
      <SmartImage source={images.flame} style={{ height: 15, width: 10 }} />
      <CustomText style={styles.txt} text={'Lowest'}  />
      <CustomAmount price={lowestPrice} textStyle={{color:Colors.whiteThemeColor, fontSize:12}} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 50,
    alignItems: 'center',
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    // width: 140,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  txt: [
    FONTS.Bold14,
    { fontSize: 12, color: Colors.whiteThemeColor, marginHorizontal: 7 },
  ],
});

export default AsLowAs;
