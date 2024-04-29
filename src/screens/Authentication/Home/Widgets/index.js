import { View, FlatList, ScrollView } from 'react-native'
import VideoPlayer from 'react-native-video-controls';

import React, { useRef } from 'react'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import CustomText from '../../../../components/Text'
import { FONTS } from '../../../../constants'
import CustomHeader from '../../../../components/CustomHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Quiz from '../Component/Quiz';

const Widgets = ({ route }) => {
  const dispatch = useDispatch()
  const videoRef = useRef(null);

  let { widget } = route?.params
  const { lessons } = useSelector(state => state.home)

  console.log(widget, widget?.videoWidgetContent?.videoUrl);



  return (
    <>
      <CustomHeader widget />
      <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
        <CustomText text={`Widget Type: ${widget?.widgetType === 'textAndImages' ? 'Text' : widget?.widgetType === 'video' ? 'Video' : 'Multiple Choice'}`} style={FONTS.SemiBold12} />
        <CustomText text={`Description: ${widget?.content?.contentTitle ?? widget?.videoWidgetContent?.summary ?? widget?.mcqWidgetContent?.title}`} style={[FONTS.Bold13, { marginTop: 20 }]} />
        <View style={{ marginTop: 10, height: hp(80) }}>
          {widget?.widgetType === 'textAndImages' ?
            <CustomText text={widget?.content?.description} />
            :
            widget?.widgetType === 'video' ?
              <View style={styles.vidView(widget?.videoWidgetContent?.videoUrl)}>
                <VideoPlayer
                  ref={videoRef}
                  source={{ uri: widget?.videoWidgetContent?.videoUrl }}
                  style={styles.vidStyle}
                  resizeMode={'contain'}
                  repeat={false}
                  disableBack={true}
                />
              </View>
              : <Quiz />
          }
        </View>
      </ScrollView>
    </>
  )
}

export default Widgets