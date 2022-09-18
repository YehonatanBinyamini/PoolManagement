import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LogoffButton from "../components/LogoffButton";
import MyButton from "../components/MyButton";
import RoundButton from "../components/RoundButton";
import Scheduling from "../components/Scheduling";
import { useSelector, useDispatch } from "react-redux";
import { addLesson } from "../redux/lessons";
import weekSchedule from "../models/WeekSchedule";
import { addConflict } from "../redux/conflicts";
import { selectTranslations } from "../redux/i18n";
import Lesson from "../models/Lesson";

function Home({ navigation, route }) {
  let data;

  const strings = useSelector(selectTranslations);
  useEffect(() => {
    navigation.setOptions({ title: strings.homeTitle });
  }, []);

  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.all);

  function scheduleHandler1() {
    const sortedStudents = students
      .slice()
      .sort((a, b) => a.totalAvailableTime - b.totalAvailableTime);
    //the sorted array order by the students with the minimum available time
    data = Scheduling(sortedStudents);
    console.log(data.conflicts);
    data.lessons.forEach((lesson) => {
      dispatch(addLesson({ obj: lesson }));
    });
    if (data.conflicts.length > 0) {
      Alert.alert(
        strings.thereIsConflicts,
        strings.lookAtTheConflicts,
        [{ text: strings.close }]
      );
      data.conflicts.forEach((conflict) => {
        dispatch(addConflict({ obj: conflict }));
      });
    }
  }

  function scheduleHandler() {
    const poolManagement = new weekSchedule();
    if (!students.length) {
      Alert.alert(
        strings.schedulingNotCreated,
        strings.addingStudentsToProgram,
        [{ text: strings.close }]
      );
    } else {
      students.forEach((student) => {
        poolManagement.schedule(student);
      });
      poolManagement.groupsSort();

      poolManagement.lessons.forEach((lesson) => {
        console.log(lesson);
        dispatch(addLesson({ obj: lesson }));
      });
      poolManagement.conflicts.forEach((conflict) => {
        dispatch(addConflict({ obj: conflict }));
      });
      Alert.alert(strings.successSchedule, null, [{ text: strings.close }]);
    }
  }
  useLayoutEffect(() => {
    //changeScreenOrientation();

    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.logoff}>
            <LogoffButton
              onPress={() => {
                navigation.replace("Login");
              }}
            />
          </View>
        );
      },
    });
  }, []);

  return (
    <LinearGradient
      colors={["#b3e5fc", "#006db5", "#00559a"]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <RoundButton text={strings.scheduling} onPress={scheduleHandler1} />
        <RoundButton
          text={strings.conflicts}
          width="32%"
          height="55%"
          onPress={() => {
            navigation.navigate("Conflicts");
          }}
        />
        <RoundButton
          text={strings.schedulingTable}
          width="45%"
          height="66%"
          onPress={() => {
            navigation.navigate("GanttChart");
          }}
        />
        <MyButton
          text="test"
          onSelect={() => {
            //navigation.navigate("Test");
          }}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 130,
    height: "60%",
    justifyContent: "space-evenly",
  },
  circles: {
    alignItems: "center",
    flexDirection: "row",
  },
  logoff: {
    right: 10,
  },
});

export default Home;
