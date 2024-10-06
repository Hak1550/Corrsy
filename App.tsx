import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView, } from 'react-native';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';

import Navigation from './src/navigation/Navigation';
import {persistStores, store} from './src/store/sagas';
import { toastConfig } from './src/utils/Helper';

const App = () => {

  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStores}>
          <SafeAreaView style={{flex: 1}}>
            <Navigation />
          </SafeAreaView>
          <Toast
            config={toastConfig}
            position={'bottom'}
            autoHide={true}
            visibilityTime={1000}
            height={100}
          />
        </PersistGate>
      </Provider>
  );
};

export default App;
