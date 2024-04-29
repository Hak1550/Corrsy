import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Custom_Modal from '../Modal';
import SmartImage from '../SmartImage';
import CustomText from '../Text';
import { FONTS } from '../../constants';
import { Colors } from '../../constants/Colors';
import { useTranslation } from 'react-i18next';

const PopupModal = ({
  image,
  heading,
  text,
  showModal,
  yesBtnTxt,
  noBtnTxt,
  yesBtn,
  noBtn,
  closeModal,
  imageStyle,
  children,
  disabledYesBtn,
  style
}) => {
  const { t } = useTranslation()
  return (
    <Custom_Modal
      close={closeModal}
      visible={showModal}
      onRequestClose={closeModal}
      onBackdropPress={closeModal}
      mainStyle={style}>
      <View style={styles.imgPopup2}>
        {image ? <SmartImage
          source={image}
          style={{ width: 80, height: 80, marginVertical: 5, ...imageStyle }}
        /> : null}
        <CustomText style={styles.modalHeading} text={t(heading)} />
        {text &&
          <CustomText style={styles.modalTxt} text={t(text)} />
        }
        <View>{children}</View>
        {(yesBtn || noBtn) && (
          <View style={styles.btnView}>
            {noBtn && (
              <TouchableOpacity
                activeOpacity={1}
                onPress={noBtn}
                style={styles.modalBtn2}>
                <CustomText style={styles.btnTxt} text={t(noBtnTxt ?? 'Cancel')} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              activeOpacity={1}
              onPress={yesBtn}
              disabled={disabledYesBtn}
              style={styles.modalBtn3(noBtn, disabledYesBtn)}>
              <CustomText style={styles.btnTxt2} text={t(yesBtnTxt ?? 'Confirm')} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Custom_Modal>
  );
};

export default PopupModal;

const styles = StyleSheet.create({
  imgPopup2: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: -30,
    zIndex: -2,
  },

  modalHeading: [
    {
      textAlign: 'center',
    },
    FONTS.Bold16,
  ],
  modalTxt: [
    {
      textAlign: 'center',
    },
    FONTS.Regular10,
  ],

  modalTileView: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingBottom: 2,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },

  modalBtn2: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingHorizontal: 10,
    width: '49%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBtn3: (noBtn, disabled) => ({
    borderRadius: 50,
    backgroundColor: disabled ? Colors?.disabled : Colors.primary,
    paddingHorizontal: 20,
    justifyContent: 'center',
    width: !noBtn ? '70%' : '49%',
  }),
  btnView: {
    height: 35,
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnTxt: [
    FONTS.Bold14,
    {
      color: Colors.primary,
      textAlign: 'center',
    },
  ],
  btnTxt2: [
    FONTS.Bold14,
    {
      color: Colors.whiteThemeColor,
      textAlign: 'center',
    },
  ],
});
