import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hourIndex } from "../constants/Variables";
import Lesson from "../models/Lesson";
import SwimmingStyle from "./SwimmingStyle";

function Scheduling(students) {
  const yotamMonday = setArrayFor("Yotam");
  const yotamThursday = setArrayFor("Yotam");
  const yoniTuesday = setArrayFor("Yoni");
  const yoniWednesday = setArrayFor("Yoni");
  const yoniThursday = setArrayFor("Yoni");
  const joniSunday = setArrayFor("Joni");
  const joniTuesday = setArrayFor("Joni");
  const joniThursday = setArrayFor("Joni");

  const waitingForGroup = [];

  const conflicts = [];
  const groups = [];
  const lessons = [];

  Lesson.index = 1;

  students.forEach((student) => {
    if (
      student.lessonType == "group" ||
      student.lessonType == "GroupPreference"
    )
      waitingForGroup.push(student);
    else {
      if (student.availableDays.includes("ראשון")) {
        for (
          let i = hourIndex[student.hours["sunday"]["start"]];
          i <= hourIndex[student.hours["sunday"]["end"]] - 2;
          i++
        ) {
          if (student.lessonsCounterPerDay == student.maxLessonsPerAvailableDay)
            break;
          if (
            joniSunday[i] == "available" &&
            joniSunday[i + 1] == "available" &&
            joniSunday[i + 2] == "available"
          ) {
            setNewPrivateLesson(student, "Joni", "ראשון", 2, i, joniSunday);
            if (student.lessonsLeftThisWeek == 0) break;
          }
        }
      } //end of sunday
      if (
        student.availableDays.includes("שני") &&
        student.lessonsLeftThisWeek > 0
      ) {
        for (
          let i = hourIndex[student.hours["monday"]["start"]];
          i <= hourIndex[student.hours["monday"]["end"]] - 2;
          i++
        ) {
          if (student.lessonsCounterPerDay == student.maxLessonsPerAvailableDay)
            break;
          if (
            yotamMonday[i] == "available" &&
            yotamMonday[i + 1] == "available" &&
            yotamMonday[i + 2] == "available"
          ) {
            setNewPrivateLesson(student, "Yotam", "שני", 3, i, yotamMonday);
            if (student.lessonsLeftThisWeek == 0) break;
          }
        }
      } // end of monday
      if (
        student.availableDays.includes("שלישי") &&
        student.lessonsLeftThisWeek > 0
      ) {
        for (
          let i = hourIndex[student.hours["tuesday"]["start"]];
          i <= hourIndex[student.hours["tuesday"]["end"]] - 2;
          i++
        ) {
          if (student.lessonsCounterPerDay == student.maxLessonsPerAvailableDay)
            break;
          if (
            joniTuesday[i] == "available" &&
            joniTuesday[i + 1] == "available" &&
            joniTuesday[i + 2] == "available"
          ) {
            setNewPrivateLesson(student, "Joni", "שלישי", 4, i, joniTuesday);
            if (student.lessonsLeftThisWeek == 0) break;
            i = i + 2;
          } else if (
            yoniTuesday[i] == "available" &&
            yoniTuesday[i + 1] == "available" &&
            yoniTuesday[i + 2] == "available"
          ) {
            setNewPrivateLesson(student, "Yoni", "שלישי", 4, i, yoniTuesday);
            if (student.lessonsLeftThisWeek == 0) break;
            i = i + 2;
          }
        }
      } //end of tuesday
      if (
        student.availableDays.includes("רביעי") &&
        student.lessonsLeftThisWeek > 0
      ) {
        for (
          let i = hourIndex[student.hours["wednesday"]["start"]];
          i <= hourIndex[student.hours["wednesday"]["end"]] - 2;
          i++
        ) {
          if (student.lessonsCounterPerDay == student.maxLessonsPerAvailableDay)
            break;
          if (
            yoniWednesday[i] == "available" &&
            yoniWednesday[i + 1] == "available" &&
            yoniWednesday[i + 2] == "available"
          ) {
            setNewPrivateLesson(student, "Yoni", "רביעי", 5, i, yoniWednesday);
            if (student.lessonsLeftThisWeek == 0) break;
          }
        }
      } // end of wednesday
      if (
        student.availableDays.includes("חמישי") &&
        student.lessonsLeftThisWeek > 0
      ) {
        for (
          let i = hourIndex[student.hours["thursday"]["start"]];
          i <= hourIndex[student.hours["thursday"]["end"]] - 2;
          i++
        ) {
          if (student.lessonsCounterPerDay == student.maxLessonsPerAvailableDay)
            break;
          if (
            joniThursday[i] == "available" &&
            joniThursday[i + 1] == "available" &&
            joniThursday[i + 2] == "available"
          ) {
            setNewPrivateLesson(student, "Joni", "חמישי", 6, i, joniThursday);
            if (student.lessonsLeftThisWeek == 0) break;
            i = i + 2;
          } else if (
            yotamThursday[i] == "available" &&
            yotamThursday[i + 1] == "available" &&
            yotamThursday[i + 2] == "available"
          ) {
            setNewPrivateLesson(student, "Yotam", "חמישי", 6, i, yotamThursday);
            if (student.lessonsLeftThisWeek == 0) break;
            i = i + 2;
          } else if (
            yoniThursday[i] == "available" &&
            yoniThursday[i + 1] == "available" &&
            yoniThursday[i + 2] == "available"
          ) {
            setNewPrivateLesson(student, "Yoni", "חמישי", 6, i, yoniThursday);
            if (student.lessonsLeftThisWeek == 0) break;
            i = i + 2;
          }
        }
      } //end of thursday
      if (student.lessonsLeftThisWeek > 0) {
        conflicts.push({
          student: student,
          conflict: `לא נשאר מקום פנוי בשעות המבוקשות בימי ${student.availableDays}, לתלמיד ${student.fullName} לשבוע הקרוב. חסרים  ${student.lessonsLeftThisWeek}  שיעורים מתוך ${student.totalLessons} בסה"כ.`,
        });
      }
    }
  }); // end forEach of students

  sortGroups();
  function sortGroups() {
    for (let i = 8; i < 44; i++) {
      //checking availability in joniSunday in 10:00-19:00
      if (
        joniSunday[i] == "available" &&
        joniSunday[i + 1] == "available" &&
        joniSunday[i + 2] == "available" &&
        joniSunday[i + 3] == "available"
      ) {
        const filtered = waitingForGroup.filter(
          (student) =>
            student.availableDays.includes("ראשון") &&
            isAvailable(i, student, "sunday")
        );
        if (filtered.length == 0) continue;
        //else if (filtered.length > 0 && filtered.length < 3) {} TODO: in the end of groups- handle them
        else if (filtered.length >= 3 && filtered.length <= 7) {
          const participantsIDs = filtered.map(student => student.id)
        } else if (filtered.length > 7) {
        }
        // only if there is a new lesson: i = i + 4;
      }
    }

    function isAvailable(i, student, day) {
      if (student.lessonsLeftThisWeek == 0) {
        const index = waitingForGroup.indexOf(student);
        if (index > -1) {
          waitingForGroup.splice(index, 1); // 2nd parameter means remove one item only
        }
        return false;
      }
      else if (student.lessonsCounterPerDay == student.maxLessonsPerAvailableDay)
        return false;
      return (
        hourIndex[student.hours[day]["start"]] <= i &&
        hourIndex[student.hours[day]["end"]] >= i
      );
    }
  }

  // console.log(joniTuesday);
  // console.log(lessons);
  // lessons.forEach((lesson) => {
  //   console.log(
  //     lesson.start.toLocaleTimeString(),
  //     " ",
  //     lesson.end.toLocaleTimeString(),
  //     " ",
  //     lesson.name
  //   );
  // });
  function setNewPrivateLesson(
    student,
    guide,
    dayName,
    date,
    i,
    guideSchedule
  ) {
    const newLesson = new Lesson(
      [student.id],
      student.fullName,
      guide,
      guide == "Yoni"
        ? findGoodSwimmingStyleToYoni(student.swimmingStyleArray)
        : student.swimmingStyleArray[0],
      true,
      dayName,
      new Date(
        2022,
        9,
        date,
        getHourByIndex(hourIndex, i),
        getMinutesByIndex(hourIndex, i)
      ),
      new Date(
        2022,
        9,
        date,
        getHourByIndex(hourIndex, i + 3),
        getMinutesByIndex(hourIndex, i + 3)
      )
    );
    lessons.push(newLesson);
    guideSchedule[i] = { studentId: student.id, lessonId: newLesson.id };
    guideSchedule[i + 1] = {
      studentId: student.id,
      lessonId: newLesson.id,
    };
    guideSchedule[i + 2] = {
      studentId: student.id,
      lessonId: newLesson.id,
    };
    student.lessonsLeftThisWeek--;
    student.lessonsCounterPerDay++;
  }

  function findGoodSwimmingStyleToYoni(SwmStlArray) {
    if (SwmStlArray[0] == "חזה" || SwmStlArray[0] == "פרפר")
      return SwmStlArray[0];
    else if (SwmStlArray[1] == "חזה" || SwmStlArray[1] == "פרפר")
      return SwmStlArray[1];
    else if (SwmStlArray[2] == "חזה" || SwmStlArray[2] == "פרפר")
      return SwmStlArray[2];
    else if (SwmStlArray[3] == "חזה" || SwmStlArray[3] == "פרפר")
      return SwmStlArray[3];
  }

  function getHourByIndex(object, value) {
    if (value < 8)
      return Object.keys(object)
        .find((key) => object[key] === value)
        .slice(0, 1);
    else
      return Object.keys(object)
        .find((key) => object[key] === value)
        .slice(0, 2);
  }
  function getMinutesByIndex(object, value) {
    if (value < 8)
      return Object.keys(object)
        .find((key) => object[key] === value)
        .slice(2, 4);
    else
      return Object.keys(object)
        .find((key) => object[key] === value)
        .slice(3, 5);
  }
  return {
    yotamMonday: yotamMonday,
    yotamThursday: yotamThursday,
    yoniTuesday: yoniTuesday,
    yoniWednesday: yoniWednesday,
    yoniThursday: yoniThursday,
    joniSunday: joniSunday,
    joniTuesday: joniTuesday,
    joniThursday: joniThursday,
    conflicts: conflicts,
    groups: groups,
    lessons: lessons,
  };
} //end of Scheduling

function setArrayFor(guide) {
  if (guide == "Yotam") {
    const arr = Array(49).fill("notAvailable");
    for (let i = 32; i < 48; i++) arr[i] = "available";
    return arr;
  } else if (guide == "Yoni") {
    const arr = Array(49).fill("available");
    for (let i = 28; i < 49; i++) arr[i] = "notAvailable";
    return arr;
  } else if (guide == "Joni") {
    const arr = Array(49).fill("notAvailable");
    for (let i = 8; i < 44; i++) arr[i] = "available";
    return arr;
  }
}

export default Scheduling;
