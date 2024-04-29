import { StyleSheet, TouchableOpacity, View, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Swipeable from 'react-native-swipeable';
import { useDispatch } from 'react-redux';

import { Colors } from '../../constants/Colors';
import { FONTS, STYLES } from '../../constants/theme';
import { images } from '../../constants';
import SmartImage from '../SmartImage';
import CustomText from '../Text';
import CustomAmount from '../CustomAmount';
import IconComponent from '../Icons';
import minus_round_icon from '../../assets/icon/minus_round_icon';
import plus_icon from '../../assets/icon/plus_icon';
import TextInputMask from 'react-native-text-input-mask';
import plus_icon_disabled from '../../assets/icon/plus_icon_disabled';
import { setFavListAnimation } from '../../store/actions/Home';
import ProductCutPrice from '../ProductCutPrice';
import BulkMenu from '../BulkMenu';
import AsLowAs from '../AsLowAs';

const EachProduct = ({
  t,
  item,
  index,
  addQty,
  subQty,
  handleFavorite,
  favListAnimate,
  toggleProduct,
  onChangeCount,
  selectBulk,
  handleNotifyMe,
}) => {
  const dispatch = useDispatch();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [isSwiping, setIsSwiping] = useState(false);
  const rightButtons = (
    <View style={styles.favView}>
      <View style={{ width: 100, alignItems: 'center' }}>
        <SmartImage source={images.favorite} style={{ height: 22, width: 22 }} />
        <View>
          <CustomText
            text={t('Add_Remove_Favorites')}
            style={{ alignItems: 'center' }}
          />
        </View>
      </View>
    </View>
  );

  useEffect(() => {
    if (favListAnimate <= 3 && index === 0) {
      dispatch(setFavListAnimation());
    }
  }, []);

  useEffect(() => {
    const slideRight = Animated.timing(slideAnim, {
      toValue: 1,
      delay: 1000,
      duration: 1000,
      useNativeDriver: true,
    });
    const slideLeft = Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    });
    const slideSequence = Animated.sequence([slideRight, slideLeft]);
    // Run the combined animation indefinitely
    // Animated.loop(slideSequence).start();
    // Run the combined animation once
    slideSequence.start();
  }, [slideAnim]);

  return (
    <Swipeable
      onRightActionDeactivate={() => handleFavorite(item, true)}
      rightActionActivationDistance={100}
      rightContent={rightButtons}
      onSwipeStart={() => setIsSwiping(true)}
      onSwipeRelease={() => setIsSwiping(false)}>
      <Animated.View
        activeOpacity={1}
        style={styles.animatedView(index, favListAnimate, slideAnim)}>
        <TouchableOpacity activeOpacity={1}>
          <View
            style={[STYLES.spaceBetween, { marginBottom: 10, width: '100%' }]}>
            <View
              style={{
                width: '70%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {/* ---------------------- Check Mark View ---------------------- */}
              <TouchableOpacity
                style={{ alignItems: 'center', width: 45 }}
                onPress={() => toggleProduct(item?.id)}
                disabled={
                  item?.stock_quantity < 1 || item?.count > item?.maxOrderQty
                }>
                <SmartImage
                  source={
                    item.stock_quantity < 1
                      ? images.oosIcon
                      : item?.isSelected
                        ? images.check
                        : images.unCheck
                  }
                  style={{ height: 30, width: 30 }}
                />
                {/* {item?.stock_quantity < 1 && <CustomText style={[styles.notifyTxt]} text={t('Out_of_stock')} />} */}
              </TouchableOpacity>
              {/* ---------------------- Item Image View ---------------------- */}
              <SmartImage
                source={
                  item?.images[0]?.src
                    ? { uri: item?.images[0]?.src }
                    : images.logoPlaceholder
                }
                showDefault
                style={{ height: 50, width: 50, marginRight: 10 }}
              />
              {/* ---------------------- Naming View ---------------------- */}
              <View>
                <CustomText text={item?.item_name} style={[FONTS.SemiBold14]} />
                <CustomText text={item?.Grams} style={[FONTS.Regular10]} />

                {item?.flatDiscPrice ? (
                  <ProductCutPrice
                    price_model={item?.price_model}
                    perCarton={item?.perCarton}
                  />
                ) : null}
                {!item?.flatDiscPrice && item?.discount_list?.length > 0 && (
                  <AsLowAs
                    perCarton={item?.perCarton}
                    list={item?.discount_list}
                  />
                )}
                <CustomText
                  text={t(item?.isBulk ? 'Carton_Price' : 'Item_Price')}
                  style={[FONTS.SemiBold10, { marginTop: 5 }]}
                />
                {item?.bulkDiscPrice ? (
                  <ProductCutPrice
                    price_model={{
                      ...item?.price_model,
                      discounted_price: item?.bulkDiscPrice,
                    }}
                    perCarton={item?.perCarton}
                    cart
                  />
                ) : null}
                <CustomAmount price={item?.amount} />
              </View>
            </View>
            {/* ---------------------- Plus Minus Button View ---------------------- */}
            {/* <>
                 <TouchableOpacity
                  onPress={() => handleNotifyMe(item)}
                  activeOpacity={0.9}
                  disabled={item?.is_subscribed}
                  style={styles.notifyMeView}>
                  <SmartImage
                    style={styles.notifyMeImg}
                    source={
                      item?.is_subscribed ? images.notifyme2 : images.notifyme
                    }
                  />
                  {!item?.is_subscribed ? (
                      <CustomText style={styles.notifyMeTxt} text={t('Notify_Me')} />
                    ) : null}
                  </TouchableOpacity>
                </> */}
            <View style={{ width: '30%' }}>
              {item?.is_favorite && (
                <View style={{ position: 'absolute', right: 5, top: 10 }}>
                  <SmartImage
                    source={images.favorite}
                    style={{ height: 15, width: 15 }}
                  />
                </View>
              )}
              {item?.stock_quantity > 0 ? (
                <View
                  style={[
                    STYLES.spaceBetween,
                    { marginTop: item?.flatDiscPrice ? 40 : 20 },
                  ]}>
                  {item?.count > 0 ? (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => subQty(item?.id)}>
                      <IconComponent name={minus_round_icon} />
                    </TouchableOpacity>
                  ) : (
                    <View></View>
                  )}
                  <View style={{ width: 32 }}>
                    <TextInputMask
                      onChangeText={e => onChangeCount(e, item?.id)}
                      value={item?.count > 0 ? `${item?.count}` : null}
                      style={[
                        FONTS.SemiBold12,
                        { color: Colors.primary, textAlign: 'center' },
                      ]}
                      keyboardType="number-pad"
                      mask="[00000]"
                    />
                  </View>
                  <TouchableOpacity
                    disabled={item?.count >= item?.maxOrderQty}
                    activeOpacity={0.8}
                    onPress={() => addQty(item?.id)}>
                    <IconComponent
                      name={
                        item?.count >= item?.maxOrderQty
                          ? plus_icon_disabled
                          : plus_icon
                      }
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ ...styles.OOSView }}>
                  <CustomText
                    text={t('Out_of_stock')}
                    style={[FONTS.Bold12, { color: Colors.whiteThemeColor }]}
                  />
                </View>
              )}

              {item?.count > item?.maxOrderQty ? (
                <View style={{ alignItems: 'center', marginTop: -5 }}>
                  <CustomText
                    text={`Max. qty ${item?.maxOrderQty} units`}
                    style={[FONTS.SemiBold10, { color: Colors.red }]}
                  />
                </View>
              ) : item?.isBulk && item?.count ? (
                <View style={{ alignItems: 'center', marginTop: -5 }}>
                  <CustomText
                    text={`${item?.count * item?.perCarton} pcs`}
                    style={[FONTS.SemiBold10, { color: Colors.primary }]}
                  />
                </View>
              ) : null}
            </View>
          </View>
          {/* ===================== BUlk Discount ============================= */}
          {!item?.flatDiscPrice && item?.discount_list?.length > 0 ? (
            <BulkMenu
              discount_list={item?.discount_list}
              itemId={item?.id}
              selectBulk={selectBulk}
              actualPrice={item?.price_model?.price}
              perCarton={item?.perCarton}
              stock_quantity={item?.stock_quantity}
            />
          ) : null}
        </TouchableOpacity>
        {!isSwiping && rightButtons}
      </Animated.View>
    </Swipeable>
  );
};

export default EachProduct;

const styles = StyleSheet.create({
  OOSView: {
    backgroundColor: Colors.red,
    borderRadius: 50,
    padding: 5,
    marginTop: 35,
    alignItems: 'center',
  },
  favView: {
    marginLeft: 10,
    paddingLeft: 10,
    width: 150,
    justifyContent: 'center',
    backgroundColor: Colors.lightBlue,
    height: 80,
  },
  notifyMeView: {
    zIndex: 1,
    alignItems: 'center',
    marginBottom: 0,
  },
  notifyMeImg: {
    width: 40,
    height: 40,
  },
  notifyMeTxt: [
    FONTS.Bold16,
    {
      fontSize: 11,
      marginBottom: 10,
      textAlign: 'center',
      color: Colors.primary,
    },
  ],
  notifyTxt: [
    FONTS.Bold16,
    {
      fontSize: 8,
      textAlign: 'center',
      color: Colors.red,
    },
  ],
  oosBtn: {
    width: 30,
    height: 30,
  },
  animatedView: (index, favListAnimate, slideAnim) => ({
    flexDirection: 'row',
    transform:
      index === 0 && favListAnimate <= 3
        ? [
          {
            translateX: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -150], // Adjust the distance as needed
            }),
          },
        ]
        : [],
  }),
});
