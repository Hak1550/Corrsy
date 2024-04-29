import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  totView: {
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 5,
    backgroundColor: Colors.whiteThemeColor,
    paddingBottom:10
  },

  containerStyle: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});
