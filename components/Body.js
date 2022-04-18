import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useRef } from "react";

import BodyOptions from "./BodyOptions";

const Body = (props) => {
  const scrollViewRef = useRef();
  return (
    <View
      style={[
        styles.main,
        props.keyboardOffset !== 0 && { bottom: props.keyboardOffset - 20 },
      ]}
    >
      <ScrollView
        contentContainerStyle={
          props.option == null && {
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }
        }
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        {props.option == null ? (
          <BodyOptions setOption={props.setOption} />
        ) : (
          props.messages.map((message) => {
            return (
              <View key={Math.random(100)}>
                <View
                  ew
                  key={Math.random(100)}
                  style={[
                    { flex: 1 },
                    message.user && { alignItems: "flex-end" },
                  ]}
                >
                  <Text
                    style={[
                      styles.mainText,
                      !message.user
                        ? { backgroundColor: "#ECEDEF" }
                        : { backgroundColor: "#057999", color: "#ffff" },
                    ]}
                  >
                    {message.text}
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: "#BCC5D3", marginBottom: 30 }}
                  >
                    {message.date}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};
export default Body;
const styles = StyleSheet.create({
  main: {
    height: "75%",
    marginLeft: 20,
    marginRight: 20,
  },
  mainText: {
    fontSize: 16,
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: "80%",
    overflow: "hidden",
  },
});
