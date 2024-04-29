import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import SmartImage from '../SmartImage';

const BrandComponent = ({
  manufactureHome,
  promoContainer1,
  brandClicked,
  quickView,
}) => {
  return (
    <>
      {manufactureHome?.map((item, index) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            onPress={() => brandClicked(item)}
            style={[
              promoContainer1,
              {
                borderWidth: item?.isSelected && quickView ? 3 : 1,
                borderColor:
                  item?.isSelected && quickView
                    ? Colors.primary
                    : Colors.lightGrayColor,
              },
            ]}>
            <SmartImage
              style={{ width: 70, height: 70 }}
              resizeMode={'contain'}
              source={
                item?.image?.src
                  ? { uri: item?.image?.src }
                  : images.logoPlaceholder
              }
              showDefault
              isBrandItem
            />
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export default BrandComponent;
