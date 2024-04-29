import { StyleSheet, } from "react-native"
import { STYLES } from "../../../../constants/theme"
import { Colors } from "../../../../constants/Colors"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteThemeColor,
        padding: 10,
    },
    eachCourse: [{ marginHorizontal: 5, marginVertical: 10, backgroundColor: Colors.grayColor, padding: 10, borderRadius: 10, flexDirection: 'row', width: '99%' }],
    eachCourseImg: { height: 20, width: 20, marginRight: 5 },
    eachSubject: [STYLES.VerticalAlign, { marginHorizontal: 5, marginVertical: 10, padding: 10, borderRadius: 10, width: '100%' }],
    eachSubjectImg: { height: 40, width: 40, marginBottom: 5 },
    lessonViews: { width: '100%', height: '70%', backgroundColor: Colors.grayColor, borderRadius: 20, position: 'absolute', bottom: -15 }

})
export default styles
