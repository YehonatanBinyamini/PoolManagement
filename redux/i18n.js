import { createSlice } from "@reduxjs/toolkit";
import { defaultLang, supportedLangs } from "../language/choice";

const initialState = {
  lang: defaultLang, // "he" when app loads
  supportedLangs: { ...supportedLangs },

  translations: {
    en: {
      scheduling: "Scheduling",
      to: "to",
      submit: "Submit",
      password: "Password",
      email: "Email",
      connect: "Connect",
      login: "Login",
      conflicts: "Conflicts",
      schedulingTable: "Scheduling Table",
      fullName: "Full Name",
      totalLessons: "Total Lessons",
      maxLessonsPerDay: "Maximum Lessons Per Day",
      availableDays: "Available Days",
      sunday: "Sun",
      monday: "Mon",
      tuesday: "Tue",
      wednesday: "Wed",
      thursday: "Thu",
      frontCrawl: "Front Crawl",
      breaststroke: "Breast",
      butterflyStroke: "Butterfly",
      backstroke: "Back",
      private: "Private",
      group: "Group",
      privatePreference: "Prefer Private",
      groupPreference: "Prefer Group",
      swimmingStyle: "Swimming Style",
      lessonType: "Lesson Type",
      choose: "choose",
      theStudent: "The student ",
      wasAddedSuccessfully: " was added successfully",
      close: "close",
      lessonNumberError: "*****Number of lessons per day is invalid",
      daysPickError: "*****choosing days is required",
      fullNameError: "*****Full name is required",
      maxLessonsError: "*****The maximum lessons number is invalid",
      successSchedule: "The scheduling was created successfully",
      schedulingNotCreated: "The scheduling wasn't created",
      addingStudentsToProgram: "You need to add students to the system first",
      priority1: "priority 1:",
      priority2: "priority 2:",
      priority3: "priority 3:",
      priority4: "priority 4:",
      homeTitle: "Home",
      addStudent: "Add Student",
      thereIsConflicts: "There is conflicts",
      lookAtTheConflicts: "Press on 'Conflicts' to see them",
      ganttChart: "Gantt Chart",
      noConflicts: "No Conflicts",
      noData: "No Data",
    },
    he: {
      scheduling: "?????? ??????????",
      to: "????",
      submit: "??????????",
      password: "??????????",
      email: "???????? ????????????????",
      connect: "??????????",
      login: "??????????????",
      conflicts: "????????????????????",
      schedulingTable: "???????? ??????????????",
      fullName: "???? ??????",
      totalLessons: '???????? ?????????????? ????"??',
      maxLessonsPerDay: "???????? ?????????????? ?????????????? ????????",
      availableDays: "???????? ?????????? ????????",
      sunday: "??????????",
      monday: "??????",
      tuesday: "??????????",
      wednesday: "??????????",
      thursday: "??????????",
      frontCrawl: "??????????",
      breaststroke: "??????",
      butterflyStroke: "????????",
      backstroke: "????",
      private: "????????",
      group: "????????????",
      privatePreference: "?????????? ????????",
      groupPreference: "?????????? ????????????",
      swimmingStyle: "?????????? ??????????",
      lessonType: "?????????? ????????????",
      choose: "??????",
      theStudent: "???????????? ",
      wasAddedSuccessfully: " ???????? ????????????",
      close: "????????",
      lessonNumberError: "*****???????? ???????????????? ???????? ???? ????????",
      daysPickError: "*****???? ?????????? ????????",
      fullNameError: "*****???? ?????? ?????? ?????? ????????",
      maxLessonsError: "*****???????? ?????????????? ?????????????? ???? ????????",
      successSchedule: "???????????? ???????? ????????????",
      schedulingNotCreated: "???? ???????? ??????????",
      addingStudentsToProgram: "???? ???????????? ?????????????? ????????????",
      priority1: "???????????? 1:",
      priority2: "???????????? 2:",
      priority3: "???????????? 3:",
      priority4: "???????????? 4:",
      homeTitle: "?????? ????????",
      addStudent: "?????????? ??????????",
      thereIsConflicts: "?????????? ????????????????????",
      lookAtTheConflicts: "?????? ???? '????????????????????' ?????? ??????????",
      ganttChart: "?????????? ????????",
      noConflicts: "?????? ????????????????????",
      noData: "?????? ????????????",
    },
  },
};

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const selectTranslations = (state) =>
  state.i18n.translations[state.i18n.lang];

export const { setLang } = i18nSlice.actions;
export default i18nSlice.reducer;
