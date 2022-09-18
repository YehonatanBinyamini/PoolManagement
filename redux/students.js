import { createSlice } from "@reduxjs/toolkit";

const StudentsSlice = createSlice({
    name: 'students',
    initialState: {
        all: []
    },
    reducers: {
        addStudent: (state, action) => {
            state.all.push(action.payload.obj);
        },
        removeStudent: (state, action) => {
            state.all.splice(state.ids.indexOf(action.payload.obj), 1)
        },
    }
});

export const addStudent = StudentsSlice.actions.addStudent;
export const removeStudent = StudentsSlice.actions.removeStudent;
export default StudentsSlice.reducer;