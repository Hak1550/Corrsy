import { View, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import CustomText from '../../../../components/Text'
import { FONTS, images } from '../../../../constants'
import { navigate } from '../../../../navigation/RootNavigation'
import SmartImage from '../../../../components/SmartImage'
import CustomHeader from '../../../../components/CustomHeader'

const Lesson = () => {
  const { lessons } = useSelector(state => state.home)
  console.log(lessons);
  const handleWidet = (widget) => {
    navigate('Widgets', { widget })
  }
  const EachWidget = ({ item }) => (
    <TouchableOpacity key={item?._id} style={styles.eachCourse} activeOpacity={0.8} onPress={() => handleWidet(item)}>
      <SmartImage source={images.widget} style={styles.eachCourseImg} />
      <CustomText text={item?.widgetType === 'video' ? 'Video' : item?.widgetType === 'textAndImages' ? item?.content?.contentTitle : 'Multiple Choice Question'} style={FONTS.Bold14} />
    </TouchableOpacity>
  )
  return (
    <>
      <CustomHeader widget />
      <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
        <CustomText text={lessons[0]?.title} style={FONTS.Bold13} />
        <CustomText text={`Short Description: ${lessons[0]?.shortDescription}`} style={FONTS.Bold13} />
        <CustomText text={`Long Description: ${lessons[0]?.longDescription}`} style={FONTS.Bold13} />
        <View style={{ margin: 10, width:'100%' }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={lessons[0]?.widgets}
            keyExtractor={item => item._id.toString()}
            renderItem={({ item }) => <EachWidget item={item} />}
          />
        </View>
      </ScrollView>
    </>
  )
}

export default Lesson