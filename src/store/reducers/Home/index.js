import * as types from '../../constants/Home';

const INITIAL_STATE = {
  loading: false,
  subLoading: false,
  lesLoading: false,
  courses: [],
  subjects: [],
  lessons: [],
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVkYzYyY2MxYWEwMDc4MDAwZjljMDEiLCJpYXQiOjE3MTM3MzQxOTh9.2ZIPdqfGIEbm0t6iSE14HTQw1ASehe_hijG_iEnWFJU',
  userId: '65edc62cc1aa0078000f9c01',
  gradeId: '6625514923f87505231c8f89',
};

export default function homeReducer(state = INITIAL_STATE, action) {
  const newState = JSON.parse(JSON.stringify(state));
  const {courses, subjects, lessons} = newState;

  switch (action.type) {
    case types.GET_COURSES_REQUEST:
      return {
        ...newState,
        loading: true,
        lessons: [],
        subjects: [],
      };

    case types.GET_COURSES_SUCCESS:
      let course = action?.response?.data;
      course.forEach(fe => {
        fe.isSelected = false;
      });
      return {
        ...newState,
        loading: false,
        courses: course,
      };
    case types.GET_COURSES_FAILED:
      return {
        ...newState,
        loading: false,
      };

    case types.GET_SUBJECTS_REQUEST:
      return {
        ...newState,
        subLoading: true,
        lessons: [],
        subjects: [],
      };

    case types.GET_SUBJECTS_SUCCESS:
      let cor_id = action?.id?.course_id;
      let sub = action?.response?.data;
      sub[0]?.lessons.forEach(fe => {
        fe.progress = 0;
      });
      courses.forEach(fe => {
        if (fe._id === cor_id) {
          fe.isSelected = true;
        } else {
          fe.isSelected = false;
        }
      });
      return {
        ...newState,
        subLoading: false,
        subjects: sub,
      };
    case types.GET_SUBJECTS_FAILED:
      return {
        ...newState,
        subLoading: false,
      };

    case types.GET_LESSONS_REQUEST:
      return {
        ...newState,
        lesLoading: true,
        lessons: [],
      };

    case types.GET_LESSONS_SUCCESS:
      let les = action?.response?.data;
      les[0]?.widgets.forEach(fe => {
        fe.isSeen = false;
      });
      return {
        ...newState,
        lesLoading: false,
        lessons: action?.response?.data,
      };
    case types.GET_LESSONS_FAILED:
      return {
        ...newState,
        lesLoading: false,
      };

    case types.SET_LESSON_PROGRESS:
      subjects[0]?.lessons.forEach(f => {
        if (f._id === lessons[0]?._id) {
          if (!action?.data?.isSeen) {
            console.log('isSeen');
            f.progress = f.progress + 1 / lessons[0]?.widgets.length;
            f.seen = true;
          }
        }
      });
      return {
        ...newState,
        subjects,
      };

    default:
      return state;
  }
}
