import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Actionsheet} from 'native-base';

import {Colors} from '../../constants/Colors';

const Repost = ({
  isOpenRepost,
  setIsOpenRepost,
  name,
  handleRePost,
  handleRepostThought,
}) => {
  const onClose = () => {
    setIsOpenRepost(false);
  };

  return (
    <Actionsheet isOpen={isOpenRepost} onClose={onClose}>
      <Actionsheet.Content>
        <Actionsheet.Item
          onPress={() => {
            handleRepostThought();
            onClose();
          }}
          startIcon={
            <Image
              source={require('./../../Assets/Images/icon-gallery.png')}
              style={{width: 22, height: 22, tintColor: Colors.greenColor}}
            />
          }>
          Repost with your thoughts
          <Text
            style={{
              fontSize: 12,
            }}>{`Create a new Post with ${name} post attached`}</Text>
        </Actionsheet.Item>
        <Actionsheet.Item
          onPress={() => {
            handleRePost();
            onClose();
          }}
          startIcon={
            <Image
              source={require('./../../Assets/Images/cam.png')}
              style={{width: 22, height: 22, tintColor: Colors.greenColor}}
            />
          }>
          Repost
          <Text
            style={{
              fontSize: 12,
            }}>{`Instantly bring ${name} post to your feeds`}</Text>
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default Repost;

const styles = StyleSheet.create({});
