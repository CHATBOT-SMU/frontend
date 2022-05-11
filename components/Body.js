import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { useRef } from "react";

import BodyOptions from "./BodyOptions";
import MessageLoader from "./MessageLoader";

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
        scrollEnabled={props.option == null ? false : true}
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
          <View>
            {props.messages.map((message) => {
              return (
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
                        ? {
                            backgroundColor: "#ECEDEF",
                            alignSelf: "flex-start",
                          }
                        : {
                            backgroundColor: "#057999",
                            color: "#ffff",
                            alignSelf: "flex-end",
                          },
                    ]}
                  >
                    {message.text}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#BCC5D3",
                      marginBottom: 15,
                    }}
                  >
                    {message.date}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
      {props.loadingMsg && props.option !== null && (
        <View style={{ position: "relative", bottom: 30, left: 0 }}>
          <MessageLoader />
        </View>
      )}
    </View>
  );
};
export default Body;
const styles = StyleSheet.create({
  main: {
    height: "75%",
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "space-between",
  },
  mainText: {
    fontSize: 16,
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    overflow: "hidden",
  },
});
