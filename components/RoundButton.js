import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';


function RoundButton(props) {
    
  return ( 
    <View
      style={{
        alignItems: "center",
      }}
    >
        <TouchableOpacity style={[ styles.button, {width: props.width || '25%',
        height: props.height || "49%"}]}
        onPress={props.onPress}
        >
    <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
        </View>
  );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 500,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#7d4497',
        borderColor: "#003e7f",
        borderWidth: 3,
      },
      text: {
        color: 'white',
        fontWeight: '700',
        fontSize: 17,
      },
});

export default RoundButton;
