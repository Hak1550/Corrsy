import React, { useEffect, } from 'react';
import { View } from 'react-native';

import SmartImage from '../../../components/SmartImage';
import { images } from '../../../constants';
import styles from './styles';
import { navigate } from '../../../navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { getCoursesRequest } from '../../../store/actions/Home';

const Splash = () => {
  const dispatch = useDispatch()
  const { userId, gradeId, courses } = useSelector(state => state.home)
  let data = { userId, gradeId }
  useEffect(() => {
    if (!courses.length) dispatch(getCoursesRequest(data))
    setTimeout(() => {
      navigate('Home')
    }, 1500)
  }, [])

  return (
    <View style={styles.container}>
      <SmartImage source={images.logo} style={styles.img} />
    </View>
  );
};

export default Splash;

