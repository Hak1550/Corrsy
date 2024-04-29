import {View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './style';
import CustomText from '../Text';
import {FONTS} from '../../constants';
import IconComponent from '../Icons';
import close_icon from '../../assets/icon/close_icon';

const Custom_Modal = ({
  visible,
  onRequestClose,
  close,
  text,
  children,
  style,
  mainStyle,
  onBackDropPress,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
      onBackDropPress={onBackDropPress}>
      <View style={[styles.main_view, mainStyle]}>
        <View style={[styles.sub_view, style]}>
          {text || close ? (
            <View style={styles.top_row}>
              <CustomText text={text} style={[FONTS.SemiBold20]} />
              <TouchableOpacity onPress={close} style={{padding: 5}}>
                <IconComponent name={close_icon} />
              </TouchableOpacity>
            </View>
          ) : null}
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default Custom_Modal;
