import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { images } from '../../constants';

const SmartImage = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingErrored, setLoadingErrored] = useState(false);
  return (
    <View>
      <FastImage
        {...props}
        onLoadStart={() => {
          setIsLoading(true);
          setLoadingErrored(false);
        }}
        onLoadEnd={e => setIsLoading(false)}
        onError={(e) => {
          setIsLoading(false);
          setLoadingErrored(true)
        }}
        resizeMode={props?.resizeMode ?? 'contain'}
        style={props.style}
      />
      {loadingErrored ?
        <View style={styles.loadingView}>
          <FastImage
            source={images.wrongImg}
            style={{ height: '50%', width: '50%', marginRight: props?.isCatItem ? 33 : props?.isBrandItem ? 13 : 5 }}
            resizeMode="contain"
          />
        </View>
        : isLoading && props?.showDefault ? (
          <View style={styles.loadingView}>
            <FastImage
              source={images.logoPlaceholder}
              style={{ height: '70%', width: '65%', marginRight: props?.isCatItem ? 33 : props?.isBrandItem ? 13 : 5 }}
              resizeMode="contain"
            />
          </View>
        ) : null}
    </View>
  );
};

export default SmartImage;

const styles = StyleSheet.create({
  loadingView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
