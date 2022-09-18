import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MyButton from "../components/MyButton";
import Loading from "../components/Loading";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { setLang } from "../redux/i18n";
import { selectTranslations } from "../redux/i18n";
import RoundButton from "../components/RoundButton";

//import { auth } from "../db/firebase";
//import { signInWithEmailAndPassword } from "firebase/auth";

function Login({ navigation }) {
  function submitHandler() {
    //     signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     console.log("work!!!")
    //   })
    //   .catch((error) => {
    //     //const errorCode = error.code;
    //     setErrorMessage(error.message);
    //     console.log(errorMessage)
    //   });

    if (
      (email == "yotam@pool.il" || email == "Yotam@pool.il") &&
      password == "123456"
    ) {
      const user = "יותם";
      navigation.replace("TabsNav", { user: user });
    } else if (
      (email == "yoni@pool.il" || email == "Yoni@pool.il") &&
      password == "123456"
    ) {
      const user = "יוני";
      navigation.replace("TabsNav", { user: user });
    } else if (
      (email == "joni@pool.il" || email == "Joni@pool.il") &&
      password == "123456"
    ) {
      const user = "ג'וני";
      navigation.replace("TabsNav", { user: user });
    } else setErrorMessage("*****דואר אלקטרוני או סיסמה שגויים");
  }

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const strings = useSelector(selectTranslations);

  const lang = useSelector((state) => state.i18n.lang);
  const supportedLangs = useSelector((state) => state.i18n.supportedLangs);

  const dispatch = useDispatch();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <Loading />
        </View>
      ) : (
        <View style={styles.container2}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={strings.email}
              value={email}
              onChangeText={(text) => {
                setEmail(text.replace(" ", ""));
                setErrorMessage("");
              }}
              style={styles.input}
              keyboardType="email-address"
            />
            <TextInput
              placeholder={strings.password}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrorMessage("");
              }}
              style={styles.input}
              secureTextEntry
            />
            {errorMessage.length > 0 && (
              <Text style={styles.error}>{errorMessage.slice(5)}</Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                submitHandler();
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{strings.connect}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
            }}
          >
            <RoundButton
              width={100}
              height={"30%"}
              text="עברית"
              onPress={() => {
                dispatch(setLang("he"));
                navigation.setOptions({ title: "התחברות" });
              }}
            />
            <RoundButton
              width={100}
              height={"30%"}
              text="English"
              onPress={() => {
                dispatch(setLang("en"));
                navigation.setOptions({ title: "Login" });
              }}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 0,
    padding: 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    textAlign: "right",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: Colors.myBlue,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 19,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 19,
  },
  error: {
    color: "red",
    textAlign: "right",
  },
});
export default Login;
