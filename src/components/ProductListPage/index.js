import React, { memo, useEffect, } from 'react';
import { View, Dimensions, TouchableOpacity, FlatList, BackHandler } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import { styles } from './index.style';
import CustomText from '../Text';
import { FONTS } from '../../constants';
import IconComponent from '../Icons';
import close_icon from '../../assets/icon/close_icon';
import { STYLES } from '../../constants/theme';
import CustomAmount from '../CustomAmount';
import EachProduct from './EachProduct';
import CustomButton from '../Button';
import { useSelector } from 'react-redux';

const ProductList = ({
  t,
  list,
  addQty,
  subQty,
  amount,
  addToCart,
  closeList,
  refRBSheet,
  toggleProduct,
  isItemSelected,
  onChangeCount,
  handleFavorite,
  selectBulk
}) => {
  const { height } = Dimensions.get('window');
  const { favListAnimate } = useSelector(state => state.home);
  const { addedToCart } = useSelector(state => state.cart);

  const addToCartList = () => {
    let arr = JSON.parse(JSON.stringify(list));
    let isTray = true
    arr = arr.filter(f => f.isSelected);
    arr.forEach(fe => {
      addToCart(
        fe?.isBulk ? fe?.allowed_quantities_list[fe?.count - 1] : fe?.count,
        fe?.id,
        null,
        fe?.name,
        fe?.totAmount,
        isTray
      );
    });
  };



  return (
    <RBSheet
      ref={refRBSheet}
      height={height * 0.97}
      openDuration={250}
      animationType="slide"
      closeOnPressBack={false}
      customStyles={{
        container: styles.containerStyle,
      }}>
      <View style={{ padding: 20,paddingHorizontal:10, marginBottom: 120 }}>
        <View style={[{ margin: 10 }, STYLES.spaceBetween]}>
          <CustomText text={t('Select_Items')} style={[FONTS.Bold16]} />
          <TouchableOpacity onPress={closeList}>
            <IconComponent name={close_icon} />
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={list}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => {
            return (
              <EachProduct
                t={t}
                item={item}
                index={index}
                addQty={addQty}
                subQty={subQty}
                toggleProduct={toggleProduct}
                onChangeCount={onChangeCount}
                favListAnimate={favListAnimate}
                handleFavorite={handleFavorite}
                selectBulk={selectBulk}
              />
            );
          }}
        />
      </View>
      <View style={styles.totView}>
        <View style={[STYLES.spaceBetween, { marginVertical: 10 }]}>
          <CustomText text={t('Total_Amount')} style={[FONTS.Bold16]} />
          <CustomAmount price={amount ?? '0'} style={[FONTS.Bold16]} />
        </View>
        <CustomButton
          onPress={addToCartList}
          disabled={!isItemSelected || addedToCart}
          buttonText={t(addedToCart ? 'Added_to_Cart' : 'Add_to_Cart')}
          style={{ width: '100%' }}
          greenBack={addedToCart}
        />
      </View>
    </RBSheet>
  );
};

export default memo(ProductList);
