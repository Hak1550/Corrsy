import { StyleSheet, } from "react-native"
import { Colors } from "../../../constants/Colors"
import { STYLES } from "../../../constants/theme"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteThemeColor
    },
    eachCourse: isSelected => ([STYLES.HorizontalAlign, {
        marginHorizontal: 5, marginVertical: 10, backgroundColor: Colors.grayColor, padding: 10, 
        borderRadius: 10, 
        borderWidth: isSelected ? 1 : 0,

    }]),
    eachCourseImg: { height: 25, width: 25, marginRight: 5 },
    eachSubject: [STYLES.VerticalAlign, { marginHorizontal: 5, marginVertical: 10, padding: 10, borderRadius: 10, width: '100%' }],
    eachSubjectImg: { height: 40, width: 40, marginBottom: 5 },
    lessonViews: { width: '100%', height: '70%', backgroundColor: Colors.grayColor, borderRadius: 20, position: 'absolute', bottom: -15 }

})
export default styles
