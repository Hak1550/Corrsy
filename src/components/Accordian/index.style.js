import { StyleSheet } from "react-native";
import { SIZES } from "../../constants";

export const styles = StyleSheet.create({
    text: {
        paddingLeft: SIZES.base, paddingVertical: SIZES.base / 1.5
    },
    emptyView: {
        width: "12%", height: 1
    },
    view: { flexDirection: 'row', alignItems: 'center', }
})