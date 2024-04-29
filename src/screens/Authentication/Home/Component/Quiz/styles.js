import { StyleSheet, } from "react-native"
import { Colors } from "../../../../../constants/Colors"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteThemeColor,
        padding: 10,
        width: '100%'
    },
    eachOpt: each => ({
        padding: 15,
        marginVertical: 5,
        borderWidth: 0.5,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor:  each?.isCorrected && each?.isChecked ? Colors.greenColor :
            each?.isSelected && !each?.isCorrected && each?.isChecked ? Colors.red :
                each?.isSelected && !each?.isChecked ? Colors.lightBlue :
                    !each?.isSelected && !each?.isChecked ? Colors.lightGrayColor :
                        Colors.whiteThemeColor
    }),
    btnView: { position: 'absolute', width: '100%', bottom: 10, left: 10 }



})
export default styles
