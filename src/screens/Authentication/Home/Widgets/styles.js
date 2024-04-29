import { StyleSheet, } from "react-native"
import { Colors } from "../../../../constants/Colors"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteThemeColor,
        padding: 10,

    },
    vidView: video => ({
        borderRadius: !video?.title ? 10 : 0,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: Colors.black,
        width: '92%',
        height: 230,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    }),
    vidStyle: {
        width: '100%',
        height: 150,
        borderRadius: 20,
        // elevation: 5,
    },

})
export default styles
