/**
 * @format
 */
// import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Text, TextInput } from 'react-native';


// Reactotron.connect();
// console.tron = Reactotron;

// firebase
// messaging().onMessage(firebaseNotificationHandler.onMessageReceived);
// messaging().setBackgroundMessageHandler(firebaseNotificationHandler.onMessageReceived);
// notifee, same function as OnForegroundEvent
// notifee.onBackgroundEvent(async (props) => firebaseNotificationHandler.handleOnForegroundEvent(props));

AppRegistry.registerComponent(appName, () => App);

if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
}