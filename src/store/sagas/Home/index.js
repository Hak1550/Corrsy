import { put, call, all, spawn, takeEvery } from 'redux-saga/effects';
import { homeServices } from '../../services/Home';
import * as types from '../../constants/Home';
import * as actions from '../../actions/Home';
import { showToast } from '../../../utils/Helper';
import { ToastAndroid } from 'react-native';


//getCourses
function* getCoursesWorker(action) {
  try {
    const result = yield call(homeServices.getCoursesService, action);
    // console.log('getCoursesWorker', result);

    yield put(actions.getCoursesSuccess(result, action));
  } catch (err) {
    yield put(actions.getCoursesFailed(err, action));
    console.log('getCoursesWorker err', err);
  }
}
function* getCoursesWatcher() {
  yield takeEvery(types.GET_COURSES_REQUEST, getCoursesWorker);
}

//getSubjects
function* getSubjectsWorker(action) {
  try {
    const result = yield call(homeServices.getSubjectsService, action);
    // console.log('getSubjectsWorker', result);

    yield put(actions.getSubjectsSuccess(result, action));
  } catch (err) {
    yield put(actions.getSubjectsFailed(err, action));
    console.log('getSubjectsWorker err', err);
  }
}
function* getSubjectsWatcher() {
  yield takeEvery(types.GET_SUBJECTS_REQUEST, getSubjectsWorker);
}

//getLessons
function* getLessonsWorker(action) {
  try {
    const result = yield call(homeServices.getLessonsService, action);
    // console.log('getLessonsWorker', result);

    yield put(actions.getLessonsSuccess(result, action));
  } catch (err) {
    yield put(actions.getLessonsFailed(err, action));
    console.log('getLessonsWorker err', err);
  }
}
function* getLessonsWatcher() {
  yield takeEvery(types.GET_LESSONS_REQUEST, getLessonsWorker);
}



export default function* homeRootSaga() {
  const sagas = [
    getCoursesWatcher,
    getSubjectsWatcher,
    getLessonsWatcher
  ];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log('error', e);
          }
        }
      }),
    ),
  );
}
