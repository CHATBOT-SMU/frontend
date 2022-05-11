import { StyleSheet, View, Keyboard, Image } from "react-native";
import { useState, useRef, useEffect } from "react";

import Loading from "./components/Loading";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

import axios from "axios";

const returnCurrentDate = () => {
  return new Date().toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

var messageArray = [
  {
    user: false,
    text: "Hello, how may I help you?",
    date: returnCurrentDate(),
  },
];

export default function App() {
  const [messages, setMessages] = useState(messageArray);
  const [focusMessage, setFocusMessage] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(false);

  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [option, setOption] = useState(null);
  const [loading, setLoading] = useState(true);

  const onKeyboardShow = (event) =>
    setKeyboardOffset(event.endCoordinates.height);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef();
  const keyboardDidHideListener = useRef();

  const MessageHandler = async (message) => {
    setMessages((prev) => [
      ...prev,
      {
        user: true,
        text: message,
        date: returnCurrentDate(),
      },
    ]);
    const url = `http://192.168.15.125:19006/api/${option}`;
    setLoadingMsg(true);
    setTimeout(
      await function () {
        axios
          .post(url, { choice: message })
          .then((response) => {
            console.log(response.data);
            setLoadingMsg(false);
            setMessages((prev) => [
              ...prev,
              {
                user: false,
                text:
                  response.data.answer !== null
                    ? response.data.answer
                    : `Sorry I don't have an answer for that, type "help".`,
                date: returnCurrentDate(),
              },
            ]);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      Math.floor(Math.random() * 1000)
    );
  };

  useEffect(() => {
    var text = "";
    if (option === "building") {
      text =
        "Welcome to the building section.\nType help to see what questions you can ask";
    } else if (option === "academia") {
      text =
        "Welcome to the academic section\nType help to see what questions you can ask";
    } else if (option === "finance") {
      text =
        "Welcome to the finance section\nType help to see what questions you can ask";
    }

    messageArray = [
      {
        user: false,
        text: text,
        date: returnCurrentDate(),
      },
    ];
    setMessages(messageArray);
  }, [option]);

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      "keyboardWillShow",
      onKeyboardShow
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardWillHide",
      onKeyboardHide
    );

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <View style={[styles.container, focusMessage && { paddingBottom: 0 }]}>
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -999,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("./Leaf.png")}
          style={{
            width: 800,
            height: 800,
            bottom: -127,
            left: -110,
          }}
        />
      </View>

      <Header option={option} setOption={setOption} />

      <Body
        option={option}
        setOption={setOption}
        keyboardOffset={keyboardOffset}
        messages={messages}
        loadingMsg={loadingMsg}
      />

      <Footer
        option={option}
        keyboardOffset={keyboardOffset}
        MessageHandler={MessageHandler}
        setFocusMessage={setFocusMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#2b2b2b",
    height: "100%",
    paddingBottom: 20,
  },
  loadingMessage: {
    marginBottom: 30,
  },
});
