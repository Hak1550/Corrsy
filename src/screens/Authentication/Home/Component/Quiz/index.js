import { TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import CustomText from '../../../../../components/Text'
import Icon from 'react-native-vector-icons/AntDesign';
import { FONTS, STYLES } from '../../../../../constants/theme';
import { Colors } from '../../../../../constants/Colors';
import CustomButton from '../../../../../components/Button';
import { showToast } from '../../../../../utils/Helper';

const Quiz = () => {
    const [timer, setTimer] = useState(59)
    const [id, setId] = useState(null)
    const [options, setOptions] = useState([
        {
            id: 4,
            opt: 'His',
            isSelected: false,
            isCorrected: false,
            isChecked: false,
        },
        {
            id: 1,
            opt: 'Her',
            isSelected: false,
            isCorrected: true,
            isChecked: false,

        },
        {
            id: 2,
            opt: 'Him',
            isSelected: false,
            isCorrected: false,
            isChecked: false,

        },
        {
            id: 3,
            opt: 'Its',
            isSelected: false,
            isCorrected: false,
            isChecked: false,
        },
    ])


    const selectOption = (id) => {
        let arr = [...options]
        arr.forEach(f => {
            if (f.id === id) {
                f.isSelected = true
            } else {
                f.isSelected = false
            }
        })
        setOptions(arr)
        setId(id)
    }
    const checkAnswer = () => {
        options.forEach(f => f.isChecked = true)
        setTimer(1)
        let isCorrect = options.filter(f => f.id === id)[0]?.isCorrected
        showToast({
            type: isCorrect ? 'success' : 'error',
            message: isCorrect ? 'Correct Answer' : 'Wrong Answer',
            title: isCorrect ? 'Correct' : 'Wrong',
        })

    }

    useEffect(() => {
        if (timer > 0) {
            setTimeout(() => {
                setTimer(prev => prev - 1)
            }, 1000)
        }
    }, [timer])
    return (
        <View style={styles.container}>
            <View style={STYLES.HorizontalAlign}>
                <Icon name={'clockcircleo'} style={{ color: Colors.red, fontSize: 15, marginRight: 10 }} />
                <CustomText text={`00 : ${timer < 10 ? '0' : ''}${timer} S`} style={[FONTS.Bold13, { color: Colors.red }]} />
            </View>
            <CustomText text={'Speed Question'} style={[FONTS.Bold16, { color: Colors.primary, marginTop: 20 }]} />
            <CustomText text={'What is the possessive pronoun for female?'} style={[FONTS.Bold16, { color: Colors.red, marginVertical: 20 }]} />
            <View>
                {options.map(each => (
                    <TouchableOpacity key={each?.id} style={styles.eachOpt(each)} onPress={() => selectOption(each?.id)} disabled={options.some(s => s.isChecked || !timer)}>
                        <CustomText text={each?.opt} />
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.btnView}>
                <CustomButton buttonText={'Check'} disabled={!id || !timer} onPress={checkAnswer} />
            </View>
        </View>
    )
}

export default Quiz