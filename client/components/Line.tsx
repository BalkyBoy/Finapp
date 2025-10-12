import { View, Text } from 'react-native'
import React from 'react'

const Line = ({
    color = '#E0E0E0',
    thickness = 1,
    length ='100%',
    direction = 'horizontal',
    style={}
}) => {
    const lineStyle = direction === 'horizontal'
    ?{
        borderBottomColor: color,
        borderBottomWidth: thickness,
        width: length,
    }
    :{
        borderLeftColor: color,
        borderLeftWidth: thickness,
        height: length,
    }
  return (
    <View style={[lineStyle, style]}/>
  )
}

export default Line