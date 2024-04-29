import React from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Text, StyleSheet, View} from 'react-native';
import {Colors} from '../../constants/Colors';
import CustomText from '../Text';
const CELL_COUNT = 6;

const OtpView = ({value, setValue}) => {
  // console.log('value',value);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        renderCell={({index, symbol, isFocused}) => {
          return (
            <View
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              <CustomText
                style={styles.textStyle}
                text={symbol || (isFocused ? <Cursor /> : null)}
              />
            </View>
          );
        }}
      />
    </>
  );
};

export default OtpView;
const styles = StyleSheet.create({
  buttonStyle: {
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 1,
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginVertical: 15},
  cell: {
    textAlign: 'center',
    height: 48,
    width: '14.5%',
    borderRadius: 10,
    backgroundColor: Colors.whiteThemeColor,
    elevation: 5,
    marginHorizontal: 0,
    color: Colors.blackColor,
    borderColor: Colors.border,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusCell: {
    borderColor: Colors.primary,
  },
  textStyle: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
