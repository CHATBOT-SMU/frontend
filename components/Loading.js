import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { Spring, animated } from "react-spring";
import { useState, useRef, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Loading() {
  // const FadeInVar = useRef([].fill(new Animated.Value(0))).current;
  // const SlideTopVar = useRef([].fill(new Animated.Value(-2))).current;

  const FadeInVarArray = new Array(10).fill(new Animated.Value(0));
  const SlideTopVarArray = new Array(10).fill(new Animated.Value(-2));

  const FadeInVar1 = useRef(new Animated.Value(0)).current;
  const SlideTopVar1 = useRef(new Animated.Value(20)).current;
  const FadeInVar2 = useRef(new Animated.Value(0)).current;
  const SlideTopVar2 = useRef(new Animated.Value(20)).current;
  const FadeInVar3 = useRef(new Animated.Value(0)).current;
  const SlideTopVar3 = useRef(new Animated.Value(20)).current;

  const FadeInVar4 = useRef(new Animated.Value(0)).current;

  // const [FadeInVar, setFadeInVar] = useState(FadeInVarArray);
  // const [SlideTopVar, setSlideTopVar] = useState(SlideTopVarArray);

  const loadingText = "SMU CHATBOT".split("");
  const [current, setCurrent] = useState(0);

  const loadLetterAnim = (delay, FadeInVar, SlideTopVar) => {
    Animated.timing(FadeInVar, {
      toValue: 1,
      duration: 100,
      delay: delay,
      useNativeDriver: true,
    }).start();
    Animated.timing(SlideTopVar, {
      toValue: 0,
      duration: 200,
      delay: delay,
      useNativeDriver: true,
    }).start();
  };

  const loadWordAnim = (delay) => {
    Animated.timing(FadeInVar4, {
      toValue: 1,
      duration: 1000,
      delay: delay,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    loadLetterAnim(0, FadeInVar1, SlideTopVar1);
    loadLetterAnim(100, FadeInVar2, SlideTopVar2);
    loadLetterAnim(200, FadeInVar3, SlideTopVar3);
    loadWordAnim(400);
  }, [
    FadeInVar1,
    SlideTopVar1,
    FadeInVar2,
    SlideTopVar2,
    FadeInVar3,
    SlideTopVar3,
  ]);

  // useEffect(() => {
  //   itemsRef.current = itemsRef.current.slice(0, loadingText.length);
  // }, [loadingText]);

  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "#057999" }}>
      {/* <LinearGradient
        colors={["#057999"]}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      > */}
      <Animated.View style={[styles.landingContainer]}>
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Animated.Text
              style={[
                styles.loadingText,
                {
                  transform: [{ translateY: SlideTopVar1 }],
                  opacity: FadeInVar1,
                },
              ]}
            >
              S
            </Animated.Text>
            <Animated.Text
              style={[
                styles.loadingText,
                {
                  transform: [{ translateY: SlideTopVar2 }],
                  opacity: FadeInVar2,
                },
              ]}
            >
              M
            </Animated.Text>
            <Animated.Text
              style={[
                styles.loadingText,
                {
                  transform: [{ translateY: SlideTopVar3 }],
                  opacity: FadeInVar3,
                },
              ]}
            >
              U
            </Animated.Text>
          </View>

          <Animated.Text
            style={[
              {
                color: "#4C5264",
                fontSize: 35,
                fontWeight: "bold",
                color: "white",
              },
              {
                opacity: FadeInVar4,
              },
            ]}
          >
            CHATBOT
          </Animated.Text>
        </View>

        <Image
          source={require("../smu_logo.png")}
          style={{
            width: 100,
            height: 40,
            marginBottom: 20,
            position: "absolute",
            bottom: 20,
          }}
        />
      </Animated.View>
      {/* </LinearGradient> */}
    </View>
  );
}

const styles = StyleSheet.create({
  landingContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#4C5264",
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    fontStyle: "italic",
  },
  linearGradient: {
    width: "100%",
    height: "100%",
  },
});
