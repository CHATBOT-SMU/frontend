import { StyleSheet, Text, View, Pressable, Animated } from "react-native";
import { useRef, useEffect } from "react";

const BodyOptions = (props) => {
  const ScaleAnimVar1 = useRef(new Animated.Value(0)).current;
  const ScaleAnimVar2 = useRef(new Animated.Value(0)).current;
  const ScaleAnimVar3 = useRef(new Animated.Value(0)).current;

  const ScaleAnimation = (delay, ScaleAnimVar) => {
    Animated.sequence([
      Animated.timing(ScaleAnimVar, {
        toValue: 1,
        duration: 200,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.timing(ScaleAnimVar, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    ScaleAnimation(0, ScaleAnimVar1);
    ScaleAnimation(100, ScaleAnimVar2);
    ScaleAnimation(200, ScaleAnimVar3);
  }, [ScaleAnimVar1, ScaleAnimVar2, ScaleAnimVar3]);

  return (
    <View>
      <Text
        style={{
          //center text in the middle of the screen
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
          color: "#fff",
          marginBottom: 30,
        }}
      >
        Choose an option:
      </Text>
      <Animated.View style={{ transform: [{ scale: ScaleAnimVar1 }] }}>
        <Pressable
          onPress={() => {
            props.setOption("building");
          }}
        >
          <Text style={styles.optionBox}>Building</Text>
        </Pressable>
      </Animated.View>
      <Animated.View style={{ transform: [{ scale: ScaleAnimVar2 }] }}>
        <Pressable
          onPress={() => {
            props.setOption("academia");
          }}
        >
          <Text style={styles.optionBox}>Academia</Text>
        </Pressable>
      </Animated.View>
      <Animated.View style={{ transform: [{ scale: ScaleAnimVar3 }] }}>
        <Pressable
          onPress={() => {
            props.setOption("finance");
          }}
        >
          <Text style={styles.optionBox}>Finance</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};
export default BodyOptions;
const styles = StyleSheet.create({
  optionBox: {
    fontSize: 18,
    color: "white",
    paddingTop: 15,
    paddingBottom: 15,
    overflow: "hidden",
    backgroundColor: "#057999",
    textAlign: "center",
    borderRadius: 30,
    marginBottom: 20,
    textTransform: "uppercase",
  },
});
