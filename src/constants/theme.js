import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from './Colors';


const {width, height} = Dimensions.get('window');
export const COLORS = {
  primary: '#0d5288',
  primary2: '#07192A',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  text_gray_color: '#BDBDBD',
  input_background: '#FFF9FD',
  input_border: '#C50077',
  dot_Color: '#FFE8F7',
  settingContainer: '#FFE8F7',
  flow_border: '#707070',
  emoji_background: 'rgba(255, 232, 247, 100)',
  error: '#df4759',
  disabled: '#B5B5B5',
  success: '#20c997',
  info: '#467fd0',
  fertile_window_color: '#C3BFFC',
  ovulation_color: '#FDB470',
  high_fertility_color: '#FDB470',
  selected_date_color: '#FFD3BE',
  ovulationDate: '#E57CC7',
  fertileStartDate: '#C44393',
  fertileEndDate: '#FF8BD5',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius_sm: 4,
  radius: 30,
  padding: 20,
  padding2: 12,

  // font sizes
  h9: 9,
  h10: 10,
  h11: 11,
  h12: 12,
  h13: 13,
  h14: 14,
  h15: 15,
  h16: 16,
  h17: 17,
  h18: 18,
  h19: 19,
  h20: 20,
  h21: 21,
  h22: 22,
  h23: 23,
  h24: 24,
  h25: 25,
  h26: 26,
  h27: 27,
  h28: 28,
  h30: 30,
  h32: 32,

  // app dimensions
  width,
  height,
};
export const STYLES = {
  HorizontalAlign: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  spaceBetween: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width:'100%'
  },
  VerticalAlign: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
};

export const FONTS = {
  // Regular
  Regular10: {
    fontFamily: 'Gilroy-Regular',
    color: Colors.blackColor,
    fontSize: RFValue(SIZES.h10),
  },
  Regular12: {
    fontFamily: 'Gilroy-Regular',
    fontSize: RFValue(SIZES.h12),
    color: Colors.blackColor,
  },
  Regular13: {
    fontFamily: 'Gilroy-Regular',
    fontSize: RFValue(SIZES.h13),
    color: Colors.blackColor,
  },
  Regular14: {
    fontFamily: 'Gilroy-Regular',
    fontSize: RFValue(SIZES.h14),
    color: Colors.blackColor,
  },
  Regular15: {
    fontFamily: 'Gilroy-Regular',
    fontSize: RFValue(SIZES.h15),
    color: Colors.blackColor,
  },

  Regular19: {
    fontFamily: 'Gilroy-Regular',
    fontSize: RFValue(SIZES.h19),
    color: Colors.blackColor,
  },

  Regular24: {
    fontFamily: 'Gilroy-Regular',
    fontSize: RFValue(SIZES.h24),
    color: Colors.blackColor,
  },

  // Medium
  Medium11: {
    fontFamily: 'Gilroy-Medium',
    fontSize: RFValue(SIZES.h11),
    color: Colors.blackColor,
  },
  Medium13: {
    fontFamily: 'Gilroy-Medium',
    fontSize: RFValue(SIZES.h13),
    color: Colors.blackColor,
  },
  Medium15: {
    fontFamily: 'Gilroy-Medium',
    fontSize: RFValue(SIZES.h15),
    color: Colors.blackColor,
  },
  Medium17: {
    fontFamily: 'Gilroy-Medium',
    fontSize: RFValue(SIZES.h17),
    color: Colors.blackColor,
  },
  Medium20: {
    fontFamily: 'Gilroy-Medium',
    fontSize: RFValue(SIZES.h20),
    color: Colors.blackColor,
  },
  Medium19: {
    fontFamily: 'Gilroy-Medium',
    fontSize: RFValue(SIZES.h19),
    color: Colors.blackColor,
  },
  Medium24: {
    fontFamily: 'Gilroy-Medium',
    fontSize: RFValue(SIZES.h24),
    color: Colors.blackColor,
  },
  Medium28: {
    fontFamily: 'Gilroy-Medium',
    fontSize: RFValue(SIZES.h28),
    color: Colors.blackColor,
  },

  //SemiBold
  SemiBold10: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: RFValue(SIZES.h10),
    color: Colors.blackColor,
  },

  SemiBold12: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: RFValue(SIZES.h12),
    color: Colors.blackColor,
  },
  SemiBold14: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: RFValue(SIZES.h14),
    color: Colors.blackColor,
  },
  SemiBold15: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: RFValue(SIZES.h15),
    color: Colors.blackColor,
  },
  SemiBold28: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: RFValue(SIZES.h28),
    color: Colors.blackColor,
  },
  SemiBold24: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: RFValue(SIZES.h24),
    color: Colors.blackColor,
  },
  SemiBold20: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: RFValue(SIZES.h20),
    color: Colors.blackColor,
  },
  SemiBold18: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: RFValue(SIZES.h18),
    color: Colors.blackColor,
  },
  SemiBold16: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: RFValue(SIZES.h16),
    color: Colors.blackColor,
  },

  //Bold
  Bold10: {
    fontFamily: 'Gilroy-Bold',
    fontSize: RFValue(SIZES.h10),
    color: Colors.blackColor,
  },
  Bold12: {
    fontFamily: 'Gilroy-Bold',
    fontSize: RFValue(SIZES.h12),
    color: Colors.blackColor,
  },
  Bold13: {
    fontFamily: 'Gilroy-Bold',
    fontSize: RFValue(SIZES.h13),
    color: Colors.blackColor,
  },
  Bold14: {
    fontFamily: 'Gilroy-Bold',
    fontSize: RFValue(SIZES.h14),
    color: Colors.blackColor,
  },
  Bold15: {
    fontSize: RFValue(SIZES.h15),
    fontFamily: 'Gilroy-Bold',
    color: Colors.blackColor,
  },
  Bold16: {
    fontFamily: 'Gilroy-Bold',
    fontSize: RFValue(SIZES.h16),
    color: Colors.blackColor,
  },
  Bold18: {
    fontFamily: 'Gilroy-Bold',
    fontSize: RFValue(SIZES.h18),
    color: Colors.blackColor,
  },
  Bold20: {
    fontFamily: 'Gilroy-Bold',
    fontSize: RFValue(SIZES.h20),
    color: Colors.blackColor,
  },

  // light
  light15: {
    fontFamily: 'Gilroy-Light',
    color: Colors.blackColor,
    fontSize: RFValue(SIZES.h15),
  },
  light14: {
    fontFamily: 'Gilroy-Light',
    color: Colors.blackColor,
    fontSize: RFValue(SIZES.h14),
  },
  light10: {
    fontFamily: 'Gilroy-Light',
    color: Colors.blackColor,
    fontSize: RFValue(SIZES.h10),
  },
  light9: {
    fontFamily: 'Gilroy-Light',
    color: Colors.blackColor,
    fontSize: RFValue(SIZES.h9),
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
