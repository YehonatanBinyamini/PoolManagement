import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
// import RNPickerDialog from './picker/new';
import RNPickerDialog from "rn-modal-picker";
import { useSelector } from "react-redux";
import { selectTranslations } from "../redux/i18n";

function Hours(props) {
  const [HebrewLanguage, setHebrewLanguage] = useState(props.isHebrew);
  const strings = useSelector(selectTranslations);

  const data = [
    {
      id: 1,
      name: "8:00",
    },
    {
      id: 2,
      name: "9:00",
    },
    {
      id: 3,
      name: "10:00",
    },
    {
      id: 4,
      name: "11:00",
    },
    {
      id: 5,
      name: "12:00",
    },
    {
      id: 6,
      name: "13:00",
    },
    {
      id: 7,
      name: "14:00",
    },
    {
      id: 8,
      name: "15:00",
    },
    {
      id: 9,
      name: "16:00",
    },
    {
      id: 10,
      name: "17:00",
    },
    {
      id: 11,
      name: "18:00",
    },
    {
      id: 12,
      name: "19:00",
    },
    {
      id: 13,
      name: "20:00",
    },
  ];
  const [placeHolderText, setPlaceHolderText] = useState(strings.choose);
  const [selectedTextStart, setSelectedTextStart] = useState("");
  const [selectedTextEnd, setSelectedTextEnd] = useState("");
  const [defaultValue, setDefaultValue] = useState(true);
  //select: "",
  //value: "",

  //};

  function selectedValueStart(index, item) {
    setSelectedTextStart(item.name);
    props.selectedStartValue(item.name, props.day, "start");
  }

  function selectedValueEnd(index, item) {
    setSelectedTextEnd(item.name);
    props.selectedEndValue(item.name, props.day, "end");
  }

  return (
    <View
      style={[
        Styles.container,
        { flexDirection: HebrewLanguage ? "row" : "row-reverse" },
      ]}
    >
      <RNPickerDialog
        data={data}
        //pickerTitle={"Sort by"}
        // labelText={'test'}
        //showSearchBar={true}
        showPickerTitle={true}
        listTextStyle={Styles.listTextStyle}
        pickerStyle={Styles.pickerStyle}
        selectedText={selectedTextEnd}
        placeHolderText={placeHolderText}
        //searchBarPlaceHolder={"Search....."}
        //searchBarPlaceHolderColor={"#9d9d9d"}
        //selectedTextStyle={Styles.selectedTextStyle}
        placeHolderTextColor={"gray"}
        dropDownIconStyle={Styles.dropDownIconStyle}
        //searchBarStyle={Styles.searchBarStyle}
        //dropDownIcon={require('../assets/pin.png')}
        selectedValue={(index, item) => selectedValueEnd(index, item)}
        changeAnimation={"fade"}
      />
      <Text>{strings.to}</Text>
      <RNPickerDialog
        data={data}
        //pickerTitle={"Sort by"}
        // labelText={'testss'}
        //showSearchBar={true}
        showPickerTitle={true}
        listTextStyle={Styles.listTextStyle}
        pickerStyle={Styles.pickerStyle}
        selectedText={selectedTextStart}
        placeHolderText={placeHolderText}
        //searchBarPlaceHolder={"Search....."}
        //searchBarPlaceHolderColor={"#9d9d9d"}
        selectedTextStyle={Styles.selectedTextStyle}
        placeHolderTextColor={"gray"}
        dropDownIconStyle={Styles.dropDownIconStyle}
        searchBarStyle={Styles.searchBarStyle}
        //dropDownIcon={require('../assets/pin.png')}
        selectedValue={(index, item) => selectedValueStart(index, item)}
        changeAnimation={"fade"}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    //flexDirection: HebrewLanguage ? "row" : "row-reverse",
  },
  selectedTextStyle: {
    height: 50,
    borderColor: "gray",
    backgroundColor: "transparent",
    justifyContent: "center",
    width: "100%",
    color: "black",
    fontSize: 20,
    paddingLeft: 10,
    marginTop: -2,
  },
  listTextStyle: {
    color: "#000",
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left",
  },
  searchBarStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowRadius: 1,
    shadowOpacity: 1.0,
    borderWidth: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderColor: "#303030",
    shadowColor: "#303030",
    borderRadius: 5,
    elevation: 1,
    marginHorizontal: 10,
  },
  placeHolderTextStyle: {
    color: "red",
    padding: 10,
    textAlign: "left",
    width: "99%",
    flexDirection: "row",
  },
  dropDownIconStyle: {
    width: 15,
    height: 15,
    left: -30,
    // marginTop: 20,
  },
  pickerStyle: {
    shadowRadius: 0.5,
    shadowOpacity: 0.5,
    borderWidth: 0.5,
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    height: 45,
    width: 110,
    borderColor: "#303030",
    shadowColor: "#303030",
    borderRadius: 2,
    elevation: 0.5,
  },
});

export default Hours;
