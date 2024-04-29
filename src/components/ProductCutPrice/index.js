import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { formatCurrency } from '../../utils/Helper';
import { FONTS } from '../../constants';
import { Colors } from '../../constants/Colors';
import CustomAmount from '../CustomAmount';
import CustomText from '../Text';
import { useTranslation } from 'react-i18next';


const ProductCutPrice = ({ price_model, cart, style, vertical, perCarton }) => {
    const { t } = useTranslation()
    const { price, discounted_price } = price_model
    let dis_Amount = perCarton ? (price - discounted_price) * perCarton : (price - discounted_price)
    dis_Amount = formatCurrency(dis_Amount)
    let actualPrice = perCarton ? perCarton * price : price
    return (
        <View style={{ flexDirection: 'row', ...style }}>
            <View style={{ marginRight: 5 }}>
                <View style={[styles.cutPrice(vertical)]}></View>
                <CustomAmount price={actualPrice} cutPrice vertical />
            </View>
            {!cart ? (
                <View style={styles.saveView}>
                    <CustomText style={styles.save(vertical)} text={` ${t('Save')} Tzs ${dis_Amount}`} />
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    cutPrice: vertical => ({
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.8,
        position: 'absolute',
        transform: [{ rotate: '-5deg' }],
        marginTop: 7,
        width: '95%',
    }),
    saveView: {
        marginLeft: -5,
        paddingHorizontal: 5,
        backgroundColor: Colors.greenColor,
        borderRadius: 10,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    save: vertical => ([
        FONTS.Bold15,
        {
            fontSize: vertical ? 8 : 10,
            color: Colors.whiteThemeColor,
        },
    ])
});

export default ProductCutPrice;
