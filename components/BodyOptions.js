import { StyleSheet, Text, View,Pressable } from 'react-native'
import { Spring, animated } from 'react-spring'
const AnimatedView = animated(View)


const BodyOptions = (props) => {
  return (
    <View >
            <Spring
                from = {{left:-200}} 
                to = {{left:0}}
                delay = "200"
                config = {{duration: 200}}
            >
                {
                    style => (
                    <AnimatedView style={style}>
                        <Pressable onPress={()=>{props.setOption("building")}}>
                        <Text style = {styles.optionBox}>Building</Text>
                        </Pressable>
                    </AnimatedView>
                    )
                }
            </Spring>
            
            <Spring
                from = {{right:-200}} 
                to = {{right:0}}
                delay = "200"
                config = {{duration: 200}}
            >
                {
                    style => (
                    <AnimatedView style={style}>
                        <Pressable onPress={()=>{props.setOption("academia")}}>
                        <Text style = {styles.optionBox}>Academia</Text>
                        </Pressable>
                    </AnimatedView>
                    )
                }
            </Spring>
            <Spring
                from = {{left:-200}} 
                to = {{left:0}}
                delay = "200"
                config = {{duration: 200}}
            >
                {
                    style => (
                    <AnimatedView style={style}>
                        <Pressable onPress={()=>{props.setOption("finance")}}>
                        <Text style = {styles.optionBox}>Finance</Text>
                        </Pressable>
                    </AnimatedView>
                    )
                }
            </Spring>

            
          </View>
  )
}
export default BodyOptions
const styles = StyleSheet.create({
    optionBox: {
        fontSize: 25,
        color: 'white',
        paddingTop: 15,
        paddingBottom: 15,
        overflow: 'hidden',
        backgroundColor:"#363639",
        textAlign: 'center',
        borderRadius: 10,
        marginBottom: 20
      },
})