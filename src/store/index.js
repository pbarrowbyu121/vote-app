import { configureStore } from "@reduxjs/toolkit";
import questionsSlice from "./questions-slice";
import optionsSlice from "./options-slice";
import { createStore } from "redux";

// USE THIS FOR REDUX TOOLKIT
const store = configureStore({
  reducer: {
    questions: questionsSlice.reducer,
    options: optionsSlice.reducer,
  },
});

// USE THIS FOR REDUX
// const pollReducer = (state = { questions: [], options: [] }, action) => {
//   if (action.type === "setQuestions") {
//     return {
//       questions: action.questions,
//       options: state.options,
//     };
//   }
//   if (action.type === "setOptions") {
//     return {
//       questions: state.questions,
//       options: action.options,
//     };
//   }
//   return state;
// };

// const store = createStore(pollReducer);

// const pollSubscriber = () => {
//   const latestState = store.getState();
// };

// store.subscribe(pollSubscriber);

export default store;
