import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FONTS, STYLES } from '../../constants/theme';
import { Colors } from '../../constants/Colors';
import SmartImage from '../SmartImage';
import { images } from '../../constants';
import CustomText from '../Text';
import CustomAmount from '../CustomAmount';
import IconComponent from '../Icons';
import plus_icon from '../../assets/icon/plus_icon';
import Custom_Modal from '../Modal';
import minus_round_icon from '../../assets/icon/minus_round_icon';
import CustomButton from '../Button';
import TextInputMask from 'react-native-text-input-mask';
import plus_icon_disabled from '../../assets/icon/plus_icon_disabled';
import { useSelector } from 'react-redux';
import ProductCutPrice from '../ProductCutPrice';
import BulkMenu from '../BulkMenu';
const ProductModal = ({
  t,
  item,
  showModal,
  closeModal,
  addToCart,
  addQty,
  subQty,
  handleFavorite,
  onChangeCount,
  selectBulk,
  handleNotifyMe
}) => {
  const { addedToCart } = useSelector(state => state.cart);
  const handleAddToCart = () => {
    addToCart(
      item?.isBulk
        ? item?.allowed_quantities_list[item?.count - 1]
        : item?.count,
      item?.id,
      null,
      item?.name,
      item?.totAmount,
    );
  };

  // console.log('pro mod ', item);
  // console.log('selectedVariant?.bulkDiscPrice',JSON?.stringify(item,null,8));

  return (
    <Custom_Modal
      visible={showModal}
      onRequestClose={closeModal}
      close={closeModal}>
      <TouchableOpacity
        style={styles.favView}
        onPress={() => handleFavorite(item)}>
        <SmartImage
          source={item?.is_favorite ? images.favorite : images.notFavorite}
          style={styles.favImg}
        />
      </TouchableOpacity>

      {/* ===================== Product Image ============================= */}
      <SmartImage
        source={
          item?.images.length
            ? { uri: item?.images[0]?.src }
            : images.logoPlaceholder
        }
        showDefault
        style={styles.modalImg}
      />
      {/* ========================Notify Me ================================= */}
      {/* {item?.stock_quantity < 1 ? (
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
      ) : null} */}
      {/* ========================= Name =============================== */}
      <View style={{ ...STYLES.spaceBetween, alignItems: 'flex-start' }}>
        <View>
          <CustomText text={item?.item_name} style={styles.name} />
          <CustomText text={item?.Grams} style={styles.gram} />
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <CustomText
            text={t(item?.isBulk ? 'Carton_Price' : 'Item_Price')}
            style={styles.unit}
          />
          {item?.bulkDiscPrice ? (
            <ProductCutPrice price_model={{ ...item?.price_model, discounted_price: item?.bulkDiscPrice }} perCarton={item?.perCarton} cart />
          ) : null}
          {item?.flatDiscPrice ? (
            <ProductCutPrice price_model={item?.price_model} perCarton={item?.perCarton} style={styles.cutPrice} />
          ) : null}
          <CustomAmount price={item?.amount} />
        </View>
      </View>
      {/* ===================== Select Quantity =========================== */}
      <View style={[STYLES.spaceBetween, styles.selectQtyView]}>
        <CustomText text={t('Select_Quantity')} style={styles.name} />
        {item?.stock_quantity > 0 ? (
          <View>
            <View style={[STYLES.spaceBetween]}>
              {item?.count > 0 ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => subQty(item?.id)}>
                  <IconComponent name={minus_round_icon} />
                </TouchableOpacity>
              ) : (
                <></>
              )}
              <View style={{ width: 45 }}>
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
        ) : (
          <View style={styles.OOSView}>
            <CustomText
              text={t('Out_of_stock')}
              style={[FONTS.Bold12, { color: Colors.whiteThemeColor }]}
            />
          </View>
        )}
      </View>
      {/* ---------------------- Bulk Discount -------------------- */}
      {!item?.flatDiscPrice &&
        item?.discount_list?.length > 0 ? (
        <BulkMenu
          discount_list={item?.discount_list}
          itemId={item?.id}
          selectBulk={selectBulk}
          actualPrice={item?.price_model?.price}
          perCarton={item?.perCarton}
          stock_quantity={item?.stock_quantity}

        />
      ) : null}
      {/* --------------- Add to Cart Button ------------------ */}
      <View style={STYLES.spaceBetween}>
        <CustomText text={t('Amount')} style={styles.name} />
        <CustomAmount price={item?.totAmount} />
      </View>
      <CustomButton
        buttonText={t(addedToCart ? 'Added_to_Cart' : 'Add_to_Cart')}
        textStyle={[FONTS.Bold15, { color: Colors.whiteThemeColor }]}
        disabled={
          !item?.count || item?.count > item?.maxOrderQty || addedToCart
        }
        onPress={handleAddToCart}
        style={{ alignSelf: 'center' }}
        greenBack={addedToCart}
      />
    </Custom_Modal>
  );
};

const styles = StyleSheet.create({
  name: [FONTS.SemiBold15, { color: Colors.blackColor, marginVertical: 5 }],
  gram: [FONTS.light10, { color: Colors.blackColor, }],
  unit: [FONTS.Bold12, { color: Colors.primary, marginVertical: 5 }],
  selectQtyView: {
    paddingVertical: 10,
    marginVertical: 10,
    borderBottomColor: Colors.border,
    borderTopColor: Colors.border,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  modalImg: {
    height: 200,
    width: '80%',
    alignSelf: 'center',
    marginTop: -20,
    zIndex: -1,
  },
  OOSView: {
    backgroundColor: Colors.red,
    borderRadius: 50,
    padding: 5,
  },
  favView: { marginTop: -25, width: 22, height: 22 },
  favImg: { height: '100%', width: '100%' },
  cutPrice: { flexDirection: 'column', marginBottom: 5 },
  notifyMeView: {
    alignSelf: 'flex-start',
    marginTop: -30,
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
});
export default ProductModal;
