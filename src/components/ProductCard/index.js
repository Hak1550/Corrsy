import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { FONTS } from '../../constants/theme';
import { Colors } from '../../constants/Colors';
import SmartImage from '../SmartImage';
import { images } from '../../constants';
import CustomText from '../Text';
import CustomAmount from '../CustomAmount';
import IconComponent from '../Icons';
import dropdown_icon from '../../assets/icon/dropdown_icon';
import plus_icon from '../../assets/icon/plus_icon';
import ProductModal from '../ProductModal';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartRequest, clearCartStatus, deleteCartItemRequest } from '../../store/actions/Cart';
import ProductList from '../ProductListPage';
import { navigate } from '../../navigation/RootNavigation';
import { postFavoriteProductsRequest, postNotifyMeRequest } from '../../store/actions/Home';
import { appFlyerEvent, customAnalytics } from '../../utils/Helper';
import PopupModal from '../PopupModal';

const ProductCard = ({ t, item, vertical, productType }) => {
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const { addedToCart, cart } = useSelector(state => state.cart);
  const { userProfile } = useSelector(state => state.auth);
  const { notifyMe, recommendedProducts, lastOrderProducts, purchasedAgainProducts } = useSelector(state => state.home);

  const [amount, setAmount] = useState(0);
  const [attributes, setAttributes] = useState([]);
  const [isItemSelected, setItemSelected] = useState(false);
  const [modal, setModal] = useState({
    notifyMe: false,
    product: false
  });


  const setAttributesArray = () => {

    let arr = [];
    if (item.child_items) {
      arr = JSON.parse(JSON.stringify(item?.child_items));
    } else {
      arr = JSON.parse(JSON.stringify([item]));
    }
    arr.forEach(fe => {
      fe.isSelected = false;
      fe.count = 0;
      fe.isBulk = fe?.allowed_quantities_list.length;
      fe.perCarton = fe?.allowed_quantities_list[0];
      fe.amount =
        fe?.isBulk && fe?.price_model?.discounted_price > 0
          ? fe?.allowed_quantities_list[0] * fe?.price_model?.discounted_price
          : fe?.isBulk && fe?.price_model?.discounted_price === 0
            ? fe?.allowed_quantities_list[0] * fe?.price_model?.price
            : fe?.price_model?.discounted_price > 0
              ? fe?.price_model?.discounted_price
              : fe?.price_model?.price;
      fe.totAmount = 0;
      fe.flatDiscPrice =
        fe?.perCarton && fe?.price_model.discounted_price > 0
          ? fe?.price_model.discounted_price * fe?.perCarton
          : fe?.price_model.discounted_price;
      fe.maxOrderQty = fe?.isBulk
        ? Math.min(
          Math.round(fe?.order_maximum_quantity / fe.perCarton),
          Math.round(fe?.stock_quantity / fe.perCarton),
        )
        : Math.min(fe?.order_maximum_quantity, fe?.stock_quantity);
    });

    setAttributes(arr);
  }
  const handleAnalytics = (event, data) => {
    customAnalytics(event, data);
  };
  const handleAppsFlyer = (event, data) => {
    appFlyerEvent(event, data)
  };
  const openModal = () => {
    let data = { item: attributes[0]?.name };
    handleAnalytics('itemClicked', data);
    handleAppsFlyer('af_content_view', {
      af_content_id: attributes[0]?.id,
      af_content: attributes[0]?.name,
      af_price: attributes[0]?.price_model?.price,
      af_currency: 'TZS',
    });
    setModal({
      notifyMe: false,
      product: true
    })
  };
  const openList = () => {
    let data = { item: attributes[0]?.name };
    handleAnalytics('itemListClicked', data);
    handleAppsFlyer('af_list_view', {
      af_content_id: attributes[0]?.id,
      af_content: attributes[0]?.name,
      af_price: attributes[0]?.price_model?.price,
      af_currency: 'TZS',
    });
    refRBSheet?.current?.open();
  };
  const closeList = () => {
    refRBSheet?.current?.close();
    setModal({
      notifyMe: false,
      product: false
    })
    setAttributesArray();
  };
  const addToCart = (
    quantity,
    product_id,
    discount_id,
    product_name,
    value,
    isTray
  ) => {
    let arr = [...attributes];
    arr.forEach(fe => {
      fe.count = 0;
      fe.totAmount = 0;
      fe.isSelected = false;
    });
    setAttributes(arr);
    setAmount(0);
    const inCart = cart.filter(s => s?.product_id === product_id)
    let data = { quantity, product_id, discount_id: discount_id ?? null };
    if (inCart.length) {
      dispatch(deleteCartItemRequest(inCart[0]?.id, data, isTray));
    } else {
      dispatch(addToCartRequest(data, isTray));
    }
    let data1 = {
      item: product_name,
      quantity,
      product_id,
      currency: 'TZS',
      value,
      total_value: `Tzs. ${value}`,
    };
    handleAnalytics('add_to_cart', data1);
    handleAppsFlyer('af_add_to_cart', {
      af_content_id: product_id,
      af_content: product_name,
      af_price: (value / quantity).toFixed(2),
      af_currency: 'TZS',
      af_quantity: quantity,
    });
    closeList();
  };
  const addQty = id => {
    let arr = [...attributes];
    arr
      .filter(f => f.id === id)
      .map(m => {
        if (m.count === 0) m.isSelected = true;
        m.count = m.count + 1;
        m.totAmount = m.count * m.amount;
      });
    setAttributes(arr);
  };
  const subQty = id => {
    let arr = [...attributes];

    arr
      .filter(f => f.id === id)
      .map(m => {
        if (m.count === 1) {
          m.isSelected = false;
        } else if (m.count - 1 <= m.maxOrderQty) {
          m.isSelected = true;
        }
        m.count = m.count - 1;
        m.totAmount = m.count * m.amount;
      });
    setAttributes(arr);
  };
  const toggleProduct = id => {
    let arr = [...attributes];

    arr
      .filter(f => f.id === id)
      .map(m => {
        // console.log(m.count,m.);
        m.isSelected = !m.isSelected;
        if (m.count === 0) {
          m.count = 1;
        } else {
          m.count = 0;
        }
        m.totAmount = m.count * m.amount;
      });
    setAttributes(arr);
  };
  const onChangeCount = (e, id) => {
    let arr = [...attributes];
    arr
      .filter(f => f.id === id)
      .map(m => {
        // console.log('onChangeCount', e, +e && +e <= m.maxOrderQty ? true : false);
        m.count = +e;
        m.totAmount = m.count * m.amount;
        m.isSelected = +e && +e <= m.maxOrderQty ? true : false;
        m.totAmount = +e > m.maxOrderQty ? 0 : m.totAmount;
      });
    setAttributes(arr);
  };
  const handleFavorite = (item, isTray, isPDP) => {
    const { parent_grouped_product_id, id, name } =
      item;
    let arr = [...attributes];
    let isAlreadyFavorite = arr.filter(f => f.id === id)[0]?.is_favorite;
    if (isPDP) setAttributes(arr);
    // console.log('isAlreadyFavorite', isAlreadyFavorite, item, arr);
    let data = { product_id: id };
    let parent_id = parent_grouped_product_id;
    dispatch(postFavoriteProductsRequest(data, productType, parent_id, isTray));
    if (!isAlreadyFavorite) {
      let data = { item: name, user: userProfile?.id };
      handleAnalytics('favorite', data);
    }
  };
  // console.log('recommendedProducts', recommendedProducts);
  const selectBulk = (id, obj) => {
    let arr = [...attributes];
    arr.filter(f => f.id === id).map(m => {
      m.count = obj?.MinimumDiscountedQuantity
      m.amount = m.perCarton ? +obj.DiscountedPrice * m?.perCarton : +obj.DiscountedPrice
      m.totAmount = m.perCarton ? +obj?.MinimumDiscountedQuantity * +obj.DiscountedPrice * m?.perCarton : +obj?.MinimumDiscountedQuantity * +obj.DiscountedPrice
      m.bulkDiscPrice = m.perCarton ? +obj.DiscountedPrice * m?.perCarton : +obj.DiscountedPrice
      m.isSelected = true
    })
    setAttributes(arr)
  };
  const openPDP = () => {
    let data = { item: attributes[0]?.name };
    handleAnalytics('itemClicked', data);
    handleAppsFlyer('af_content_view', {
      af_content_id: attributes[0]?.id,
      af_content: attributes[0]?.name,
      af_price: attributes[0]?.price_model?.price,
      af_currency: 'TZS',
    });
    navigate('ProductDetail', {
      item: attributes,
      isProduct: true,
      onChangeCount,
      addQty,
      subQty,
      addToCart,
      handleFavorite,
      setAttributesArray,
      handleNotifyMe
    });
  };
  const closeModal = () => {
    setModal(prev => ({
      ...prev,
      notifyMe: false
    }))
  }
  const handleNotifyMe = (item) => {
    const { sku, parent_grouped_product_id, id, name } =
      item;
    let arr = [...attributes];
    arr
      .filter(f => f.id === id)
      .map(m => (m.is_subscribed = !m.is_subscribed));
    setAttributes(arr);
    let parent_id = parent_grouped_product_id;
    let data = {
      CustomerId: userProfile?.id,
      SkuId: sku
    }
    dispatch(postNotifyMeRequest(data, productType, parent_id))
    // console.log('handleNotifyMe', item, data, productType, parent_id);
    // setModal(prev => ({
    //   ...prev,
    //   notifyMe: true
    // }))
    let data2 = { item: name, user: userProfile?.id };
    handleAnalytics('notifyMe', data2);

  }
  // console.log('notifyMe', notifyMe);

  useEffect(() => {
    setAttributesArray();
  }, [recommendedProducts, lastOrderProducts, purchasedAgainProducts]);

  useEffect(() => {
    if (attributes.length) {
      let itemSelected = attributes.some(s => s.isSelected);
      let totalAmount = attributes.reduce(
        (accumulator, currentValue) => accumulator + currentValue?.totAmount,
        0,
      );
      setAmount(totalAmount);
      setItemSelected(itemSelected);
    }
  }, [attributes]);

  useEffect(() => {
    if (addedToCart) {
      dispatch(clearCartStatus());
    }
  }, [addedToCart]);
  // useEffect(() => {
  //   if (modal.notifyMe) {
  //     setTimeout(() => {
  //       setModal(prev => ({
  //         ...prev,
  //         notifyMe: false
  //       }))
  //     }, 3000)
  //   }
  // }, [modal.notifyMe])
  // console.log(JSON.stringify(item, null, 8));
  // console.log(item);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={openPDP}
      style={styles.container(vertical)}>
      <SmartImage
        source={
          attributes[0]?.images.length
            ? { uri: attributes[0]?.images[0]?.src }
            : images.logoPlaceholder
        }
        showDefault
        style={{ height: 100, width: '100%', marginVertical: 10 }}
      />
      {/* =========================== Bulk Discount Tag ====================== */}
      {!attributes[0]?.flatDiscPrice && attributes[0]?.discount_list?.length ? (
        <View style={[styles.bulkView()]}>
          <SmartImage
            style={styles.bulkImg}
            source={images.bulkDiscount}
          />
        </View>
      ) : null}
      {/* =========================== Favorite Tag ====================== */}
      <TouchableOpacity onPress={() => handleFavorite(attributes[0])} style={[styles.favoriteIcon,]}>
        <SmartImage
          style={styles.favoriteImg}
          source={attributes[0]?.is_favorite ? images.favorite : images.notFavorite}
        />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {attributes[0]?.isBulk ? (
          <SmartImage
            source={images.carton}
            style={{ height: 15, width: 15, marginRight: 5 }}
          />
        ) : null}
        {/* =========================== Price ====================== */}
        <CustomAmount
          price={attributes[0]?.amount}
          style={{ alignSelf: 'flex-start' }}
        />
      </View>
      {/* =========================== Flat Discount ====================== */}
      {/* {attributes[0]?.flatDiscPrice ? (
        <ProductCutPrice price_model={attributes[0]?.price_model} vertical perCarton={item?.perCarton} />
      ) : <View style={{ height: 20 }}></View>} */}

      {/* =========================== Name ====================== */}
      <CustomText
        text={attributes[0]?.item_name}
        style={styles.name}
        numberOfLines={1}
      />

      {/* =========================== Select Items ====================== */}
      <View style={styles.btnsView}>
        <TouchableOpacity
          style={[styles.btnsView, styles.select]}
          onPress={attributes.length > 1 ? openList : openModal}>
          <CustomText
            text={
              attributes.length > 1 ? t('Select_Items') : attributes[0]?.Grams
            }
            numberOfLines={1}
            style={[FONTS.Regular10, { color: Colors.blackColor }]}
          />
          {attributes.length > 1 && <IconComponent name={dropdown_icon} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={openModal}>
          <IconComponent name={plus_icon} />
        </TouchableOpacity>
      </View>

      {/* ====================== Pop up Modal =========================== */}
      {modal?.product && (
        <ProductModal
          t={t}
          addQty={addQty}
          subQty={subQty}
          item={attributes[0]}
          addToCart={addToCart}
          showModal={modal?.product}
          closeModal={closeList}
          selectBulk={selectBulk}
          onChangeCount={onChangeCount}
          handleFavorite={handleFavorite}
          handleNotifyMe={handleNotifyMe}
        />
      )}

      <ProductList
        t={t}
        addQty={addQty}
        subQty={subQty}
        amount={amount}
        list={attributes}
        addToCart={addToCart}
        closeList={closeList}
        refRBSheet={refRBSheet}
        setList={setAttributes}
        selectBulk={selectBulk}
        toggleProduct={toggleProduct}
        onChangeCount={onChangeCount}
        isItemSelected={isItemSelected}
        handleFavorite={handleFavorite}
        handleNotifyMe={handleNotifyMe}
      />

      {modal?.notifyMe && (
        <PopupModal
          heading={'You_will_be_notified_when_the_stock_is_available'}
          closeModal={closeModal}
          image={images.notify}
          showModal={modal.notifyMe}
          imageStyle={{ height: 100, width: 100, marginTop: -60 }}
        />
      )}

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: vertical => ({
    margin: 7,
    height: 205,
    elevation: 5,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    width: vertical ? '46%' : 180,
    borderColor: Colors.grayColor,
    backgroundColor: Colors.whiteThemeColor,
  }),
  btnsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  select: {
    padding: 7,
    width: '78%',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.grayColor,
  },
  name: [FONTS.SemiBold15, { color: Colors.blackColor, marginVertical: 2 }],
  favoriteIcon: {
    height: 20,
    width: 20,
    position: 'absolute',
    zIndex: 10,
    top: 15,
    right: 15
  },
  favoriteImg: {
    height: 20,
    width: 20,
  },
  bulkView: rec => ({
    height: 30,
    width: 30,
    position: 'absolute',
    zIndex: 10,
    top: 15,
    left: 10
  }),
  bulkImg: {
    height: 30,
    width: 30,
  },

});
export default memo(ProductCard);
