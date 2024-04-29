import { View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import * as Progress from 'react-native-progress';
import React from 'react'
import styles from './styles'
import CustomText from '../../../components/Text'
import CustomHeader from '../../../components/CustomHeader'
import { useDispatch, useSelector } from 'react-redux'
import SmartImage from '../../../components/SmartImage'
import { images } from '../../../constants'
import { FONTS, STYLES } from '../../../constants/theme'
import { Colors } from '../../../constants/Colors'
import { getLessonsRequest, getSubjectsRequest } from '../../../store/actions/Home'
import { navigate } from '../../../navigation/RootNavigation';

const Home = () => {
  const dispatch = useDispatch()
  const { courses, subjects, subLoading } = useSelector(state => state.home)
  // console.log(courses);
  const getSubject = (id, course_id) => dispatch(getSubjectsRequest(id, course_id))
  const getLesson = (id) => {
    navigate('Lesson')
    dispatch(getLessonsRequest(id))
  }
  
  const EachCourse = ({ item }) => (
    <TouchableOpacity key={item?._id} style={styles.eachCourse(item?.isSelected)} activeOpacity={0.1} onPress={() => getSubject(item?.subject?._id, item?._id)}>
      <SmartImage source={images.dice} style={styles.eachCourseImg} />
      <CustomText text={item?.subject?.uniCode} style={FONTS.Bold14} />
    </TouchableOpacity>
  )
  const EachSubject = ({ item }) => (
    <TouchableOpacity key={item?._id} style={styles.eachSubject} activeOpacity={1} >
      <SmartImage source={images.abc} style={styles.eachSubjectImg} />
      <CustomText text={item?.chapter[0]?.chapter_name} style={FONTS.Bold14} />
    </TouchableOpacity>
  )
  const EachLesson = ({ item }) => (
    <TouchableOpacity key={item?._id} style={styles.eachSubject} activeOpacity={0.1} onPress={() => getLesson(item?._id)}>
      <SmartImage source={images.abc} style={styles.eachSubjectImg} />
      <CustomText text={`Lesson ${item?.lessonNumber}`} style={[FONTS.Regular13, { color: Colors.whiteThemeColor }]} />
      <CustomText text={item?.title} style={[FONTS.Bold12, { textAlign: 'center' }]} />
      <Progress.Bar progress={item?.progress} width={100} />
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <CustomHeader title={'Home'} />
      <View >
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={courses}
          keyExtractor={item => item._id.toString()}
          renderItem={({ item }) => <EachCourse item={item} />}
        />
      </View>
      {subLoading ?
        <ActivityIndicator color={Colors.primary} size='large' />
        : subjects.length ?
          <View style={[STYLES.HorizontalAlign, { width: '100%' }]}>
            <FlatList
              data={subjects}
              keyExtractor={item => item._id?._id.toString()}
              renderItem={({ item }) => <EachSubject item={item} />} />
          </View>
          : <></>
      }
      <View style={styles.lessonViews}>
        {subjects.length ?
          <View>
            <FlatList
              numColumns={2}
              data={subjects[0]?.lessons}
              keyExtractor={item => item._id.toString()}
              renderItem={({ item }) => <EachLesson item={item} />} />
          </View>
          : <></>
        }
      </View>

    </View>
  )
}

export default Home