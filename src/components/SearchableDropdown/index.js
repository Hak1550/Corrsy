import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import close_icon from '../../assets/icon/close_icon';
import {FONTS} from '../../constants';
import {Colors} from '../../constants/Colors';
import IconComponent from '../Icons';

const {height, width} = Dimensions.get('window');
const SearchableDropdown = ({
  data,
  showAreaPicker,
  onClose,
  setValue,
  title,
  isSearchable,
  modalHeight,
}) => {
  const [areas, setAreas] = useState(data);
  const [keyboardOpens, setkeyboardOpens] = useState(false);

  useEffect(() => {
    if (data) {
      let arr = data.sort((a, b) => (a.name > b.name ? 1 : -1));
      setAreas(arr);
    }
  }, [data]);

  const onSearch = e => {
    let arr = data;
    arr = arr.filter(f => f.name.toLowerCase().includes(e.toLowerCase()));
    setAreas(arr);
  };

  const onSelectArea = area => {
    setValue(area);
    onClose();
    // setAreas([])
  };

  return (
    <Modal
      animationType="slide"
      visible={showAreaPicker}
      transparent={true}
      onRequestClose={() => onClose()}
      onDismiss={() => onClose()}
      style={{height: '100%'}}>
      <TouchableHighlight
        style={{flex: 1, backgroundColor: '#0005'}}
        onPress={() => onClose()}
        underlayColor={'transparent'}>
        <View />
      </TouchableHighlight>
      <KeyboardAvoidingView
        keyboardShouldPersistTaps={'handled'}
        style={[
          styles.modal,
          {height: modalHeight ? height * modalHeight : height * 0.95},
        ]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={20}>
        <View style={styles.container}>
          <Text style={[FONTS.Regular14]}>{title}</Text>
          <TouchableOpacity onPress={() => onClose()}>
            <IconComponent name={close_icon} />
          </TouchableOpacity>
        </View>

        {isSearchable && (
          <View>
            <TextInput
              style={styles.mainTxt}
              placeholder="Search Area"
              onChangeText={e => onSearch(e)}
              onFocus={() => setkeyboardOpens(true)}
              onBlur={() => setkeyboardOpens(false)}
            />
          </View>
        )}
        <View style={{minHeight: 400, marginBottom: 130}}>
          <ScrollView
            contentContainerStyle={styles.containerStyles}
            keyboardShouldPersistTaps={'always'}>
            {areas?.length ? (
              areas?.map((eachArea, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.eachArea}
                    onPress={e => onSelectArea(eachArea)}>
                    <Text style={[FONTS.Regular14]}>{eachArea.name}</Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <></>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SearchableDropdown;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    elevation: 2,
    borderTopRightRadius: 26,
    borderTopLeftRadius: 26,
    zIndex: 1000,
    marginTop: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  mainTxt: {
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  subTxt: [
    {
      color: Colors.primary,
      fontSize: 18,
      fontWeight: '400',
      marginBottom: 5,
    },
    FONTS.Regular14,
  ],
  btnView: {
    marginHorizontal: 40,
    width: '80%',
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  btnTxt: [{fontSize: 18, fontWeight: '700', color: '#fff'}, FONTS.Regular14],
  containerStyles: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eachArea: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    width: '85%',
  },
});
