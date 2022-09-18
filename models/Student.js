import {hourIndex} from "../constants/Variables"


class Student {
  static index = 1;
  constructor(fullName, availableDays, hours, swimmingStyleArray, lessonType, totalLessons, maxLessonsPerAvailableDay) {
    this.id = Student.index++;
    this.fullName = fullName;
    this.availableDays = availableDays;
    this.hours = hours;
    this.swimmingStyleArray = swimmingStyleArray;
    this.lessonType = lessonType;       //private or group
    this.totalLessons = totalLessons;
    this.lessonsCounterPerDay = 0;
    this.maxLessonsPerAvailableDay = maxLessonsPerAvailableDay;
    this.lessonsLeftThisWeek = Math.min((maxLessonsPerAvailableDay * availableDays.length), totalLessons);
    this.totalAvailableTime = this.calculateAvailableTime();
  }
  calculateAvailableTime(){
    let sum = 0;
    if (this.availableDays.includes("ראשון")){
      sum += (hourIndex[this.hours["sunday"]["end"]] - hourIndex[this.hours["sunday"]["start"]])
    }
    if (this.availableDays.includes("שני")){
      sum += (hourIndex[this.hours["monday"]["end"]] - hourIndex[this.hours["monday"]["start"]])
    }
    if (this.availableDays.includes("שלישי")){
      sum += (hourIndex[this.hours["tuesday"]["end"]] - hourIndex[this.hours["tuesday"]["start"]])
    }
    if (this.availableDays.includes("רביעי")){
      sum += (hourIndex[this.hours["wednesday"]["end"]] - hourIndex[this.hours["wednesday"]["start"]])
    }
    if (this.availableDays.includes("חמישי")){
      sum += (hourIndex[this.hours["thursday"]["end"]] - hourIndex[this.hours["thursday"]["start"]])
    }
    return sum;
  }
}

export default Student;
