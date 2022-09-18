import { createSlice } from "@reduxjs/toolkit";

const ConflictsSlice = createSlice({
    name: 'lessons',
    initialState: {
        all: []
    },
    reducers: {
        addConflict: (state, action) => {
            state.all.push(action.payload.obj);
        },
        removeConflict: (state, action) => {
            state.all.splice(state.ids.indexOf(action.payload.obj), 1)
        },
    }
});

export const addConflict = ConflictsSlice.actions.addConflict;
export const removeConflict = ConflictsSlice.actions.removeConflict;
export default ConflictsSlice.reducer;