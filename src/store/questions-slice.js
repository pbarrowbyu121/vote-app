import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "questions",
  initialState: { questions: [] },
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload.payload;
    },
  },
});

// export const questionsActions = questionsSlice.actions;
export default questionsSlice;
