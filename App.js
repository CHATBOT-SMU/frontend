import { StyleSheet, Text, View, Image,TextInput, TouchableOpacity,ScrollView,Keyboard,Pressable } from 'react-native';
import { useState,useRef, useEffect} from 'react';
import axios from 'axios';

const returnCurrentDate = ()=> {
  return new Date().toLocaleDateString('en-us', {month:"short", day:"numeric",hour: "2-digit",minute: '2-digit',hour12: false})
}

const messageArray = [
  {
    user: false,
    text: 'Hello, how may I help you?',
    date: returnCurrentDate()
  },
  
]

export default function App() {
  const scrollViewRef = useRef();
  const [messages,setMessages] = useState(messageArray)
  const [textDesc,onChangeTextDesc] = useState('')
  const [focus,setFocus] = useState(false)
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [option, setOption] = useState(null)
  const [choice,setChoice] = useState(null)

  const onKeyboardShow = event => setKeyboardOffset(event.endCoordinates.height);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef();
  const keyboardDidHideListener = useRef();

  
  
  const MessageHandler = async () => {
    
    setMessages((prev)=>[
      ...prev,
      {
        user: true,
        text: textDesc,
        date: returnCurrentDate()
      }
    ])
    const url = `http://192.168.1.6/api/${option}`
    await axios.post(url,{"choice": textDesc})
          .then(response => {
              console.log(response.data)
              setMessages((prev)=>[
                ...prev,
                {
                  user: false,
                  text: response.data.answer !== null ? response.data.answer : "Sorry I don't have answer for that",
                  date: returnCurrentDate()
                }
              ])}).catch((err)=>{
                console.log(err)
              })
  }


  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
    keyboardDidHideListener.current = Keyboard.addListener('keyboardWillHide', onKeyboardHide);
  
    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);
  
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
      <Image 
        source={require('./medtech_logo-f_edited.jpg')}  
        style={{width: 50, height: 50}} 
      />
        <Text style={styles.headerText}>SMU CHATBOT</Text>
      </View>

      <View style={[styles.main,keyboardOffset !==0 &&{bottom: keyboardOffset-20}]}>
      <ScrollView 
        
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {
        option == null ? (
          <View>
            <Pressable onPress={()=>{setOption("building")}}>
              <Text style = {styles.optionBox}>Building</Text>
            </Pressable>

            <Pressable onPress={()=>{setOption("academia")}}>
              <Text style = {styles.optionBox}>Academia</Text>
            </Pressable>

            <Pressable onPress={()=>{setOption("finance")}}>
              <Text style = {styles.optionBox}>Finance</Text>
            </Pressable>
          </View>
        )
        :
        messages.map((message)=>{
         
         return (<View key={Math.random(100)}>
           <View key={Math.random(100)} style={[{flex:1},message.user && {alignItems:'flex-end'}]}>
           <Text style={[styles.mainText,!message.user ? {backgroundColor: '#ECEDEF'} : {backgroundColor: '#363639',color: '#ffff'}]}>{message.text}</Text>
           <Text style={{fontSize:12, color:'#BCC5D3',marginBottom: 30}}>{message.date}</Text>
         </View>
         </View>)
        })}
        
      </ScrollView>
      </View>
      
      <View style={[styles.footer,keyboardOffset !==0 &&{bottom: keyboardOffset-20},focus && {borderColor:'#BCC5D3',borderBottomWidth: 1, backgroundColor: 'white'}, option === null && {display: 'none'}]}>
      <TextInput
        multiline = {true} 
        onFocus = {()=>setFocus(true)}
        onBlur = {()=>setFocus(false)}
        style={[{fontSize: 18, width: 250}]}
        onChangeText={onChangeTextDesc}
        value={textDesc}
        placeholder="Write your message..."
        placeholderTextColor='#BCC5D3'
      />

        <TouchableOpacity display = {false} onPress={()=>{
          if(textDesc)
          return MessageHandler()
        }}
      >
          <Image source={require('./icon.jpg')} style = {{width: 30, height: 30}} />
        </TouchableOpacity>
      </View>
      

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
  },
  header : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor:'#fff',
    zIndex: 1
    
  },
  main : {
    flex: 6,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 10,
    
  },
  headerText : {
    marginLeft: 10,
    color: '#4C5264',
    fontSize: 20,
    fontWeight: 'bold'
  },
  mainText: {
    fontSize: 16,
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: '80%',
    overflow: 'hidden'
    
  }, 
  footer : {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,

  },
  input : {
    fontSize: 18,
  },
  optionBox: {
    fontSize: 25,
    color: 'white',
    paddingTop: 15,
    paddingBottom: 15,
    
    backgroundColor:"#363639",
    textAlign: 'center',
    borderRadius: 10,
    marginBottom: 20
  }
});

