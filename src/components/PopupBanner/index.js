import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {VolumeManager} from 'react-native-volume-manager';
import VideoPlayer from 'react-native-video-controls';
import {useDispatch} from 'react-redux';

import SmartImage from '../SmartImage';
import {Colors} from '../../constants/Colors';
import {getCategoriesRequest} from '../../store/actions/Home';
import {navigate} from '../../navigation/RootNavigation';
import {customAnalytics} from '../../utils/Helper';
import IconComponent from '../Icons';
import close_icon from '../../assets/icon/close_icon';

const PopupBanner = ({modalShow, closeModal, banner}) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const [realState, setRealState] = useState({
    status: false,
    volume: 1,
    playBtn: false,
  });

  const handleAnalytics = event => {
    let data = {
      [event]: banner?.image_url ?? banner,
    };
    customAnalytics(event, data);
  };

  const handleNavigation = () => {
    closeModal();
    if (banner?.type_id) {
      dispatch(getCategoriesRequest({catId: banner?.type_id}));
      navigate('ProductTabBar', {
        catName: '',
        itemId: banner?.popup_banner?.type_id,
      });
      handleAnalytics('HomePopupClicked');
    }
  };

  const handleVideoVolume = async () => {
    VolumeManager.showNativeVolumeUI({enabled: true});
    if (realState.volume === 1) {
      setRealState(prev => ({
        ...prev,
        volume: 0,
      }));
      await VolumeManager.setVolume(0);
    } else {
      setRealState(prev => ({
        ...prev,
        volume: 1,
      }));
      await VolumeManager.setVolume(1);
    }
  };

  const toggleVideo = () => {
    setRealState(prev => ({
      ...prev,
      status: !prev.status,
    }));
  };

  const toggleVideoBtn = bool => {
    setRealState(prev => ({
      ...prev,
      playBtn: bool,
    }));
  };
  useEffect(() => {
    handleAnalytics('HomePopupImpression');
  }, []);
  return (
    <Modal
      transparent={true}
      visible={modalShow}
      onRequestClose={closeModal}
      onBackDropPress={closeModal}
      animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigation} style={styles.image}>
          {banner?.popup_banner?.isvideo ? (
            <View style={styles.vidView()}>
              <TouchableOpacity
                style={styles.volumeBtn}
                onPress={handleVideoVolume}></TouchableOpacity>
              {realState?.playBtn ? (
                <TouchableOpacity
                  style={styles.playBtn}
                  onPress={toggleVideo}></TouchableOpacity>
              ) : null}
              <VideoPlayer
                ref={videoRef}
                source={{uri: banner?.image_url}}
                style={styles.image}
                resizeMode={'cover'}
                navigator={null}
                controlAnimationTiming={1000}
                toggleResizeModeOnFullscreen={false}
                disableBack={true}
                disablePlayPause={true}
                disableFullscreen={true}
                paused={realState?.status}
                onShowControls={() => toggleVideoBtn(true)}
                onHideControls={() => toggleVideoBtn(false)}
              />
            </View>
          ) : (
            <SmartImage
              source={{uri: banner?.image_url ?? banner}}
              style={styles.image}
              resizeMode="cover"
              defaultShow
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
          <IconComponent name={close_icon} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PopupBanner;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0009',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  image: {height: 550, width: 325, borderRadius: 10},

  closeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteThemeColor,
    height: 40,
    width: 40,
    borderRadius: 50,
    marginTop: 30,
  },
  vidView: video => ({
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: Colors.black,
    height: 550,
    width: 325,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  }),
});
