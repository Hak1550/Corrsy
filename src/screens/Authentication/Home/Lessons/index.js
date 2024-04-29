import { View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import CustomText from '../../../../components/Text'
import { FONTS, images } from '../../../../constants'
import { navigate } from '../../../../navigation/RootNavigation'
import SmartImage from '../../../../components/SmartImage'
import CustomHeader from '../../../../components/CustomHeader'
import { Colors } from '../../../../constants/Colors'
import { setLessonsProgressRequest } from '../../../../store/actions/Home'

const Lesson = () => {
  const dispatch = useDispatch()
  const { lessons, lesLoading } = useSelector(state => state.home)
  const handleWidget = (widget) => {
    navigate('Widgets', { widget })
    dispatch(setLessonsProgressRequest(widget))
  }
  const EachWidget = ({ item }) => (
    <TouchableOpacity key={item?._id} style={styles.eachCourse} activeOpacity={0.8} onPress={() => handleWidget(item)}>
      <SmartImage source={images.widget} style={styles.eachCourseImg} />
      <CustomText text={item?.widgetType === 'video' ? 'Video' : item?.widgetType === 'textAndImages' ? item?.content?.contentTitle : 'Multiple Choice Question'} style={FONTS.Bold14} />
    </TouchableOpacity>
  )
  return (
    <>
      <CustomHeader widget />
      <View style={styles.container} >
        <CustomText text={lessons[0]?.title} style={[FONTS.Bold16, { marginBottom: 10 }]} />
        <CustomText text={`Short Description: ${lessons[0]?.shortDescription}`} style={[FONTS.Bold13, { marginBottom: 5 }]} />
        <CustomText text={`Long Description: ${lessons[0]?.longDescription}`} style={FONTS.SemiBold12} />
        <View style={{ margin: 10, width: '100%' }}>
          {lesLoading ?
            <ActivityIndicator color={Colors.primary} size='large' />
            : <FlatList
              showsHorizontalScrollIndicator={false}
              data={lessons[0]?.widgets}
              keyExtractor={item => item._id.toString()}
              renderItem={({ item }) => <EachWidget item={item} />}
            />}
        </View>
      </View>
    </>
  )
}

export default Lesson