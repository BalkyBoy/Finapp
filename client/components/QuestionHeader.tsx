import { View, Text } from "react-native";

export default function QuestionHeader({step, total, question, subtitle}:{step:number; total:number; question:string; subtitle:string}){
    return(
        <View style={{paddingHorizontal:24, marginTop:24}}>
             <Text style={{ textAlign: 'center', color: '#F97316', fontSize: 14 }}>
        {step} of {total}
      </Text>
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 8 }}>
        {question}
      </Text>
      <Text style={{ textAlign: 'center', color: '#6B7280', marginTop: 8 }}>
        {subtitle}
      </Text>
        </View>
    )
}