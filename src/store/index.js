import { configureStore } from "@reduxjs/toolkit";
import questionsSlice from "./questions-slice";
import optionsSlice from "./options-slice";

const store = configureStore({
  reducer: {
    questions: questionsSlice.reducer,
    options: optionsSlice.reducer,
  },
});

export default store;
