import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Header = (props) => {
  return (
    <View style={styles.header}>
      {props.option !== null && (
        <TouchableOpacity
          style={{ position: "absolute", left: 20, width: 50 }}
          onPress={() => {
            props.setOption(null), Keyboard.dismiss();
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={24} color="#ECEDEF" />
        </TouchableOpacity>
      )}
      <Image
        source={require("../MedtechLogo.png")}
        style={{ width: 50, height: 50 }}
      />
      <Text style={styles.headerText}>SMU CHATBOT</Text>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  headerText: {
    marginLeft: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    height: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2b2b2b",
    zIndex: 1,
  },
});
