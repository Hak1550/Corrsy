import React, {Component} from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import Lottie from 'lottie-react-native';
import SmartImage from '../SmartImage';
import {images} from '../../constants';
import LottieView from 'lottie-react-native';

const LoaderComponent = () => {
  return (
    <Modal
      back
      transparent={true}
      animationType={'none'}
      visible={true}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <LottieView
            source={require('../../assets/gif/Pre-Loader.json')}
            autoPlay
            loop
            style={{transform: [{rotate: '270deg'}], height: 50, width: 50}}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#6665',
  },
  activityIndicatorWrapper: {
    padding: 25,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default LoaderComponent;
