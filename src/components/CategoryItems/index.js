import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FONTS, images } from '../../constants';
import SmartImage from '../SmartImage';
import CustomText from '../Text';
import { Colors } from '../../constants/Colors';
const CategoryItems = ({ title, imageURL, mainStyle }) => {
  return (
    <View style={[styles.categoriesContainer, mainStyle]}>
      <View style={styles.imgView}>
        <SmartImage
          style={styles.img}
          source={imageURL ? { uri: imageURL } : images.logoPlaceholder}
          showDefault
          isCatItem
        />
      </View>
      <CustomText text={title} style={styles.txt} numberOfLines={2} />
    </View>
  );
};

export default CategoryItems;

const styles = StyleSheet.create({
  categoriesContainer: {
    marginBottom: 15,
    borderColor: Colors.border,
    width: '90%',
    height: 95,

  },
  txtView: {
    marginVertical: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: [
    { textAlign: 'center', color: Colors.primary, marginVertical: 5 },
    FONTS.SemiBold14, // {textTransform: 'capitalize'},
  ],
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  img: { height: 70, width: 70, },
});
