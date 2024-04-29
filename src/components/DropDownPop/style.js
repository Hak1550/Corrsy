import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {Colors} from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 0,
    borderColor: Colors.gray,
    borderRadius: 6,
    paddingVertical: 17,
  },
  inpView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  // inpTxt: [FONTS.Regular14, {color: !selectedItem ? '#c9c9c9' : Colors.black}],
  popupView: height => ({
    maxHeight: height * 0.6,
    minHeight: height * 0.3,
    backgroundColor: '#fff',
    overflow: 'hidden',
    padding: 20,
    borderRadius: 5,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 26,
    borderTopLeftRadius: 26,
  }),
  popupTxt: [FONTS.Regular14],
});
