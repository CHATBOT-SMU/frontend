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
          style={{ position: "absolute", left: 20 }}
          onPress={() => {
            props.setOption(null), Keyboard.dismiss();
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={24} />
        </TouchableOpacity>
      )}
      <Image
        source={require("../medtech_logo-f_edited.jpg")}
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
    color: "#4C5264",
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    height: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: 1,
  },
});
