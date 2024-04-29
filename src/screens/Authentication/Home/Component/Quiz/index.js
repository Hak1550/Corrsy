import { View } from 'react-native'
import React from 'react'
import styles from './styles'
import CustomText from '../../../../../components/Text'

const Quiz = () => {
    return (
        <View style={styles.container}>
            <CustomText text={'Quiz'} />
        </View>
    )
}

export default Quiz