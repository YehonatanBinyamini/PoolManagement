import React from "react";
import { StyleSheet, Button, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons'
function LogoffButton(props) {
  return (
    <Pressable style={({pressed}) => pressed && styles.pressed} onPress={props.onPress}>
      <Ionicons name="ios-log-out-outline" color={"white"} size={24}/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});

export default LogoffButton;
