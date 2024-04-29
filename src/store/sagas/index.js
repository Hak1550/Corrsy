import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import homeRootSaga from './Home';
import homeReducer from '../reducers/Home';

function* rootSaga() {
  yield all([fork(homeRootSaga)]);
}
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store


const homePersistConfig = {
  key: 'home',
  storage: AsyncStorage,
  whitelist: [
    'courses',
    'subjects',
    'lessons',
    'token',
  ],
};


const combinedReducers = combineReducers({
  home: persistReducer(homePersistConfig, homeReducer),
});

const store = createStore(combinedReducers, applyMiddleware(sagaMiddleware));

// then run the saga
const persistStores = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistStores };