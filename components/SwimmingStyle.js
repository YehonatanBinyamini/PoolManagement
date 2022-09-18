import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
// import RNPickerDialog from './picker/new';
import RNPickerDialog from "rn-modal-picker";
import { useSelector } from "react-redux";
import { selectTranslations } from "../redux/i18n";

function SwimmingStyle(props) {
  const strings = useSelector(selectTranslations);

  const data = [
    {
      id: 1,
      name: strings.frontCrawl,
    },
    {
      id: 2,
      name: strings.breaststroke,
    },
    {
      id: 3,
      name: strings.butterflyStroke,
    },
    {
      id: 4,
      name: strings.backstroke,
    },
  ];
  const [placeHolderText, setPlaceHolderText] = useState(strings.choose);
  const [selectedTextEnd, setSelectedTextEnd] = useState("");
  const [defaultValue, setDefaultValue] = useState(true);

  
  function selectedValue(index, item) {
    //setSelectedText(item.name);
    props.selectedStyle(item.name, props.priority);
  }


  return (
    <View style={Styles.container}>
      <RNPickerDialog
        data={data}
        showPickerTitle={true}
        listTextStyle={Styles.listTextStyle}
        pickerStyle={Styles.pickerStyle}
        selectedText={props.selectedText}
        placeHolderText={placeHolderText}
        selectedTextStyle={Styles.selectedTextStyle}
        placeHolderTextColor={"gray"}
        dropDownIconStyle={Styles.dropDownIconStyle}
        searchBarStyle={Styles.searchBarStyle}
        selectedValue={(index, item) => selectedValue(index, item)}
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
    left: 55,
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

export default SwimmingStyle;
