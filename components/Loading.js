import { View, Text,StyleSheet,Image } from 'react-native'
import { Spring, animated } from 'react-spring'
import {useState} from 'react'
const AnimatedView = animated(View)

export default function Loading() {
  
  // const [flip, set] = useState(false)

  return (
    <View style={{height:'100%',width:'100%'}}>
        <Spring 
    // reset = {true}
    // reverse = {flip}
    // onRest ={() => set(!flip)}
    from = {{opacity: 0,width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}} 
    to = {{opacity: 1,width:'100%',height:'100%',justifyContent:'center',alignItems:'center' }}
    delay = "200"
    config = {{duration: 2500}}
    
    
    >
      {style =>(
        <AnimatedView style={style}>
          
        <Text style={styles.loadingText}>SMU CHATBOT</Text>
        
        <Image 
        source={require('../smu_logo.png')}  
        style={{width:100,height:40,marginBottom:20,position: 'absolute',bottom:20}} 
      />
        </AnimatedView>
      )}
    </Spring>
    </View>
  )
}


const styles = StyleSheet.create({
    loadingText: {
        color: '#4C5264',
        fontSize: 35,
        fontWeight: 'bold'
      }

})