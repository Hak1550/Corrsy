import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants';
import CustomText from '../Text';
import { STYLES } from '../../constants/theme';
import { formatCurrency } from '../../utils/Helper';
import { useTranslation } from 'react-i18next';


const BulkMenu = ({
  discount_list,
  selectBulk,
  itemId,
  openList,
  pdp,
  perCarton,
  actualPrice,
  stock_quantity
}) => {
  const { t } = useTranslation()
  return (
    <ScrollView
      horizontal
      contentContainerStyle={STYLES.spaceBetween}
      style={[styles.disc_list(pdp)]}>
      {discount_list.map((each, index) => {
        let actPrice = perCarton ? perCarton * actualPrice : actualPrice;
        let disPrice = perCarton
          ? perCarton * each?.DiscountedPrice
          : each?.DiscountedPrice;
        let savings = parseFloat(actPrice) - parseFloat(disPrice);
        disPrice = formatCurrency(disPrice);
        let isInt = Number.isInteger(savings);
        let savings2 = formatCurrency(savings);
        // console.log('bulk', perCarton, actualPrice, actPrice, disPrice, savings2);
        return (
          <TouchableOpacity
            disabled={stock_quantity < 1}
            key={index}
            activeOpacity={0.7}
            onPress={() => selectBulk(itemId, each)}
            style={styles.discBox}>
            <CustomText style={styles.txt} text={`Buy ${each?.MinimumDiscountedQuantity} + units`} />
            {!isInt ? (
              <>
                <CustomText style={styles.txt} text={savings2.split('.')[0]} />
                <CustomText style={styles.txt} text={savings2.split('.')[1]} />
                <CustomText style={styles.txt} text={'/unit'} />
              </>
            ) : (
              <CustomText style={styles.txt} text={`${t('Save')} Tzs ${savings}/unit`} />
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  bulkView: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  disc_list: pdp => ({
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
    zIndex: 1,
    width: '100%',
    paddingRight: 50,
    marginTop: !pdp ? -5 : 0,
  }),
  discBox: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 5,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    paddingHorizontal: 5,
    marginRight: 3,
    borderRadius: 10,
    backgroundColor: Colors.whiteThemeColor,
    marginHorizontal: 7,
    elevation: 5,
  },
  txt: { ...FONTS.SemiBold12, color: Colors.primary, }

});

export default BulkMenu;
