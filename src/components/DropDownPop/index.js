import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  ScrollView,
  Modal,
  TouchableHighlight,
} from 'react-native';
import close_icon from '../../assets/icon/close_icon';
import {FONTS} from '../../constants';
import {Colors} from '../../constants/Colors';
import IconComponent from '../Icons';
import {styles} from './style';

const DropdownPopup = ({
  modalShow,
  closeModal,
  setModalShow,
  selectedItem,
  title,
  placeHolder,
  data,
  setValue,
}) => {
  const {height: screenHeight} = Dimensions.get('screen');
  const [fade, setFade] = useState(false);
  function setPickerValue(item) {
    setValue(item);
    closeModal();
    setFade(false);
  }

  const onClose = () => {
    closeModal();
  };
  useEffect(() => () => setFade(false), []);

  return (
    <>
      <TouchableOpacity onPress={() => setModalShow()} style={styles.container}>
        <View style={styles.inpView}>
          <View style={{marginRight: 5, flex: 0.9}}>
            <Text style={styles.inpTxt}>{selectedItem || placeHolder}</Text>
          </View>
          <View style={{flex: 0.12}}>
            {/* <Icon name="down" color={Colors.primary} size={15} /> */}
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={modalShow}
        transparent={true}
        onRequestClose={() => onClose()}
        onDismiss={() => onClose()}>
        <TouchableHighlight
          style={{flex: 1, backgroundColor: '#0005'}}
          onPress={() => onClose()}
          underlayColor={'transparent'}>
          <View />
        </TouchableHighlight>
        <View
          activeOpacity={1}
          onPress={() => setModalShow(false)}
          style={{
            justifyContent: 'center',
          }}>
          <View style={styles.popupView(screenHeight)}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.popupTxt}>{title}</Text>
              <TouchableOpacity onPress={() => onClose()}>
                <IconComponent name={close_icon} />
              </TouchableOpacity>
            </View>
            <View>
              <ScrollView style={{marginVertical: 10}}>
                {data &&
                  data.length > 0 &&
                  data?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{padding: 10}}
                        onPress={() => setPickerValue(item)}>
                        <View style={{borderBottomWidth: 0.5}}>
                          <Text style={[FONTS.Regular14]}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DropdownPopup;
