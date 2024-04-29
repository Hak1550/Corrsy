import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomButton from '../Button';
import {loginServices} from '../../store/services/Auth';
import {Colors} from '../../constants/Colors';
import LoaderComponent from '../LoaderComponent';
import {getProfileRequest} from '../../store/actions/Auth';

const ImagePickerModal = ({
  show,
  setImage,
  cameraOnly,
  closePicker,
  galleryOnly,
  setProfile,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getImageId = image => {
    var body = new FormData();
    body.append('file', image);
    if (setProfile) {
      loginServices
        .setProfileService(body)
        .then(result => {
          let obj = {...image, ...result?.data};
          setImage(obj);
          closePicker();
          setLoading(false);
          dispatch(getProfileRequest());
        })
        .catch(e => {
          console.log('getImageId err', e);
          setLoading(false);
        });
    } else {
      loginServices
        .imageUploaderService(body)
        .then(result => {
          let obj = {...image, ...result?.data};
          setImage(obj);
          closePicker();
          setLoading(false);
        })
        .catch(e => {
          console.log('getImageId err', e);
          setLoading(false);
        });
    }
  };

  const uploadProfilePicture = async option => {
    setLoading(true);
    let imageObj = {};
    if (option) {
      try {
        const result = await launchCamera();
        let image = result?.assets[0];
        imageObj = {
          type: image?.type,
          name: image?.fileName,
          uri: image?.uri,
        };
        getImageId(imageObj);
      } catch (err) {
        closePicker();
        setLoading(false);
      }
    } else {
      try {
        const result = await launchImageLibrary();
        let image = result?.assets[0];
        imageObj = {
          type: image?.type,
          name: image?.fileName,
          uri: image?.uri,
        };
        getImageId(imageObj);
      } catch (err) {
        closePicker();
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (cameraOnly) {
      uploadProfilePicture(true);
    } else if (galleryOnly) {
      uploadProfilePicture(false);
    }
  }, [cameraOnly, galleryOnly]);

  return (
    <Modal
      visible={show}
      transparent={true}
      animationInTiming={500}
      animationIn={'slideInUp'}
      animationOut="slideOutDown"
      animationOutTiming={500}
      style={styles.modalContainer}
      onDismiss={closePicker}
      onBackButtonPress={closePicker}
      onBackdropPress={closePicker}>
      {/* {loading && <LoaderComponent />} */}
      {!galleryOnly && !cameraOnly ? (
        <View style={styles.modalView}>
          <CustomButton
            style={{alignSelf: 'center'}}
            onPress={() => uploadProfilePicture(true)}
            buttonText={'Camera'}
          />

          <CustomButton
            onPress={() => uploadProfilePicture(false)}
            buttonText={'Gallery'}
            style={{alignSelf: 'center'}}
          />
        </View>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default ImagePickerModal;
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#6667',
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: Colors.whiteThemeColor,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    marginHorizontal: 0,
  },
  btn: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
