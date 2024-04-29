import { StyleSheet,  } from "react-native"
import { Colors } from "../../../constants/Colors"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { heightPercentageToDP as hp} from "react-native-responsive-screen"

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    backgroundColor: Colors.whiteThemeColor,
  },
  img: { height: '100%', width: '100%' }
})
export default styles
