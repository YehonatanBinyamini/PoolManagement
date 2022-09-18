import { createSlice } from "@reduxjs/toolkit";

const LessonsSlice = createSlice({
    name: 'lessons',
    initialState: {
        all: []
    },
    reducers: {
        addLesson: (state, action) => {
            state.all.push(action.payload.obj);
        },
        removeLesson: (state, action) => {
            state.all.splice(state.ids.indexOf(action.payload.obj), 1)
        },
    }
});

export const addLesson = LessonsSlice.actions.addLesson;
export const removeLesson = LessonsSlice.actions.removeLesson;
export default LessonsSlice.reducer;