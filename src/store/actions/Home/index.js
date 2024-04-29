import * as types from '../../constants/Home';

//  getCoursesProfile
export const getCoursesRequest = (data) => ({
  type: types.GET_COURSES_REQUEST,
  data,
});

export const getCoursesSuccess = response => ({
  type: types.GET_COURSES_SUCCESS,
  response,
});

export const getCoursesFailed = response => ({
  type: types.GET_COURSES_FAILED,
  response,
});

//  getSubjectsProfile
export const getSubjectsRequest = (data, course_id) => ({
  type: types.GET_SUBJECTS_REQUEST,
  data,
  course_id
});

export const getSubjectsSuccess = (response,id) => ({
  type: types.GET_SUBJECTS_SUCCESS,
  response,
  id
});

export const getSubjectsFailed = response => ({
  type: types.GET_SUBJECTS_FAILED,
  response,
});

//  getLessonsProfile
export const getLessonsRequest = data => ({
  type: types.GET_LESSONS_REQUEST,
  data,
});

export const getLessonsSuccess = response => ({
  type: types.GET_LESSONS_SUCCESS,
  response,
});

export const getLessonsFailed = response => ({
  type: types.GET_LESSONS_FAILED,
  response,
});
