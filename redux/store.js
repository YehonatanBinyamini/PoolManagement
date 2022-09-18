import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./students";
import lessonsReducer from "./lessons";
import conflictsReducer from "./conflicts";
import i18nReducer from "./i18n"

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  reducer: {
    students: studentsReducer,
    lessons: lessonsReducer,
    conflicts: conflictsReducer,
    i18n: i18nReducer,
  },
});
