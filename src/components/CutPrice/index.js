import React from 'react';
import {StyleSheet, View, } from 'react-native';

import {FONTS} from '../../constants';
import {formatCurrency} from '../../utils/Helper';
import {Colors} from '../../constants/Colors';
import CustomAmount from '../CustomAmount';
import CustomText from '../Text';

const CutPrice = ({discounted_price, price, quickView, lop, cart}) => {
  let dis_Amount = price - discounted_price;
  dis_Amount = dis_Amount.toFixed(2);
  const price_Amount = formatCurrency(price);
  console.log(price_Amount);
  const len = price_Amount.split('.')[0].length;
  return (
    <View style={{flexDirection: 'row'}}>
      <View
        style={[
          styles.cutPrice,
          {
            width: quickView ? 65 : len === 1 ? 30 : len === 2 ? 40 : 50,
            marginTop: quickView ? 12 : lop ? 8 : 10,
          },
        ]}></View>

      <CustomAmount price={price} />
      {!cart ? (
        <View style={styles.saveView}>
          <CustomText
            style={[
              FONTS.SemiBold14,
              {
                fontSize: lop ? 8 : 10,
                color: '#fff',
              },
            ]}
            text={`Save Rs. ${dis_Amount}`}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  cutPrice: {
    borderBottomColor: '#333',
    borderBottomWidth: 0.8,
    position: 'absolute',
    transform: [{rotate: '-5deg'}],
    marginTop: 10,
  },
  saveView: {
    marginLeft: 5,
    paddingHorizontal: 5,
    backgroundColor: Colors.greenColor,
    borderRadius: 10,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CutPrice;
