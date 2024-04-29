import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  home_focused_icon,
  home_unfocused_icon,
} from '../assets/icon';
import {
  FavoriteRoutes,
  HomeRoutes,
} from './BottomTabRoutes';
import { Colors } from '../constants/Colors';
import IconComponent from '../components/Icons';
import { useTranslation } from 'react-i18next';
import CustomText from '../components/Text';
import { FONTS } from '../constants';
import { useSelector } from 'react-redux';
import favorite_focused_icon from '../assets/icon/favorite_focused_icon';
import favorite_unfocused_icon from '../assets/icon/favorite_unfocused_icon';

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {

  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={styles.barNav}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 56, paddingBottom: 0 },
      }}>
      <Tab.Screen
        name="HomeRoutes"
        component={HomeRoutes}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => (
            <View
              activeOpacity={1}
              style={focused ? styles.blueView : styles.grayView}
              onPress={() => setIsModalVisible(false)}>
              <IconComponent
                name={focused ? home_focused_icon : home_unfocused_icon}
                iconHeight={30}
              />
              <CustomText
                text={t('Home')}
                style={focused ? styles.blueTxt : styles.grayTxt}
              />
            </View>
          ),
          headerShown: false,
        }}
      />


    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  barNav: {
    backgroundColor: Colors.whiteThemeColor,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  blueView: {
    // justifyContent: 'center',
    alignItems: 'center',
    width: 65,
  },
  Img: { height: 25, width: 25 },
  center: { height: 40, width: 40, transform: [{ rotate: '45deg' }] },
  center2: { height: 40, width: 40 },
  blueTxt: [
    {
      fontSize: 11,
      color: Colors.primary,
      textAlign: 'center',
    },
    FONTS.SemiBold10,
  ],
  grayView: {
    alignItems: 'center',
    width: 65,
  },
  grayTxt: [
    {
      fontSize: 11,
      color: Colors.darkGrayColor,
      textAlign: 'center',
    },
    FONTS.Regular10,
  ],
  badge: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 9,
    marginLeft: -9,
    marginTop: 8,
    fontWeight: 'bold',
  },
  container: {
    margin: 0,
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#6666',
  },
  modalView: {
    backgroundColor: Colors.whiteThemeColor,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.border,
    // alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '40%',
    padding: 20,
    bottom: 60,
    elevation: 5,
  },
  each: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '24%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  eachTxt: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.blackColor,
  },
  cartBallon: {
    height: 15,
    width: 15,
    backgroundColor: Colors.red,
    position: 'absolute',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
  },
});
