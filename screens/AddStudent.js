import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  ScrollView,
  Alert,
  LogBox,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addStudent, removeStudent } from "../redux/students";
import Student from "../models/Student";
import BooleanButton from "../components/BooleanButton";
import BigBooleanButton from "../components/BigBooleanButton";
import Colors from "../constants/Colors";
import MyButton from "../components/MyButton";
import Hours from "../components/Hours";
import SwimmingStyle from "../components/SwimmingStyle";
import { selectTranslations } from "../redux/i18n";
import AvailableHours from "../models/AvailableHours";
import Scheduling from "../components/Scheduling";

function AddStudent({ navigation }) {
  LogBox.ignoreAllLogs();

  const [fullName, setFullName] = useState("");
  const [totalLessons, setTotalLessons] = useState(new Number());
  const [maxLessonsPerAvailableDay, setMaxLessonsPerAvailableDay] =
    useState(new Number());
  const [sunday, setSunday] = useState(false);
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [frontCrawl, setFrontCrawl] = useState(true);
  const [breaststroke, setBreaststroke] = useState(false);
  const [butterflyStroke, setButterflyStroke] = useState(false);
  const [backstroke, setBackstroke] = useState(false);
  const [privateType, setPrivateType] = useState(true);
  const [groupType, setGroupType] = useState(false);
  const [privatePreference, setPrivatePreference] = useState(false);
  const [groupPreference, setGroupPreference] = useState(false);
  //const [students, setStudents] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  // const [priority1, setPriority1] = useState("");
  // const [priority2, setPriority2] = useState("");
  // const [priority3, setPriority3] = useState("");
  // const [priority4, setPriority4] = useState("");
  const [swimmingStyleArray, setSwimmingStyleArray] = useState(
    new Array("", "", "", "")
  );
  const [lessonType, setLessonType] = useState("private");
  const [errorMessage, setErrorMessage] = useState("");
  const [HebrewLanguage, setHebrewLanguage] = useState(true);
  const [hours, setHours] = useState(new AvailableHours());
  const [selectedStyle1, setSelectedStyle1] = useState("");
  const [selectedStyle2, setSelectedStyle2] = useState("");
  const [selectedStyle3, setSelectedStyle3] = useState("");
  const [selectedStyle4, setSelectedStyle4] = useState("");

  //const swimmingStyleArray = new Array("", "", "", "");
  const strings = useSelector(selectTranslations);
  useEffect(() => {
    navigation.setOptions({ title: strings.addStudent });
    if (strings.addStudent == "Add Student") {
      setHebrewLanguage(false);
    }
  }, []);

  const dispatch = useDispatch();

  function swimmingTypeHandler(swimmingType) {
    switch (swimmingType) {
      case "private":
        setPrivateType(true);
        setGroupType(false);
        setPrivatePreference(false);
        setGroupPreference(false);
        break;
      case "group":
        setPrivateType(false);
        setGroupType(true);
        setPrivatePreference(false);
        setGroupPreference(false);
        break;
      case "privatePreference":
        setPrivateType(false);
        setGroupType(false);
        setPrivatePreference(true);
        setGroupPreference(false);
        break;
      case "GroupPreference":
        setPrivateType(false);
        setGroupType(false);
        setPrivatePreference(false);
        setGroupPreference(true);
        break;
    }
  }

  function submitHandler() {
    if (sunday) {
      availableDays.push("ראשון");
    }
    if (monday) {
      availableDays.push("שני");
    }
    if (tuesday) {
      availableDays.push("שלישי");
    }
    if (wednesday) {
      availableDays.push("רביעי");
    }
    if (thursday) {
      availableDays.push("חמישי");
    }
    if (
      //totalLessons < maxLessonsPerAvailableDay //||
      maxLessonsPerAvailableDay <= 0
    ) {
      setErrorMessage(strings.lessonNumberError);
    } else if (availableDays.length == 0) {
      setErrorMessage(strings.daysPickError);
    } else if (fullName.length == 0) {
      setErrorMessage(strings.fullNameError);
    } else if (totalLessons <= 0) {
      setErrorMessage(strings.maxLessonsError);
    } else {
      dispatch(
        addStudent({
          obj: new Student(
            fullName,
            availableDays,
            hours,
            swimmingStyleArray,
            lessonType,
            totalLessons,
            maxLessonsPerAvailableDay
          ),
        })
      );
      Alert.alert(
        strings.theStudent + fullName + strings.wasAddedSuccessfully,
        null,
        [{ text: strings.close }]
      );
      setSelectedStyle1("");
      setSelectedStyle2("");
      setSelectedStyle3("");
      setSelectedStyle4("");
      setFullName("");
      setAvailableDays([]);
      setHours(new AvailableHours());
      setSwimmingStyleArray(new Array("", "", "", ""));
      //swimmingStyleHandler("frontCrawl");
      //swimmingTypeHandler("private");
      //setLessonType("private");
      //setSwimmingStyle("חתירה");
      setSunday(false);
      setMonday(false);
      setTuesday(false);
      setWednesday(false);
      setThursday(false);
      setTotalLessons("");
      setMaxLessonsPerAvailableDay("");
    }
  }
  function getHoursData(time, day, timeDefine) {
    hours[day][timeDefine] = time;
    console.log(hours);
  }

  function getStyleData(swimmingStyle, priority) {
    if (priority == 1) setSelectedStyle1(swimmingStyle);
    else if (priority == 2) setSelectedStyle2(swimmingStyle);
    else if (priority == 3) setSelectedStyle3(swimmingStyle);
    else if (priority == 4) setSelectedStyle4(swimmingStyle);

    swimmingStyleArray[priority - 1] = swimmingStyle;
    console.log(swimmingStyleArray);
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={strings.fullName}
              value={fullName}
              onChangeText={(name) => {
                setFullName(name);
                setErrorMessage("");
              }}
              style={styles.input}
            />

            <TextInput
              placeholder={strings.totalLessons}
              value={totalLessons}
              onChangeText={(num) => {
                setTotalLessons(num);
                setErrorMessage("");
              }}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder={strings.maxLessonsPerDay}
              value={maxLessonsPerAvailableDay}
              onChangeText={(num) => {
                setMaxLessonsPerAvailableDay(num);
                setErrorMessage("");
              }}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.text}>{strings.availableDays}</Text>
          <View
            style={[
              styles.rowItems,
              { flexDirection: HebrewLanguage ? "row" : "row-reverse" },
            ]}
          >
            {sunday && (
              <Hours
                day="sunday"
                isHebrew={HebrewLanguage}
                selectedStartValue={getHoursData}
                selectedEndValue={getHoursData}
              />
            )}
            <BooleanButton
              text={strings.sunday}
              pressed={sunday}
              onSelect={() => {
                setSunday(!sunday);
              }}
            />
          </View>
          <View
            style={[
              styles.rowItems,
              { flexDirection: HebrewLanguage ? "row" : "row-reverse" },
            ]}
          >
            {monday && (
              <Hours
                day="monday"
                isHebrew={HebrewLanguage}
                selectedStartValue={getHoursData}
                selectedEndValue={getHoursData}
              />
            )}
            <BooleanButton
              text={strings.monday}
              pressed={monday}
              onSelect={() => {
                setMonday(!monday);
              }}
            />
          </View>
          <View
            style={[
              styles.rowItems,
              { flexDirection: HebrewLanguage ? "row" : "row-reverse" },
            ]}
          >
            {tuesday && (
              <Hours
                day="tuesday"
                isHebrew={HebrewLanguage}
                selectedStartValue={getHoursData}
                selectedEndValue={getHoursData}
              />
            )}
            <BooleanButton
              text={strings.tuesday}
              pressed={tuesday}
              onSelect={() => {
                setTuesday(!tuesday);
              }}
            />
          </View>
          <View
            style={[
              styles.rowItems,
              { flexDirection: HebrewLanguage ? "row" : "row-reverse" },
            ]}
          >
            {wednesday && (
              <Hours
                day="wednesday"
                isHebrew={HebrewLanguage}
                selectedStartValue={getHoursData}
                selectedEndValue={getHoursData}
              />
            )}
            <BooleanButton
              text={strings.wednesday}
              pressed={wednesday}
              onSelect={() => {
                setWednesday(!wednesday);
              }}
            />
          </View>
          <View
            style={[
              styles.rowItems,
              { flexDirection: HebrewLanguage ? "row" : "row-reverse" },
            ]}
          >
            {thursday && (
              <Hours
                day="thursday"
                isHebrew={HebrewLanguage}
                selectedStartValue={getHoursData}
                selectedEndValue={getHoursData}
              />
            )}
            <BooleanButton
              text={strings.thursday}
              pressed={thursday}
              onSelect={() => {
                setThursday(!thursday);
              }}
            />
          </View>
          <View style={styles.margin}>
            <Text style={styles.text}>{strings.swimmingStyle}</Text>
          </View>
          <View
            style={[
              styles.rowItems,
              { flexDirection: HebrewLanguage ? "row" : "row-reverse" },
            ]}
          >
            <SwimmingStyle
              selectedStyle={getStyleData}
              priority={"1"}
              selectedText={selectedStyle1}
            />
            <Text style={styles.priorityText}>{strings.priority1}</Text>
          </View>
          <View
            style={[
              styles.rowItems,
              { flexDirection: HebrewLanguage ? "row" : "row-reverse" },
            ]}
          >
            <SwimmingStyle
              selectedStyle={getStyleData}
              priority={"2"}
              selectedText={selectedStyle2}
            />
            <Text style={styles.priorityText}>{strings.priority2}</Text>
          </View>
          <View
            style={[
              styles.rowItems,
              { flexDirection: HebrewLanguage ? "row" : "row-reverse" },
            ]}
          >
            <SwimmingStyle
              selectedStyle={getStyleData}
              priority={"3"}
              selectedText={selectedStyle3}
            />
            <Text style={styles.priorityText}>{strings.priority3}</Text>
          </View>
          <View
            style={[
              styles.rowItems,
              { flexDirection: HebrewLanguage ? "row" : "row-reverse" },
            ]}
          >
            <SwimmingStyle
              selectedStyle={getStyleData}
              priority={"4"}
              selectedText={selectedStyle4}
            />
            <Text style={styles.priorityText}>{strings.priority4}</Text>
          </View>
          {/* <BigBooleanButton
              text={strings.backstroke}
              pressed={backstroke}
              onSelect={() => {
                swimmingStyleHandler("backstroke");
                setSwimmingStyle("גב");
              }}
            />
            {/* <BigBooleanButton
              text={strings.butterflyStroke}
              pressed={butterflyStroke}
              onSelect={() => {
                swimmingStyleHandler("butterflyStroke");
                setSwimmingStyle("פרפר");
              }}
            />
            
          <View
            style={[
              styles.rowItems,
              { flexDirection: HebrewLanguage ? "row" : "row-reverse" },
            ]}
          >
            <BigBooleanButton
              text={strings.breaststroke}
              pressed={breaststroke}
              onSelect={() => {
                swimmingStyleHandler("breaststroke");
                setSwimmingStyle("חזה");
              }}
            />
            <BigBooleanButton
              text={strings.frontCrawl}
              pressed={frontCrawl}
              onSelect={() => {
                swimmingStyleHandler("frontCrawl");
                setSwimmingStyle("חתירה");
              }}
            />
          </View>*/}
          <View style={styles.margin}>
            <Text style={styles.text}>{strings.lessonType}</Text>
          </View>
          <View
            style={[
              styles.rowItems,
              { flexDirection: HebrewLanguage ? "row" : "row-reverse" },
            ]}
          >
            <BooleanButton
              text={strings.group}
              pressed={groupType}
              onSelect={() => {
                swimmingTypeHandler("group");
                setLessonType("group");
              }}
            />
            <BooleanButton
              text={strings.private}
              pressed={privateType}
              onSelect={() => {
                swimmingTypeHandler("private");
                setLessonType("private");
              }}
            />
          </View>
          <View
            style={[
              styles.rowItems,
              { flexDirection: HebrewLanguage ? "row" : "row-reverse" },
            ]}
          >
            <BigBooleanButton
              text={strings.groupPreference}
              pressed={groupPreference}
              onSelect={() => {
                swimmingTypeHandler("GroupPreference");
                setLessonType("GroupPreference");
              }}
            />
            <BigBooleanButton
              text={strings.privatePreference}
              pressed={privatePreference}
              onSelect={() => {
                swimmingTypeHandler("privatePreference");
                setLessonType("privatePreference");
              }}
            />
          </View>
          {errorMessage.length > 0 && (
            <Text style={styles.error}>{errorMessage.slice(5)}</Text>
          )}
          <MyButton text={strings.submit} onSelect={submitHandler} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#e5f3fe",
    alignItems: "center",
    paddingTop: 45,
    paddingBottom: 80,
  },
  inputContainer: {
    width: "60%",
    marginBottom: 15,
  },
  input: {
    textAlign: "right",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  rowItems: {
    alignItems: "center",
    flexDirection: true ? "row" : "row-reverse",
    marginTop: 20,
    justifyContent: "space-around",
  },
  text: {
    padding: 15,
    color: Colors.black,
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
  margin: {
    marginTop: 15,
  },
  error: {
    color: "red",
    textAlign: "right",
  },
  ModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000aa",
    padding: 40,
  },
  ModalMessage: {
    //width: 300,
    //height: 300,
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  priorityText: {
    padding: 15,
    color: Colors.black,
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
});

//export const lessons = poolManagement.lessons;
//export const t = isHebrew;
export default AddStudent;
