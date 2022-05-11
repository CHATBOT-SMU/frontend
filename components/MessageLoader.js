import { StyleSheet, Text, View, Animated } from "react-native";
import { useEffect, useRef } from "react";

const MessageLoader = () => {
  const DotVar1 = useRef(new Animated.Value(1)).current;
  const DotVar2 = useRef(new Animated.Value(1)).current;
  const DotVar3 = useRef(new Animated.Value(1)).current;
  const FadeInVar = useRef(new Animated.Value(0)).current;

  function animation(Var, delay) {
    Animated.loop(
      Animated.sequence([
        Animated.timing(Var, {
          toValue: 1.5,
          duration: 400,
          delay: delay,
          useNativeDriver: true,
        }),
        Animated.timing(Var, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }

  function FadeInAnim() {
    Animated.timing(FadeInVar, {
      toValue: 1,
      duration: 200,
      delay: 0,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    animation(DotVar1, 0);
    animation(DotVar2, 700);
    animation(DotVar3, 1400);
    FadeInAnim();
  }, []);

  return (
    <Animated.View style={[styles.loadingContainer, { opacity: FadeInVar }]}>
      <Animated.Text style={[styles.text, { transform: [{ scale: DotVar1 }] }]}>
        •
      </Animated.Text>
      <Animated.Text style={[styles.text, { transform: [{ scale: DotVar2 }] }]}>
        •
      </Animated.Text>
      <Animated.Text style={[styles.text, { transform: [{ scale: DotVar3 }] }]}>
        •
      </Animated.Text>
    </Animated.View>
  );
};
export default MessageLoader;
const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: "#ECEDEF",
    flexDirection: "row",
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    fontSize: 30,
    color: "#525252",
  },
});
