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
      scheduleStudent(student);
    }
  }); // end forEach of students
  sortGroups();
  waitingForGroup.forEach((student) => {
    if (student.lessonsLeftThisWeek > 0) {
      conflicts.push({
        student: student,
        conflict: `לתלמיד ${student.fullName} נשארו ${student.lessonsLeftThisWeek} מתוך ${student.totalLessons} שיעורים שלא שובץ לקבוצה `,
      });
    }
  });

  function scheduleStudent(student) {
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
      student.lessonsCounterPerDay = 0;
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
      student.lessonsCounterPerDay = 0;
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
      student.lessonsCounterPerDay = 0;
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
      student.lessonsCounterPerDay = 0;
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
        conflict: `לא נשאר מקום פנוי בשעות המבוקשות בימי ${student.availableDays}, לתלמיד ${student.fullName} לשבוע הקרוב. חסרים  ${student.lessonsLeftThisWeek} שיעורים מתוך ${student.totalLessons} בסה"כ.`,
      });
    }
  } // end of scheduleStudent

  function sortGroups() {
    for (let i = 8; i < 41; i++) {
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
        else if (filtered.length >= 3) {
          const participantsIDs = getIDs(filtered);
          setNewGroupLesson(
            filtered,
            participantsIDs,
            "Joni",
            "ראשון",
            2,
            i,
            joniSunday
          );
          i = i + 4;
        }
      }
    } // end of for: sunday
    for (let i = 32; i < 45; i++) {
      //checking availability in yotamMonday in 16:00-20:00
      if (
        yotamMonday[i] == "available" &&
        yotamMonday[i + 1] == "available" &&
        yotamMonday[i + 2] == "available" &&
        yotamMonday[i + 3] == "available"
      ) {
        const filtered = waitingForGroup.filter(
          (student) =>
            student.availableDays.includes("שני") &&
            isAvailable(i, student, "monday")
        );
        if (filtered.length == 0) continue;
        //else if (filtered.length > 0 && filtered.length < 3) {} TODO: in the end of groups- handle them
        else if (filtered.length >= 3) {
          const participantsIDs = getIDs(filtered);
          setNewGroupLesson(
            filtered,
            participantsIDs,
            "Yotam",
            "שני",
            3,
            i,
            yotamMonday
          );
          i = i + 4;
        }
      }
    } // end of for: monday
    for (let i = 0; i < 41; i++) {
      //checking availability in joniTuesday or yoniTuesday in 16:00-20:00
      if (
        i >= 8 &&
        joniTuesday[i] == "available" &&
        joniTuesday[i + 1] == "available" &&
        joniTuesday[i + 2] == "available" &&
        joniTuesday[i + 3] == "available"
      ) {
        const filtered = waitingForGroup.filter(
          (student) =>
            student.availableDays.includes("שלישי") &&
            isAvailable(i, student, "tuesday")
        );
        if (filtered.length == 0) continue;
        //else if (filtered.length > 0 && filtered.length < 3) {} TODO: in the end of groups- handle them
        else if (filtered.length >= 3) {
          const participantsIDs = getIDs(filtered);
          setNewGroupLesson(
            filtered,
            participantsIDs,
            "Joni",
            "שלישי",
            4,
            i,
            joniTuesday
          );
          i = i + 4;
        }
      } else if (
        i < 25 &&
        yoniTuesday[i] == "available" &&
        yoniTuesday[i + 1] == "available" &&
        yoniTuesday[i + 2] == "available" &&
        yoniTuesday[i + 3] == "available"
      ) {
        const filtered = waitingForGroup.filter(
          (student) =>
            student.availableDays.includes("שלישי") &&
            isAvailable(i, student, "tuesday")
        );
        if (filtered.length == 0) continue;
        //else if (filtered.length > 0 && filtered.length < 3) {} TODO: in the end of groups- handle them
        else if (filtered.length >= 3) {
          const participantsIDs = getIDs(filtered);
          setNewGroupLesson(
            filtered,
            participantsIDs,
            "Yoni",
            "שלישי",
            4,
            i,
            yoniTuesday
          );
          i = i + 4;
        }
      }
    } // end of for: tuesday
    for (let i = 0; i < 25; i++) {
      //checking availability in yoniWednesday in 8:00-15:00
      if (
        yoniWednesday[i] == "available" &&
        yoniWednesday[i + 1] == "available" &&
        yoniWednesday[i + 2] == "available" &&
        yoniWednesday[i + 3] == "available"
      ) {
        const filtered = waitingForGroup.filter(
          (student) =>
            student.availableDays.includes("רביעי") &&
            isAvailable(i, student, "wednesday")
        );
        if (filtered.length == 0) continue;
        //else if (filtered.length > 0 && filtered.length < 3) {} TODO: in the end of groups- handle them
        else if (filtered.length >= 3) {
          const participantsIDs = getIDs(filtered);
          setNewGroupLesson(
            filtered,
            participantsIDs,
            "Yoni",
            "רביעי",
            5,
            i,
            yoniWednesday
          );
          i = i + 4;
        }
      }
    } // end of for: wednesday
    for (let i = 0; i < 45; i++) {
      //checking availability in joniThursday or yotamThursday or yoniThursday in 8:00-20:00
      if (
        i >= 8 &&
        i < 41 &&
        joniThursday[i] == "available" &&
        joniThursday[i + 1] == "available" &&
        joniThursday[i + 2] == "available" &&
        joniThursday[i + 3] == "available"
      ) {
        const filtered = waitingForGroup.filter(
          (student) =>
            student.availableDays.includes("חמישי") &&
            isAvailable(i, student, "thursday")
        );
        if (filtered.length == 0) continue;
        //else if (filtered.length > 0 && filtered.length < 3) {} TODO: in the end of groups- handle them
        else if (filtered.length >= 3) {
          const participantsIDs = getIDs(filtered);
          setNewGroupLesson(
            filtered,
            participantsIDs,
            "Joni",
            "חמישי",
            6,
            i,
            joniThursday
          );
          i = i + 4;
        }
      } else if (
        i >= 32 &&
        yotamThursday[i] == "available" &&
        yotamThursday[i + 1] == "available" &&
        yotamThursday[i + 2] == "available" &&
        yotamThursday[i + 3] == "available"
      ) {
        const filtered = waitingForGroup.filter(
          (student) =>
            student.availableDays.includes("חמישי") &&
            isAvailable(i, student, "thursday")
        );
        if (filtered.length == 0) continue;
        //else if (filtered.length > 0 && filtered.length < 3) {} TODO: in the end of groups- handle them
        else if (filtered.length >= 3) {
          const participantsIDs = getIDs(filtered);
          setNewGroupLesson(
            filtered,
            participantsIDs,
            "Yotam",
            "חמישי",
            6,
            i,
            yotamThursday
          );
          i = i + 4;
        }
      } else if (
        i < 25 &&
        yoniThursday[i] == "available" &&
        yoniThursday[i + 1] == "available" &&
        yoniThursday[i + 2] == "available" &&
        yoniThursday[i + 3] == "available"
      ) {
        const filtered = waitingForGroup.filter(
          (student) =>
            student.availableDays.includes("חמישי") &&
            isAvailable(i, student, "thursday")
        );
        if (filtered.length == 0) continue;
        //else if (filtered.length > 0 && filtered.length < 3) {} TODO: in the end of groups- handle them
        else if (filtered.length >= 3) {
          const participantsIDs = getIDs(filtered);
          setNewGroupLesson(
            filtered,
            participantsIDs,
            "Yoni",
            "חמישי",
            6,
            i,
            yoniThursday
          );
          i = i + 4;
        }
      }
    } // end of for: thursday

    function setNewGroupLesson(
      students,
      participantsIDs,
      guide,
      dayName,
      date,
      i,
      guideSchedule
    ) {
      const swimmingStyle = choosingSwimmingStyle(students, guide);
      const newLesson = new Lesson(
        participantsIDs,
        "קבוצה " + Lesson.groupIndex++,
        guide,
        swimmingStyle,
        false,
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
          getHourByIndex(hourIndex, i + 4),
          getMinutesByIndex(hourIndex, i + 4)
        )
      );
      lessons.push(newLesson);
      guideSchedule[i] = { studentId: 0, lessonId: newLesson.id };
      guideSchedule[i + 1] = {
        studentId: 0,
        lessonId: newLesson.id,
      };
      guideSchedule[i + 2] = {
        studentId: 0,
        lessonId: newLesson.id,
      };
      guideSchedule[i + 3] = {
        studentId: 0,
        lessonId: newLesson.id,
      };
      students.forEach((student) => {
        student.lessonsLeftThisWeek--;
        student.lessonsCounterPerDay++;
      });
    }

    function getIDs(students) {
      if (students.length <= 7) {
        return students.map((student) => student.id);
      } else {
        return students
          .filter((student, index) => index < 7)
          .map((student) => student.id);
      }
    }

    function choosingSwimmingStyle(students, guide) {
      let frontCrawl = 0;
      let Breast = 0;
      let Back = 0;
      let Butterfly = 0;
      students.forEach((student) => {
        if (
          student.swimmingStyleArray[0] == "חתירה" ||
          student.swimmingStyleArray[0] == "Front Crawl"
        ) {
          frontCrawl++;
        } else if (
          student.swimmingStyleArray[0] == "גב" ||
          student.swimmingStyleArray[0] == "Back"
        ) {
          Back++;
        } else if (
          student.swimmingStyleArray[0] == "פרפר" ||
          student.swimmingStyleArray[0] == "Butterfly"
        ) {
          Butterfly++;
        } else if (
          student.swimmingStyleArray[0] == "חזה" ||
          student.swimmingStyleArray[0] == "Breast"
        ) {
          Breast++;
        }
      });
      const max = Math.max(Breast, Back, Butterfly, frontCrawl);
      if (guide == "Yoni") {
        if (Breast == max) return "חזה";
        else return "פרפר";
      } else {
        if (Breast == max) return "חזה";
        else if (Butterfly == max) return "פרפר";
        else if (Back == max) return "גב";
        else return "חתירה";
      }
    }

    function isAvailable(i, student, day) {
      if (student.lessonsLeftThisWeek == 0) {
        const index = waitingForGroup.indexOf(student);
        if (index > -1) {
          waitingForGroup.splice(index, 1); // 2nd parameter means remove one item only
        }
        return false;
      } else {
        resetCounterPerDay(student, i, day);
        if (student.lessonsCounterPerDay == student.maxLessonsPerAvailableDay)
          return false;
      }
      return (
        hourIndex[student.hours[day]["start"]] <= i &&
        hourIndex[student.hours[day]["end"]] >= i
      );
    }

    function resetCounterPerDay(student, i, day) {
      if (i == 32 && day == "monday") student.lessonsCounterPerDay = 0;
      else if (i == 0 && day == "tuesday") student.lessonsCounterPerDay = 0;
      else if (i == 0 && day == "wednesday") student.lessonsCounterPerDay = 0;
      else if (i == 0 && day == "thursday") student.lessonsCounterPerDay = 0;
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
