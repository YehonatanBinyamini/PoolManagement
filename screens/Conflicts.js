import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import MyButton from "../components/MyButton";
import ConflictComponent from "../components/Conflict";
import { useSelector } from "react-redux";
import { selectTranslations } from "../redux/i18n";

const Conflicts = ({ route, navigation }) => {
  //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

  const [noData, setNoData] = useState(true);
  const CONFLICTS = useSelector((state) => state.conflicts.all);
  const strings = useSelector(selectTranslations);


  useEffect(() => {
    if (CONFLICTS.length > 0) {
      setNoData(false);
    }
    if (strings.conflicts == "Conflicts"){
      navigation.setOptions({ title: strings.conflicts, headerBackTitle: strings.homeTitle });    }
  }, []);

  function renderConflictItem(itemData) {
    return (
      <ConflictComponent
        title={itemData.item.student.fullName}
        body={itemData.item.conflict}
      />
    );
  }

  return (
    <View style={styles.container}>
      {noData && <Text style={styles.text}>{strings.noConflicts}</Text>}

      <FlatList
        data={CONFLICTS}
        renderItem={renderConflictItem}
        keyExtractor={(item) => item.body}
        contentContainerStyle={{
          paddingBottom: 60,
          padding: 20,
          alignItems: "center",
        }}
        extraData={CONFLICTS}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 30,
  },
  ModalContainer: {
    flex: 1,

    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffd0",
    padding: 80,
  },
  inputContainer: {
    width: "100%",
    //backgroundColor: "white",
    //height: "40%"
  },
  input: {
    textAlign: "right",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  inputBody: {
    textAlign: "right",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    height: "60%",
    textAlignVertical: "top",
  },
  ModalTitle: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 30,
  },
  modalButtons: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Conflicts;
