import { View, Text, ViewStyle } from 'react-native'
import React from 'react'

export default function ProgressBar({step, total}: {step: number; total: number}){
    const width = `${(step / total)* 100}%` as ViewStyle['width'];

    return (
        <View style={{height:4, backgroundColor:'#EDEDED', overflow:'hidden', marginTop:4, marginHorizontal:6,borderRadius:8,}}>
            <View style={{height:'100%', backgroundColor:'#CAA362',width}}/>
        </View>
    )
}
