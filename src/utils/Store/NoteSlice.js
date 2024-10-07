import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notesList: []
  },
  reducers: {
    getNotesToList: (state, action) => {
        state.notesList = action.payload;
    },
    removeNoteFromList: (state, action) => {
      state.notesList = state.notesList?.filter(item => item._id !== action.payload._id);
    },
    archiveNoteFromList: (state, action) => {
      state.notesList = state.notesList.filter(item => item._id !== action.payload._id);
    },
    addNoteToList: (state, action) => {
      state.notesList.push(action.payload)
    }
  },
});

export const { getNotesToList, removeNoteFromList, archiveNoteFromList, addNoteToList } = noteSlice.actions;
export default noteSlice.reducer;