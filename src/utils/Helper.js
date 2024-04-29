import Toast, { BaseToast } from 'react-native-toast-message';
import { FONTS, images } from '../constants';
import { Alert, Linking, PermissionsAndroid, Vibration } from 'react-native';
// import dynamicLinks from '@react-native-firebase/dynamic-links';



export const vibrationOnToast = () => {
  Vibration.vibrate(200);
};
export const showToast = ({
  message,
  type,
  title,
  duration = 3000,
  onPress = () => Toast.hide(),
  autoHide = true,
}) => {
  vibrationOnToast();
  return Toast.show({
    text1: message,
    text2: title,
    type: type,
    position: 'top',
    onPress: () => {
      onPress();
      Toast.hide();
    },
    visibilityTime: duration,
    autoHide: autoHide,
  });
};
export const getTabIndex = (arr, name) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title == name) {
      return i;
    }
  }
};
export const getTabIndex2 = (arr, sku) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]?.key === +sku) {
      return i;
    }
  }
};
export const formatCurrency = number => {
  return number?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
export const checkURL = url => {
  let urlRegix =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  return urlRegix?.test(url);
};
export const checkCNIC = cnic => {
  let cnicRegix = /^([0-9]{5}-[0-9]{7}-[0-9]{1})$/;
  return cnicRegix?.test(cnic);
};

export const toastConfig = {
  success: ({ title = 'Success', text2, text1, ...rest }) => (
    <BaseToast
      {...rest}
      style={{
        borderLeftColor: '#4BB543',
        backgroundColor: '#fff',
        borderLeftWidth: 10,
        marginTop: -35,
        elevation: 5,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      onTrailingIconPress={() => Toast.hide()}
      text1={text2 ?? title}
      text1Style={[FONTS.Bold16, { color: '#000' }]}
      text2Style={[FONTS.Bold16, { fontSize: 12 }]}
      text2={text1}
    />
  ),
  error: ({ title = 'Alert', text2, text1, ...rest }) => (
    <BaseToast
      {...rest}
      style={{
        borderLeftColor: '#DD4124',
        backgroundColor: '#fff',
        borderLeftWidth: 10,
        marginTop: -35,
        elevation: 5,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      onTrailingIconPress={() => Toast.hide()}
      text1={text2 ?? title}
      text1Style={[FONTS.Bold16, { color: '#000' }]}
      text2Style={[FONTS.Bold16, { fontSize: 12 }]}
      text2={text1}
    />
  ),
};
export const requestLocationPermission = async t => {
  try {
    let permission = false;
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      permission = true;
    } else {
      permission = false;

      Alert.alert(
        t('Location_Permission'),
        t(
          'Corrsy_App_requires_the_location_permission_to_provide_you_delivery_on_your_location',
        ),
        [
          { text: t('Cancel'), style: 'cancel' },
          {
            text: t('Go_to_Settings'),
            onPress: () => Linking.openSettings(),
            style: 'default',
          },
        ],
      );
    }
    return permission;
  } catch (err) {
    console.warn(err);
  }
};
export const requestCameraPermission = async t => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: t('Camera_Permission'),
        message: t('Corrsy_App_needs_access_to_your_camera'),
        buttonNeutral: t('Ask_Me_Later'),
        buttonNegative: t('Cancel'),
        buttonPositive: t('OK'),
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission given');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
// export const generateLink = async item => {
//   try {
//     const link = await dynamicLinks().buildShortLink(
//       {
//         link: `https://corrsy.page.link/muUh?parent_product_id=${item?.parent_grouped_product_id}&product_id=${item?.id}`,
//         domainUriPrefix: 'https://corrsy.page.link',
//         android: {
//           packageName: 'com.corrsy',
//         },
//       },
//       dynamicLinks.ShortLinkType.DEFAULT,
//     );
//     // console.log('link:', link);
//     return link;
//   } catch (error) {
//     console.log('Generating Link Error:', error);
//   }
// };



