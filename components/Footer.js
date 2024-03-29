import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons/faCircleArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Footer = (props) => {
  const [focus, setFocus] = useState(false);
  const [textDesc, onChangeTextDesc] = useState("");

  return (
    <View
      style={[
        styles.footer,
        props.keyboardOffset !== 0 && { bottom: props.keyboardOffset },
        focus && { alignItems: "center" },
        props.option === null && { display: "none" },
      ]}
    >
      <TextInput
        multiline={true}
        onFocus={() => {
          setFocus(true);
          props.setFocusMessage(true);
        }}
        onBlur={() => {
          setFocus(false);
          props.setFocusMessage(false);
        }}
        style={[
          { fontSize: 18, width: 250, color: "#ECEDEF" },
          focus && {
            width: "75%",
            borderRadius: 20,
            backgroundColor: "#666665",
            height: "70%",
            paddingHorizontal: 10,
          },
        ]}
        onChangeText={onChangeTextDesc}
        value={textDesc}
        placeholder="Ask a question"
        placeholderTextColor="#BCC5D3"
        // onContentSizeChange={(e) => UpdateSize(e.nativeEvent.contentSize.height)}
      />

      <TouchableOpacity
        display={true}
        style={{
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
        }}
        onPress={() => {
          if (textDesc) {
            props.MessageHandler(textDesc);
            onChangeTextDesc("");
          }
        }}
      >
        <FontAwesomeIcon
          icon={faCircleArrowRight}
          size={30}
          color={focus ? "#ECEDEF" : "#ECEDEF"}
        />
      </TouchableOpacity>
    </View>
  );
};
export default Footer;
const styles = StyleSheet.create({
  footer: {
    height: "5%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
});
