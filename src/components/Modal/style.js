import {Dimensions, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';

export const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: SIZES.padding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sub_view: {
    width: '100%',
    backgroundColor: COLORS.white,
    minHeight: Dimensions.get('screen').height / 6,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderRadius: 30,
  },
  top_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: COLORS.black,
    ...FONTS.Regular19,
  },
  input: {
    height: 50,
    paddingLeft: SIZES.padding,
    width: '90%',
    color: COLORS.black,
    ...FONTS.Regular14,
  },
  searchBar: {
    height: 44,
    alignSelf: 'center',
    backgroundColor: COLORS.input_background,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: SIZES.padding * 1,
    borderRadius: SIZES.padding2 * 3,
  },
  textInputView: {
    height: 44,
    backgroundColor: COLORS.settingContainer,
    paddingLeft: SIZES.padding,
    marginVertical: SIZES.padding * 1.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    alignSelf: 'center',
    marginTop: SIZES.padding2,
  },
});
