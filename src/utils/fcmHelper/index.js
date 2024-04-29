import notifee, {
  AndroidBadgeIconType,
  AndroidImportance,
  EventType,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { PERMISSIONS, request } from 'react-native-permissions';
import { navigate } from '../../navigation/RootNavigation';

//method was called to get FCM token for notification
export const getFcmToken = async () => {
  let token = null;
  await checkApplicationNotificationPermission();
  await registerAppWithFCM();
  try {
    token = await messaging().getToken();
    console.log('getFcmToken-->', token);
  } catch (error) {
    console.log('getFcmToken Device Token error ', error);
  }
  return token;
};

//method was called on  user register with firebase FCM for notification
export async function registerAppWithFCM() {
  // console.log(
  //   'registerAppWithFCM status',
  //   messaging().isDeviceRegisteredForRemoteMessages,
  // );
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .registerDeviceForRemoteMessages()
      .then(status => {
        console.log('registerDeviceForRemoteMessages status', status);
      })
      .catch(error => {
        console.log('registerDeviceForRemoteMessages error ', error);
      });
  }
}

//method was called on un register the user from firebase for stopping receiving notifications
export async function unRegisterAppWithFCM() {
  console.log(
    'unRegisterAppWithFCM status',
    messaging().isDeviceRegisteredForRemoteMessages,
  );

  if (messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .unregisterDeviceForRemoteMessages()
      .then(status => {
        console.log('unregisterDeviceForRemoteMessages status', status);
      })
      .catch(error => {
        console.log('unregisterDeviceForRemoteMessages error ', error);
      });
  }
  await messaging().deleteToken();
  console.log(
    'unRegisterAppWithFCM status',
    messaging().isDeviceRegisteredForRemoteMessages,
  );
}

export const checkApplicationNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization status:', authStatus);
  }
  request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
    .then(result => {
      // console.log('POST_NOTIFICATIONS status:', result);
    })
    .catch(error => {
      console.log('POST_NOTIFICATIONS error ', error);
    });
};

//method was called to listener events from firebase for notification trigger
export function registerListenerWithFCM() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('onMessage Received : ', JSON.stringify(remoteMessage), remoteMessage?.data,);
    if (
      remoteMessage?.notification?.title &&
      remoteMessage?.notification?.body
    ) {
      onDisplayNotification(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
        remoteMessage?.data,
      );
    }
  });

  notifee.onForegroundEvent(({ type, detail }) => {
    console.log('type, detail', type, detail);
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        console.log('User pressed notification', detail.notification);
        if (detail?.notification?.data?.id) {
          console.log('NAVIGATE', detail?.notification?.data?.id);
          navigate('CartRoutes');
        }
        // if (detail?.notification?.data?.clickAction) {
        //   onNotificationClickActionHandling(
        //     detail.notification.data.clickAction
        //   );
        // }
        break;
    }
  });

  notifee.onBackgroundEvent(({ type, detail }) => {
    console.log('type, detail', type, detail);
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed BG notification', detail.notification);
        break;
      case EventType.PRESS:
        console.log('User pressed BG notification', detail.notification);
        if (detail?.notification?.data?.id) {
          console.log('NAVIGATE', detail?.notification?.data?.id);
          navigate('CartRoutes');
        }
        // if (detail?.notification?.data?.clickAction) {
        //   onNotificationClickActionHandling(
        //     detail.notification.data.clickAction
        //   );
        // }
        break;
    }
  });

  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'onNotificationOpenedApp Received',
      JSON.stringify(remoteMessage),
    );
    if (detail?.notification?.data?.id) {
      console.log('NAVIGATE Quite State', detail?.notification?.data?.id);
      navigate('CartRoutes');
    }
    // if (remoteMessage?.data?.clickAction) {
    //   onNotificationClickActionHandling(remoteMessage.data.clickAction);
    // }
  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  return unsubscribe;
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

//method was called to display notification
async function onDisplayNotification(title, body, data) {
  console.log('onDisplayNotification: ', title, body, data);

  // Request permissions (required for iOS)
  await notifee.requestPermission();
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title,
    // subtitle: '&#129395;',
    body,
    data,
    android: {
      channelId,
      color: '#0D263E',
      badgeIconType: AndroidBadgeIconType.SMALL,
      importance: AndroidImportance.HIGH,
      //   largeIcon: largeIcon,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
      // actions: [
      //   {
      //     title: '<p ></p><b>Cancel</b>',
      //     pressAction: {id: 'dance'},
      //   },
      //   {
      //     title: '<p style="color: #0D263E"><b>Open</b></p>',
      //     pressAction: {id: 'cry'},
      //   },
      // ],
    },
  });
}
