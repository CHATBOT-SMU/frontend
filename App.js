import { StyleSheet, Text, View, Image,TextInput, TouchableOpacity,ScrollView,Keyboard,Pressable } from 'react-native';
import { useState,useRef, useEffect} from 'react';


import { Spring, animated } from 'react-spring'
import Loading from './components/Loading';
import Header from './components/Header';


import axios from 'axios';
import Body from './components/Body';
import Footer from './components/Footer';

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

  const [messages,setMessages] = useState(messageArray)
  const [focusMessage,setFocusMessage] = useState(false)
  
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [option, setOption] = useState(null)
  const [loading,setLoading] = useState(true)

  const onKeyboardShow = event => setKeyboardOffset(event.endCoordinates.height);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef();
  const keyboardDidHideListener = useRef();
  


  
  
  const MessageHandler = async (message) => {
    setMessages((prev)=>[
      ...prev,
      {
        user: true,
        text: message,
        date: returnCurrentDate()
      }
    ])
    const url = `http://127.0.0.1:5000/api/${option}`
    await axios.post(url,{"choice": message})
          .then(response => {
              console.log(response.data)
              setMessages((prev)=>[
                ...prev,
                {
                  user: false,
                  text: response.data.answer !== null ? response.data.answer : "Sorry I don't have an answer for that",
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

  useEffect(() => {
    setTimeout(()=>setLoading(false),3000)
  }, [])
  
 
  
  return (
    loading ? 
    <Loading/>
    :
    <View style={[styles.container, focusMessage && {paddingBottom:0}]}>
      
      <Header option = {option} setOption = {setOption} />

      <Body option = {option} setOption={setOption} keyboardOffset = {keyboardOffset} messages = {messages}  />
      
      <Footer option = {option}  keyboardOffset = {keyboardOffset} MessageHandler = {MessageHandler} setFocusMessage = {setFocusMessage} />
      

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    height: '100%',
    paddingBottom: 20
  },
  header : {
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff',
    zIndex: 1
    
  },
  main : {
    height:'70%',
    marginLeft: 20,
    marginRight: 20,
    
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
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    

  },
  input : {
    fontSize: 18,
  },
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
  loadingText: {
    color: '#4C5264',
    fontSize: 35,
    fontWeight: 'bold'
  }
});

