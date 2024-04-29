import { StyleSheet, } from "react-native"
import { STYLES } from "../../../../constants/theme"
import { Colors } from "../../../../constants/Colors"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteThemeColor,
        padding: 10,
        alignItems:'center'
    },
    eachCourse: [{ marginHorizontal: 5, marginVertical: 10, backgroundColor: Colors.grayColor, padding: 10, borderRadius: 10, flexDirection: 'row', width: '99%' }],
    eachCourseImg: { height: 20, width: 20, marginRight: 5 },

})
export default styles
