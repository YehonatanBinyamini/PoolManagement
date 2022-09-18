import Group from "./Group";
import Lesson from "./Lesson";
import Student from "./Student";

class weekSchedule {
  constructor() {
    this.firstSunday = new Date(2022, 7, 21, 20, 22);
    this.yotamMonday = [];
    this.yotamThursday = [];

    this.yoniTuesday = [];
    this.yoniWednesday = [];
    this.yoniThursday = [];

    this.joniSunday = [];
    this.joniTuesday = [];
    this.joniThursday = [];

    this.waitingForFrontCrawlGroup = [];
    this.waitingForBreaststrokeGroup = [];
    this.waitingForButterflyStrokeGroup = [];
    this.waitingForBackstrokeGroup = [];

    this.conflicts = [];
    this.groups = [];
    this.lessons = []
  }
  //  Student(fullName, availableDays, swimmingType, lessonType, totalLessons, lessonsPerWeek) lessonsLeftThisWeek

  schedule(student) {
    console.log("start scheduling", student);
    if (
      student.availableDays[0] == "רביעי" &&
      student.availableDays.length == 1 && //checking if student is available only in wednesday to learn "chatira" or "gav"
      (student.swimmingType == "חתירה" || student.swimmingType == "גב")
    ) {
      this.conflicts.push({
        student: student,
        conflict: `אין מדריך שמלמד ${student.swimmingType} ביום רביעי, והתלמיד ${student.fullName} לא פנוי ביום אחר`,
      });
    } else if (
      student.lessonType == "group" ||
      student.lessonType == "GroupPreference"
    ) {
      if (student.swimmingType == "חתירה") {
        this.waitingForFrontCrawlGroup.push(student);
      } else if (student.swimmingType == "חזה") {
        this.waitingForBreaststrokeGroup.push(student);
      } else if (student.swimmingType == "גב") {
        this.waitingForBackstrokeGroup.push(student);
      } else if (student.swimmingType == "פרפר") {
        this.waitingForButterflyStrokeGroup.push(student);
      }
    } else if (
      student.availableDays[0] == "ראשון" &&
      student.availableDays.length == 1
    ) {
      // checking if student is available only in sunday
      for (let i = 0; i < student.lessonsLeftThisWeek; i++) {
        this.scheduleWithJoni(
          new Lesson(
            student.fullName,
            "Joni",
            student.swimmingType,
            true,
            "ראשון"
          )
        );
      }
    } else if (
      student.availableDays[0] == "שני" &&
      student.availableDays.length == 1
    ) {
      // checking if student is available only in monday
      for (let i = 0; i < student.lessonsLeftThisWeek; i++) {
        this.scheduleWithYotam(
          new Lesson(
            student.fullName,
            "Yotam",
            student.swimmingType,
            true,
            "שני"
          )
        );
      }
    } else {
      if (student.swimmingType == "פרפר" || student.swimmingType == "חזה") {
        // checking if student is available in one of the days of yoni, and he want to learn "haze" or "parpar"
        if (student.availableDays.includes("שלישי")) {
          //||  || student.availableDays.includes("חמישי")) {
          this.setFewLessonsTheSameDay(student, "Yoni", "שלישי");
        }
        if (student.availableDays.includes("רביעי")) {
          this.setFewLessonsTheSameDay(student, "Yoni", "רביעי");
        }
        if (student.availableDays.includes("חמישי")) {
          this.setFewLessonsTheSameDay(student, "Yoni", "חמישי");
        }
      }

      //scheduling by available time:
      if (
        student.lessonsLeftThisWeek > 0 &&
        student.availableDays.includes("ראשון")
      ) {
        this.setFewLessonsTheSameDay(student, "Joni", "ראשון");
      }
      if (
        student.lessonsLeftThisWeek > 0 &&
        student.availableDays.includes("שני")
      ) {
        this.setFewLessonsTheSameDay(student, "Yotam", "שני");
      }
      if (
        student.lessonsLeftThisWeek > 0 &&
        student.availableDays.includes("שלישי")
      ) {
        console.log("set few with Joni"); //TODO:: here is the problem
        this.setFewLessonsTheSameDay(student, "Joni", "שלישי");
      }
      if (
        student.lessonsLeftThisWeek > 0 &&
        student.availableDays.includes("חמישי")
      ) {
        this.setFewLessonsTheSameDay(student, "Joni", "חמישי");
        if (student.lessonsLeftThisWeek > 0) {
          this.setFewLessonsTheSameDay(student, "Yotam", "חמישי");
        }
      }

      if (student.lessonsLeftThisWeek > 0) {
        this.conflicts.push({
          student: student,
          conflict: `לא נשאר מקום פנוי ללימוד שחיית ${student.swimmingType} בימי ${student.availableDays}, לתלמיד ${student.fullName} לשבוע הקרוב. חסרים  ${student.lessonsLeftThisWeek}  שיעורים מתוך ${student.totalLessons} בסה"כ.`,
        });
      }
    }
  }

  scheduleWithYotam(lesson) {
    if (lesson.day == "שני") {
      if (!this.yotamMonday.length) {
        lesson.start = new Date(
          this.firstSunday.getFullYear(),
          this.firstSunday.getMonth(),
          this.firstSunday.getDate() + 1,
          16
        );
        if (lesson.itsPrivateLesson) {
          lesson.end = new Date(
            this.firstSunday.getFullYear(),
            this.firstSunday.getMonth(),
            this.firstSunday.getDate() + 1,
            16,
            45
          );
        } else {
          lesson.end = new Date(
            this.firstSunday.getFullYear(),
            this.firstSunday.getMonth(),
            this.firstSunday.getDate() + 1,
            17
          );
        }
        this.yotamMonday.push(lesson);
        this.lessons.push(lesson);

      } else {
        const i = this.yotamMonday.length - 1;
        const lastLessonEnd = this.yotamMonday[i].end;

        lesson.start = new Date(lastLessonEnd.valueOf());
        lesson.end = new Date(lesson.start.valueOf());
        if (lesson.itsPrivateLesson) {
          lesson.end.setMinutes(lesson.end.getMinutes() + 45);
        } else {
          lesson.end.setMinutes(lesson.end.getMinutes() + 60);
        }
        this.yotamMonday.push(lesson);
        this.lessons.push(lesson);
      }
    } else if (lesson.day == "חמישי") {
      if (!this.yotamThursday.length) {
        lesson.start = new Date(
          this.firstSunday.getFullYear(),
          this.firstSunday.getMonth(),
          this.firstSunday.getDate() + 4,
          16
        );
        if (lesson.itsPrivateLesson) {
          lesson.end = new Date(
            this.firstSunday.getFullYear(),
            this.firstSunday.getMonth(),
            this.firstSunday.getDate() + 4,
            16,
            45
          );
        } else {
          lesson.end = new Date(
            this.firstSunday.getFullYear(),
            this.firstSunday.getMonth(),
            this.firstSunday.getDate() + 4,
            17
          );
        }
        this.yotamThursday.push(lesson);
        this.lessons.push(lesson);
      } else {
        const i = this.yotamThursday.length - 1;
        const lastLessonEnd = this.yotamThursday[i].end;

        lesson.start = new Date(lastLessonEnd.valueOf());
        lesson.end = new Date(lesson.start.valueOf());
        if (lesson.itsPrivateLesson) {
          lesson.end.setMinutes(lesson.end.getMinutes() + 45);
        } else {
          lesson.end.setMinutes(lesson.end.getMinutes() + 60);
        }
        this.yotamThursday.push(lesson);
        this.lessons.push(lesson);
      }
    }
  }

  scheduleWithYoni(lesson) {
    if (lesson.day == "שלישי") {
      if (!this.yoniTuesday.length) {
        lesson.start = new Date(
          this.firstSunday.getFullYear(),
          this.firstSunday.getMonth(),
          this.firstSunday.getDate() + 2,
          8
        );
        if (lesson.itsPrivateLesson) {
          lesson.end = new Date(
            this.firstSunday.getFullYear(),
            this.firstSunday.getMonth(),
            this.firstSunday.getDate() + 2,
            8,
            45
          );
        } else {
          lesson.end = new Date(
            this.firstSunday.getFullYear(),
            this.firstSunday.getMonth(),
            this.firstSunday.getDate() + 2,
            9
          );
        }
        this.yoniTuesday.push(lesson);
        this.lessons.push(lesson);
      } else {
        const i = this.yoniTuesday.length - 1;
        const lastLessonEnd = this.yoniTuesday[i].end;

        lesson.start = new Date(lastLessonEnd.valueOf());
        lesson.end = new Date(lesson.start.valueOf());
        if (lesson.itsPrivateLesson) {
          lesson.end.setMinutes(lesson.end.getMinutes() + 45);
        } else {
          lesson.end.setMinutes(lesson.end.getMinutes() + 60);
        }
        this.yoniTuesday.push(lesson);
        this.lessons.push(lesson);
      }
    } else if (lesson.day == "רביעי") {
      if (!this.yoniWednesday.length) {
        lesson.start = new Date(
          this.firstSunday.getFullYear(),
          this.firstSunday.getMonth(),
          this.firstSunday.getDate() + 3,
          8
        );
        if (lesson.itsPrivateLesson) {
          lesson.end = new Date(
            this.firstSunday.getFullYear(),
            this.firstSunday.getMonth(),
            this.firstSunday.getDate() + 3,
            8,
            45
          );
        } else {
          lesson.end = new Date(
            this.firstSunday.getFullYear(),
            this.firstSunday.getMonth(),
            this.firstSunday.getDate() + 3,
            9
          );
        }
        this.yoniWednesday.push(lesson);
        this.lessons.push(lesson);
      } else {
        const i = this.yoniWednesday.length - 1;
        const lastLessonEnd = this.yoniWednesday[i].end;

        lesson.start = new Date(lastLessonEnd.valueOf());
        lesson.end = new Date(lesson.start.valueOf());
        if (lesson.itsPrivateLesson) {
          lesson.end.setMinutes(lesson.end.getMinutes() + 45);
        } else {
          lesson.end.setMinutes(lesson.end.getMinutes() + 60);
        }
        this.yoniWednesday.push(lesson);
        this.lessons.push(lesson);
      }
    } else if (lesson.day == "חמישי") {
      if (!this.yoniThursday.length) {
        lesson.start = new Date(
          this.firstSunday.getFullYear(),
          this.firstSunday.getMonth(),
          this.firstSunday.getDate() + 4,
          8
        );
        if (lesson.itsPrivateLesson) {
          lesson.end = new Date(
            this.firstSunday.getFullYear(),
            this.firstSunday.getMonth(),
            this.firstSunday.getDate() + 4,
            8,
            45
          );
        } else {
          lesson.end = new Date(
            this.firstSunday.getFullYear(),
            this.firstSunday.getMonth(),
            this.firstSunday.getDate() + 4,
            9
          );
        }
        this.yoniThursday.push(lesson);
        this.lessons.push(lesson);
      } else {
        const i = this.yoniThursday.length - 1;
        const lastLessonEnd = this.yoniThursday[i].end;

        lesson.start = new Date(lastLessonEnd.valueOf());
        lesson.end = new Date(lesson.start.valueOf());
        if (lesson.itsPrivateLesson) {
          lesson.end.setMinutes(lesson.end.getMinutes() + 45);
        } else {
          lesson.end.setMinutes(lesson.end.getMinutes() + 60);
        }
        this.yoniThursday.push(lesson);
        this.lessons.push(lesson);
      }
    }
  }

  scheduleWithJoni(lesson) {
    if (lesson.day == "שלישי") {
      if (!this.joniTuesday.length) {
        lesson.start = new Date(
          this.firstSunday.getFullYear(),
          this.firstSunday.getMonth(),
          this.firstSunday.getDate() + 2,
          10
        );
        if (lesson.itsPrivateLesson) {
          lesson.end = new Date(
            this.firstSunday.getFullYear(),
            this.firstSunday.getMonth(),
            this.firstSunday.getDate() + 2,
            10,
            45
          );
        } else {
          lesson.end = new Date(
            this.firstSunday.getFullYear(),
            this.firstSunday.getMonth(),
            this.firstSunday.getDate() + 2,
            11
          );
        }
        this.joniTuesday.push(lesson);
        this.lessons.push(lesson);
      } else {
        const i = this.joniTuesday.length - 1;
        const lastLessonEnd = this.joniTuesday[i].end;

        lesson.start = new Date(lastLessonEnd.valueOf());
        lesson.end = new Date(lesson.start.valueOf());
        if (lesson.itsPrivateLesson) {
          lesson.end.setMinutes(lesson.end.getMinutes() + 45);
        } else {
          lesson.end.setMinutes(lesson.end.getMinutes() + 60);
        }
        this.joniTuesday.push(lesson);
        this.lessons.push(lesson);
      }
    } else if (lesson.day == "ראשון") {
      if (!this.joniSunday.length) {
        lesson.start = new Date(
          this.firstSunday.getFullYear(),
          this.firstSunday.getMonth(),
          this.firstSunday.getDate(),
          10
        );
        if (lesson.itsPrivateLesson) {
          lesson.end = new Date(
            this.firstSunday.getFullYear(),
            this.firstSunday.getMonth(),
            this.firstSunday.getDate(),
            10,
            45
          );
        } else {
          lesson.end = new Date(
            this.firstSunday.getFullYear(),
            this.firstSunday.getMonth(),
            this.firstSunday.getDate(),
            11
          );
        }
        this.joniSunday.push(lesson);
        this.lessons.push(lesson);
      } else {
        const i = this.joniSunday.length - 1;
        const lastLessonEnd = this.joniSunday[i].end;

        lesson.start = new Date(lastLessonEnd.valueOf());
        lesson.end = new Date(lesson.start.valueOf());
        if (lesson.itsPrivateLesson) {
          lesson.end.setMinutes(lesson.end.getMinutes() + 45);
        } else {
          lesson.end.setMinutes(lesson.end.getMinutes() + 60);
        }
        this.joniSunday.push(lesson);
        this.lessons.push(lesson);
      }
    } else if (lesson.day == "חמישי") {
      if (!this.joniThursday.length) {
        lesson.start = new Date(
          this.firstSunday.getFullYear(),
          this.firstSunday.getMonth(),
          this.firstSunday.getDate() + 4,
          10
        );
        if (lesson.itsPrivateLesson) {
          lesson.end = new Date(
            this.firstSunday.getFullYear(),
            this.firstSunday.getMonth(),
            this.firstSunday.getDate() + 4,
            10,
            45
          );
        } else {
          lesson.end = new Date(
            this.firstSunday.getFullYear(),
            this.firstSunday.getMonth(),
            this.firstSunday.getDate() + 4,
            11
          );
        }
        this.joniThursday.push(lesson);
        this.lessons.push(lesson);
      } else {
        const i = this.joniThursday.length - 1;
        const lastLessonEnd = this.joniThursday[i].end;

        lesson.start = new Date(lastLessonEnd.valueOf());
        lesson.end = new Date(lesson.start.valueOf());
        if (lesson.itsPrivateLesson) {
          lesson.end.setMinutes(lesson.end.getMinutes() + 45);
        } else {
          lesson.end.setMinutes(lesson.end.getMinutes() + 60);
        }
        this.joniThursday.push(lesson);
        this.lessons.push(lesson);
      }
    }
  }

  setFewLessonsTheSameDay(student, guide, day) {
    if (guide == "Yoni") {
      for (let i = 0; i < student.maxLessonsPerAvailableDay; i++) {
        if (this.isYoniFull(day)) break;

        this.scheduleWithYoni(
          new Lesson(student.fullName, guide, student.swimmingType, true, day)
        );
        student.lessonsLeftThisWeek--;
        if (student.lessonsLeftThisWeek == 0) break;
      }
    } else if (guide == "Joni") {
      for (let i = 0; i < student.maxLessonsPerAvailableDay; i++) {
        if (this.isJoniFull(day, false)) break;
        console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDdd")
        this.scheduleWithJoni(
          new Lesson(student.fullName, guide, student.swimmingType, true, day)
        );
        student.lessonsLeftThisWeek--;
        if (student.lessonsLeftThisWeek == 0) break;
      }
    } else {
      for (let i = 0; i < student.maxLessonsPerAvailableDay; i++) {
        if (this.isYotamFull(day)) break;
        this.scheduleWithYotam(
          new Lesson(student.fullName, guide, student.swimmingType, true, day)
        );
        student.lessonsLeftThisWeek--;
        if (student.lessonsLeftThisWeek == 0) break;
      }
    }
  }

  isYoniFull(day, itsGroup) {
    let i = 0;
    let lastLessonEnd = null;
    if (day == "שלישי" && this.yoniTuesday.length != 0) {
      i = this.yoniTuesday.length - 1;
      lastLessonEnd = this.yoniTuesday[i].end;
    } else if (day == "רביעי" && this.yoniWednesday.length != 0) {
      i = this.yoniWednesday.length - 1;
      lastLessonEnd = this.yoniWednesday[i].end;
    } else if (day == "חמישי" && this.yoniThursday.length != 0) {
      i = this.yoniThursday.length - 1;
      lastLessonEnd = this.yoniThursday[i].end;
    }
    if (lastLessonEnd == null) return false; // because this day is empty
    if (
      i != 0 &&
      (lastLessonEnd.toLocaleTimeString() == "14:30:00" ||
        lastLessonEnd.toLocaleTimeString() == "14:45:00" ||
        lastLessonEnd.toLocaleTimeString() == "15:00:00")
    ) {
      return true;
    } else if (itsGroup && lastLessonEnd.toLocaleTimeString == "14:15:00") {
      return true;
    } else return false;
  }

  isJoniFull(day, itsGroup) {
    let i = -1;
    let lastLessonEnd = null;
    if (day == "ראשון" && this.joniSunday.length != 0) {
      i = this.joniSunday.length - 1;
      lastLessonEnd = this.joniSunday[i].end;
    } else if (day == "שלישי" && this.joniTuesday.length != 0) {
      i = this.joniTuesday.length - 1;
      lastLessonEnd = this.joniTuesday[i].end;
    } else if (day == "חמישי" && this.joniThursday.length != 0) {
      i = this.joniThursday.length - 1;
      lastLessonEnd = this.joniThursday[i].end;
    }
    //console.log("i is: ", i)
    if (lastLessonEnd == null) return false; // because this day is empty
    if (
      i != 0 &&
      (lastLessonEnd.toLocaleTimeString() == "18:30:00" ||
        lastLessonEnd.toLocaleTimeString() == "18:45:00" ||
        lastLessonEnd.toLocaleTimeString() == "19:00:00")
    ) {
      return true;
    } else if (itsGroup && lastLessonEnd.toLocaleTimeString == "18:15:00") {
      return true;
    } else return false;
  }

  isYotamFull(day, itsGroup) {
    let i = 0;
    let lastLessonEnd = null;
    if (day == "שני" && this.yotamMonday.length != 0) {
      i = this.yotamMonday.length - 1;
      lastLessonEnd = this.yotamMonday[i].end;
    } else if (day == "חמישי" && this.yotamThursday.length != 0) {
      i = this.yotamThursday.length - 1;
      lastLessonEnd = this.yotamThursday[i].end;
    }
    if (lastLessonEnd == null) return false; // because this day is empty
    if (
      i != 0 &&
      (lastLessonEnd.toLocaleTimeString() == "19:30:00" ||
        lastLessonEnd.toLocaleTimeString() == "19:45:00" ||
        lastLessonEnd.toLocaleTimeString() == "20:00:00")
    ) {
      return true;
    } else if (itsGroup && lastLessonEnd.toLocaleTimeString == "19:15:00") {
      return true;
    } else return false;
  }

  groupsSort() {
    this.setGroups("גב", this.waitingForBackstrokeGroup);
    this.setGroups("חזה", this.waitingForBreaststrokeGroup);
    this.setGroups("פרפר", this.waitingForButterflyStrokeGroup);
    this.setGroups("חתירה", this.waitingForFrontCrawlGroup);
  }

  setGroups(swimmingType, waitings) {
    const sunday = [];
    const monday = [];
    const tuesday = [];
    const wednesday = [];
    const thursday = [];

    waitings.forEach((student) => {
      if (student.availableDays.includes("ראשון")) {
        sunday.push(student);
      }
      if (student.availableDays.includes("שני")) {
        monday.push(student);
      }
      if (student.availableDays.includes("שלישי")) {
        tuesday.push(student);
      }
      if (student.availableDays.includes("רביעי")) {
        wednesday.push(student);
      }
      if (student.availableDays.includes("חמישי")) {
        thursday.push(student);
      }
    });
    const daysArray = [sunday, monday, tuesday, wednesday, thursday];
    const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי"];

    for (let i = 0; i < 5; i++) {
      let dayLength = daysArray[i].length;
      if (dayLength != 0) {
        if (dayLength < 3 && dayLength > 0) {
          daysArray[i].forEach((student) => {
            if (student.lessonType = "GroupPreference"){
                student.lessonType = "private";
                this.schedule(student)
            } else {
            this.conflicts.push({
              student: student,
              conflict: `אין מספיק נרשמים לשחיית ${swimmingType} ביום ${days[i]} לפתיחת קבוצה עבור התלמיד ${student.fullName}`,
            });
        }
          });
        } else {
          let numOfGroups = 0;
          if (dayLength % 7 == 0) {
            numOfGroups = dayLength / 7;
          } else {
            numOfGroups = parseInt(dayLength / 7) + 1;
          }
          let minLessonsPerDay = 100;
          daysArray[i].forEach((student) => {
            // find the minimum number of lessons a day
            if (student.maxLessonsPerAvailableDay < minLessonsPerDay) {
              minLessonsPerDay = student.maxLessonsPerAvailableDay;
            }
          });

          let numOfPeopleInGroup = parseInt(dayLength / numOfGroups);
          let slicer = 0;
          for (let j = 1; j <= numOfGroups; j++) {
            //create "j" groups
            let groupMembers;
            if (slicer + numOfPeopleInGroup + 1 >= daysArray[i].length) {
              groupMembers = daysArray[i].slice(slicer, daysArray[i].length);
            } else {
              groupMembers = daysArray[i].slice(
                slicer,
                slicer + numOfPeopleInGroup
              );
              slicer += numOfPeopleInGroup;
            }
            const group = new Group(
              swimmingType + (this.groups.length + 1),
              groupMembers,
              swimmingType
            );
            console.log(
              "#######################################################",
              days[i]
            );
            this.groups.push(group);
            for (let k = 0; k < minLessonsPerDay; k++) {
              let stopLessons = false;
              groupMembers.forEach((student) => {
                console.log(student.fullName, " ", student.lessonsLeftThisWeek);
                if (student.lessonsLeftThisWeek == 0) stopLessons = true;
              });
              if (stopLessons) break;
              if (
                !this.isJoniFull(days[i], true) &&
                (days[i] == "ראשון" || days[i] == "שלישי" || days[i] == "חמישי")
              ) {
                this.scheduleWithJoni(
                  new Lesson(group.name, "Joni", swimmingType, false, days[i])
                );
                this.decOneDay(groupMembers);
              } else if (
                !this.isYotamFull(days[i], true) &&
                (days[i] == "שני" || days[i] == "חמישי")
              ) {
                this.scheduleWithYotam(
                  new Lesson(group.name, "Yotam", swimmingType, false, days[i])
                );
                this.decOneDay(groupMembers);
              } else if (
                !this.isYoniFull(days[i], true) &&
                (swimmingType == "חזה" || swimmingType == "פרפר") &&
                (days[i] == "שלישי" || days[i] == "רביעי" || days[i] == "חמישי")
              ) {
                this.scheduleWithYoni(
                  new Lesson(group.name, "Yoni", swimmingType, false, days[i])
                );
                this.decOneDay(groupMembers);
              }
            }
          }
        }
      }
    }
    daysArray.forEach((dayArr) => {
      dayArr.forEach((student) => {
        let flag = 0;
        this.conflicts.forEach((conflict) => {
          if (conflict.student === student) flag = 1;
        });
        if (student.lessonsLeftThisWeek > 0 && flag == 0) {
          this.conflicts.push({
            student: student,
            conflict: `לא נמצאה קבוצה לתלמיד ${student.fullName} לפי מבוקשו. חסרים ${student.lessonsLeftThisWeek} שיעורים מתוך ${student.totalLessons} בסה"כ.`,
          });
        }
      });
    });
  }

  decOneDay(groupMembers) {
    groupMembers.forEach((student) => {
      student.lessonsLeftThisWeek--;
      console.log(
        "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
        student.lessonsLeftThisWeek
      );
    });
  }
}

export default weekSchedule;
