import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {resetNavigation} from '../navigation/RootNavigation';

export const auth = {
  setToken(token, remember) {
    AsyncStorage.setItem('user_token', token);

  },
  getToken() {
    let token = '';
    if (AsyncStorage.getItem('user_token')) {
      token = AsyncStorage.getItem('user_token');
    } else if (AsyncStorage.getItem('user_token')) {
      token = AsyncStorage.getItem('user_token');
    }
    if (token) {
      return token;
    } else {
      // this.logout();
      return null;
    }
  },
  logout() {
    AsyncStorage.removeItem('user_token');
    AsyncStorage.removeItem('remember_Me');
    resetNavigation('Login');

  },

  // isLogin() {
  //   const token = this.getToken()
  //   if (token !== null) {
  //     // @ts-ignore
  //     const { exp } = jwtDecode(token)
  //     if (Date.now() >= exp * 1000) {
  //       this.logout()
  //       return false
  //     }
  //     return true
  //   }
  //   return false
  // }
};
// export const getUserData = async props => {
//   const navigation = useNavigation()
//   // const token = this.getToken()
//   // if (token) {
//   //   try {
//   //     return jwtDecode(token ? token : "")
//   //   } catch {
//   //     return {}
//   //   }
//   // }
//   // return {}
//   try {
//     const value = await AsyncStorage.getItem("user_token")
//     const remme = await AsyncStorage.getItem("altum_remember_Me")
//     console.log("calue", value)
//     console.log("calue2", remme)
//     if (value !== null) {
//       if (remme) {
//         console.log("1")
//         props.navigation.replace("Home")
//       } else {
//         console.log("2")

//         props.navigation.replace("Login")
//       }
//     } else {
//       console.log("3")

//       props.navigation.replace("Onboarding")
//     }
//   } catch (e) {
//     console.log("here", e)
//   }
// }
