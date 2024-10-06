import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./NoteSlice";


const appStore = configureStore({
  reducer: {
    notes: noteSlice,
  },
});

export default appStore;