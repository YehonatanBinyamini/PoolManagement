class Lesson {
  static IDindex = 1;
  static groupIndex = 1;

  constructor(
    participantsIDs,
    name,
    guide,
    swimmingType,
    itsPrivateLesson,
    day,
    start,
    end
  ) {
    const guides = { Yotam: "יותם", Yoni: "יוני", Joni: "ג'וני" };
    this.swimmingList = {
      חתירה: "front Crawl",
      חזה: "breaststroke",
      פרפר: "butterflystroke",
      גב: "backstroke",
      Back: "backstroke",
      "Front Crawl": "front Crawl",
      Breast: "breaststroke",
      Butterfly: "butterflystroke",
    };

    this.days = {
      ראשון: "sunday",
      שני: "monday",
      שלישי: "tuesday",
      רביעי: "wednesday",
      חמישי: "thursday",
    };

    this.participantsIDs = participantsIDs;
    this.id = Lesson.IDindex++;
    this.name = name; // student or group
    this.guide = guide;
    this.guideHebrew = guides[guide];
    this.swimmingType = swimmingType;
    this.itsPrivateLesson = itsPrivateLesson;
    this.day = day;
    this.start = start;
    this.end = end;
    console.log(this.swimmingType);
    console.log(this.swimmingList);
    console.log(this.swimmingList[this.swimmingType]);
  }

  toString() {
    if (this.itsPrivateLesson)
      return `שיעור פרטי ל${this.name} ביום ${this.day} עם המדריך ${this.guideHebrew} בשחיית ${this.swimmingType}`;
    else
      return `שיעור קבוצתי ל${this.name} בשחיית ${this.swimmingType} ביום ${this.day}`;
  }
  toStringEn() {
    if (this.itsPrivateLesson)
      return `A private lesson for ${this.nameEn}, ${
        this.days[this.day]
      } with the guide ${this.guide} in ${
        this.swimmingList[this.swimmingType]
      }`;
    else
      return `A group lesson for ${this.nameEn} in ${
        this.swimmingList[this.swimmingType]
      } in 
      ${this.days[this.day]}`;
  }
}

export default Lesson;
