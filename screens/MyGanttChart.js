import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  LogBox,
  Modal,
  Text,
  Alert,
  SafeAreaView,
} from "react-native";
import GanttChart from "react-native-gantt-chart";
import { useSelector } from "react-redux";
import { selectTranslations } from "../redux/i18n";
import MyButton from "../components/MyButton";
import { t } from "i18n-js";

const tasks = [
  {
    _id: "1",
    name: "Task 1",
    start: new Date(2018, 0, 1, 15),
    end: new Date(2018, 0, 1, 18),
    progress: 1,
  },
  {
    _id: "2",
    name: "Task 2",
    start: new Date(2018, 0, 2, 11),
    end: new Date(2018, 0, 2, 12),
    progress: 1,
  },
  {
    _id: "3",
    name: "Task 3",
    start: new Date(2018, 0, 3, 12),
    end: new Date(2018, 0, 3, 13),
    progress: 1,
  },
];

function MyGanttChart({navigation}) {
  function setLessons(lessons) {
    const viewLessons = [];
    lessons.forEach((lesson) => {
      viewLessons.push({
        _id: lesson.id,
        name: `${lesson.name} ${lesson.start
          .toLocaleTimeString("en-GB")
          .slice(0, 5)}`,
        nameEn: `${lesson.name} in ${lesson.start
            .toLocaleTimeString("en-GB")
            .slice(0, 5)}`,
        start: lesson.start,
        end: lesson.end,
        progress: 1,
        toString: lesson.toString,
        toStringEn: lesson.toStringEn,
        guideHebrew: lesson.guideHebrew,
        swimmingType: lesson.swimmingType,
        swimmingList: lesson.swimmingList,
        itsPrivateLesson: lesson.itsPrivateLesson,
        day: lesson.day,
        days: lesson.days,
        guide: lesson.guide,
      });
    });
    return viewLessons;
  }

  function lessonDetailsOnModal() {
    const guides = { Yotam: "יותם", Yoni: "יוני", Joni: "ג'וני" };

    if (lesson.itsPrivateLesson)
      setViewModal(
        <>
          <Text>שיעור ל{lesson.name} </Text>
          <Text>
            עם המדריך {guides[lesson.guide]} בשעות
            {lesson.start.toLocaleTimeString().slice(0, 5)}-
            {lesson.end.toLocaleTimeString().slice(0, 5)}
            בשחיית {lesson.swimmingType}
          </Text>
        </>
      );
    else setViewModal(<Text>jfj</Text>);
    setShowModal(true);
  }

  const strings = useSelector(selectTranslations);
  const lessons = useSelector((state) => state.lessons.all);
  const [viewLessons, setViewLessons] = useState(setLessons(lessons));
  const [showModal, setShowModal] = useState(false);
  const [isHebrew, setIsHebrew] = useState(true);
  const [viewModal, setViewModal] = useState(null);
  const [isInitial, setIsInitial] = useState(false);
  //if (!isInitial) {
  // useEffect(() => {
  //   lessons.forEach((lesson) => {
  //     viewLessons.push({
  //       _id: lesson.id,
  //       name: `${lesson.name} ב${lesson.start
  //         .toLocaleTimeString("en-GB")
  //         .slice(0, 5)}`,
  //       start: lesson.start,
  //       end: lesson.end,
  //       progress: 1,
  //       //toString: lesson.toString,
  //       //guideHebrew: lesson.guideHebrew,
  //       //swimmingType: lesson.swimmingType,
  //       //itsPrivateLesson: lesson.itsPrivateLesson,
  //       //day: lesson.day,
  //     });
  //     console.log("in useEffect:", viewLessons);
  //   });
  //   //setIsInitial(true);
  // }, [lessons]);
  //}

  useEffect(() => {
    if (strings.homeTitle == "Home"){
      setIsHebrew(false);
      navigation.setOptions({ title: strings.ganttChart, headerBackTitle: strings.homeTitle });
    }
    else 
      setIsHebrew(true);
  },[isHebrew])

  LogBox.ignoreAllLogs();
  const lesson = { guide: "yotam" };

  function guideColor(guide) {
    if (guide == "Yotam") return "#fff";
    else if (guide == "Yoni") return "#f2d096";
    else return "#8fb9aa";
  }

  if (viewLessons.length == 0) {
    setTimeout(function () {
      //do what you need here
    }, 2000);
  }
  if (viewLessons.length == 0) {
    return <Text style={styles.text}>{strings.noData}</Text>;
  } else

  /*{ <Modal animationType={"fade"} transparent={true} visible={false}>
          <View style={styles.ModalContainer}>
            <View style={styles.ModalMessage}>
              <Text>{viewModal}</Text>
              <MyButton
                text="אישור"
                onSelect={() => {
                  setShowModal(false);
                }}
              />
            </View>
          </View>
        </Modal> }*/
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.daysContainer}>
          <Text style={styles.daysText}>{strings.sunday}</Text>
          <Text style={styles.daysText}>{strings.monday}</Text>
          <Text style={styles.daysText}>{strings.tuesday}</Text>
          <Text style={styles.daysText}>{strings.wednesday}</Text>
          <Text style={styles.daysText}>{strings.thursday}</Text>
        </View>
        <GanttChart
          data={viewLessons}
          numberOfTicks={6}
          onPressTask={(lesson) => {
            Alert.alert(isHebrew ? lesson.toString() : lesson.toStringEn(), null, [{ text: "אישור" }]);
            //setShowModal(true)
          }} //alert(task.name)}
          gridMin={new Date(2022, 9, 2).getTime()}
          gridMax={new Date(2022, 9, 7).getTime()}
          colors={{
            barColorPrimary: "#8fb9aa",
            barColorSecondary: "#f2d096",
            textColor: "#0F5298",
            backgroundColor: "#e5f3fe",
          }}
        />
      </SafeAreaView>
    );
} // enf of MyGanttChart

const styles = StyleSheet.create({
  container: {
    //width: "95%",
    //height: "95%",
    flex: 1,
    backgroundColor: "#000",
    //left: 10,
  },
  ModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000aa",
    padding: 40,
  },
  ModalMessage: {
    backgroundColor: "#ffffff",
    //flex: 1,
    height: "55%",
    width: "80%",
    margin: 50,
    padding: 40,
    borderRadius: 10,
    alignContent: "center",
    alignItems: "center",
    //justifyContent: "center"
  },
  text: {
    marginTop: 20,
    fontSize: 30,
    textAlign: "center",
    color: "black",
  },
  daysText: {
    color: "#f2a000",
    fontSize: 26,
  },
  daysContainer: {
    justifyContent: "space-around",
    backgroundColor: "#e5f3fe",
    flexDirection: "row",
    //alignItems: "flex-end",
    paddingBottom: -30,
  },
});

export default MyGanttChart;
