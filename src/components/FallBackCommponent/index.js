import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FONTS} from '../../constants';
import CustomText from '../Text';
import {navigate} from '../../navigation/RootNavigation';
import {useTranslation} from 'react-i18next';
import { Colors } from '../../constants/Colors';

const FallbackComponent = ({
  heading,
  headingStyle,
  text,
  imgStyle,
  style,
  imageUrl,
  buttonText,
  navigation,
}) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.main, imgStyle]}>
        <Image
          source={imageUrl}
          style={{flex: 1, height: undefined, width: undefined}}
        />
      </View>
      {heading && (
        <View style={{marginBottom: 10}}>
          <CustomText
            style={[FONTS.Bold18, {textAlign: 'center'}, headingStyle]}
            text={heading}
          />
        </View>
      )}
      <View>
        <CustomText
          style={[FONTS.SemiBold15, {textAlign: 'center'}, headingStyle]}
          text={text}
        />
      </View>
      {buttonText && (
        <TouchableOpacity
          onPress={() => navigate(navigation)}
          style={styles.addMoreItem}>
          <CustomText style={styles.addMoreItemTxt} text={buttonText} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FallbackComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height:'100%',
  },
  main: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  addMoreItem: {
    backgroundColor: Colors.primary,
    marginHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 50,
    marginBottom: 50,
    alignItems: 'center',
    elevation: 5,
    marginTop: 10,
    width:'80%',
  },
  addMoreItemTxt: [FONTS.Bold16, {color: Colors.whiteThemeColor,}],
});
