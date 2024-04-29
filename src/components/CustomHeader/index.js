import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { FONTS, images, } from '../../constants';
import { Colors } from '../../constants/Colors';
import SmartImage from '../SmartImage';
import { STYLES } from '../../constants/theme';
import CustomText from '../Text';
import Icon from 'react-native-vector-icons/AntDesign';
import { goBack } from '../../navigation/RootNavigation';


const CustomHeader = ({ widget }) => {
  return (
    <>{widget ?
      <View style={styles.container2}>
        <TouchableOpacity onPress={goBack}>
          <Icon name={'left'} style={{ color: Colors.red, fontSize: 25 }} />
        </TouchableOpacity>
        <View style={styles.bar} />
        <TouchableOpacity onPress={goBack}>
          <Icon name={'close'} style={{ color: Colors.red, fontSize: 25 }} />
        </TouchableOpacity>
      </View > :
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.primary} />
        <View style={[STYLES.spaceBetween]}>
          <SmartImage source={images.kaaba} style={styles.img} />
          <View>
            <SmartImage source={images.star} style={styles.img} />
            <View style={{ position: 'absolute', bottom: -8, backgroundColor: Colors.grayColor, width: 35, alignItems: 'center', borderRadius: 10 }}>
              <CustomText text={'56'} style={FONTS.Regular10} />
            </View>
          </View>
          <SmartImage source={images.bell} style={styles.img} />
        </View>
      </View>
    }</>
  );
};

export default CustomHeader;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 60,
    backgroundColor: Colors.primary,
    width: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 15,
    alignItems: 'center',
    height: 60,
    backgroundColor: Colors.whiteThemeColor,
    width: '100%',
  },
  bar: {
    backgroundColor: Colors.red,
    width: '70%',
    height: 20,
    borderRadius: 50
  },
  title: [FONTS.Bold20, { color: Colors.whiteThemeColor }],
  img: { height: 35, width: 35, borderRadius: 50, borderWidth: 2, borderColor: Colors.orangeThemeColor, }

});
