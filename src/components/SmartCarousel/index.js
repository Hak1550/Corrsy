import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SmartImage from '../SmartImage';
import { Colors } from '../../constants/Colors';
import { customAnalytics } from '../../utils/Helper';

const sliderWidth = Dimensions.get('window').width;
const sliderHeight = Dimensions.get('window').height;

export const SmartCarousel = ({
  containerStyle,
  slides,
  carouselClicked,
}) => {
  const [width, setWidth] = useState(sliderWidth);
  const [activeSlide, setActiveSlide] = useState(0);

  const pagination = (activeSlide, slidesLength) => {
    return (
      <Pagination
        dotsLength={slidesLength}
        activeDotIndex={activeSlide}
        containerStyle={{
          marginTop: -30,
          paddingVertical: 15,
          containerStyle,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: -10,
          backgroundColor: Colors.primary,
        }}
        inactiveDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: Colors.dim_gray,
          marginHorizontal: -10,
          backgroundColor: Colors.dim_gray,
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={0.9}
      />
    );
  };

  const CarouselRef = useRef(null);

  const func = () => {
    let data = {
      carouselImpression: slides[activeSlide]?.pictureUrl,
    };
    customAnalytics('carouselImpression', data);
  };

  useEffect(() => {
    func();
  }, [activeSlide]);


  return (
    <View
      style={{ flex: 1 }}
      onLayout={event => {
        setWidth(event.nativeEvent.layout.width);
      }}>
      <Carousel
        loop={true}
        data={slides}
        autoplay={true}
        ref={CarouselRef}
        itemWidth={width}
        enableSnap={true}
        layout={'default'}
        swipeThreshold={30}
        sliderWidth={width}
        autoplayDelay={5000}
        useScrollView={true}
        enableMomentum={true}
        decelerationRate={0.5}
        autoplayInterval={5000}
        layoutCardOffset={width}
        inactiveSlideScale={width}
        sliderHeight={sliderHeight}
        onSnapToItem={index => setActiveSlide(index)}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{ height: sliderHeight / 5, width: '100%', }}
              disabled={!item?.categoryId}
              onPress={() => carouselClicked(item)}
              activeOpacity={1}>
              <SmartImage
                source={{ uri: item?.src ?? item?.pictureUrl }}
                resizeMode={'cover'}
                style={{
                  height: sliderHeight / 5,
                  width: '100%',
                }}
                showDefault
              />
            </TouchableOpacity>
          );
        }}
      />

      {pagination(activeSlide, slides.length)}
    </View>
  );
};
