import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

function BigBooleanButton(props) {
  let pressed = props.pressed;

  return (
    <TouchableOpacity
      style={pressed ? styles.buttonPressed : styles.buttonNotPressed}
      onPress={props.onSelect}
    >
      <Text
        style={pressed ? styles.buttonTextPressed : styles.buttonTextNotPressed}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonPressed: {
    backgroundColor: Colors.darkBlue,
    width: "20%",
    height: 35,
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginLeft: 3,
    marginRight: 3,
  },
  buttonNotPressed: {
    backgroundColor: Colors.white,
    width: "20%",
    height: 35,
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginLeft: 3,
    marginRight: 3,
  },
  buttonTextPressed: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
  buttonTextNotPressed: {
    color: Colors.darkBlue,
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
});

export default BigBooleanButton;
