import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notesList: []
  },
  reducers: {
    addNoteToList: (state, action) => {
        state.notesList.push(action.payload);
    },
    removeNoteFromList: (state, action) => {
      console.log("deleted the node", action.payload);
      state.notesList = state.notesList?.filter(item => item._id !== action.payload._id);
    },
    archiveNoteFromList: (state, action) => {
      state.notesList = state.notesList.filter(item => item !== action.payload);
    }
  },
});

export const { addNoteToList, removeNoteFromList, archiveNoteFromList } = noteSlice.actions;
export default noteSlice.reducer;