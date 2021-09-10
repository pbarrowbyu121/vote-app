import { createStore } from "redux";

const initialPoll = {
  questions: [
    {
      id: 1,
      question: "Do you agree?",
      options: [
        {
          id: 1,
          text: "Yes",
          count: 0,
        },
        {
          id: 2,
          text: "No",
          count: 0,
        },
        {
          id: 3,
          text: "Undecided",
          count: 0,
        },
      ],
    },
  ],
};

const voteReducer = (state = initialPoll, action) => {
  if (action.type === "vote") {
    const otherQuestions = state.questions.filter(
      (question) => question.id !== action.questionId
    );
    const questionObj = state.questions.find(
      (question) => question.id === action.questionId
    );

    const otherOptions = questionObj.options.filter(
      (option) => option.id !== +action.optionId
    );
    let option = questionObj.options.find(
      (option) => option.id === +action.optionId
    );

    option = { ...option, count: option.count + 1 };
    questionObj.options = [...otherOptions, option].sort((a, b) =>
      a.id > b.id ? 1 : -1
    );

    state.questions = [...otherQuestions, questionObj].sort((a, b) =>
      a.id > b.id ? 1 : -1
    );
  }

  if (action.type === "add-option") {
    const otherQuestions = state.questions.filter(
      (question) => question.id !== action.questionId
    );

    const questionObj = state.questions.find(
      (question) => question.id === action.questionId
    );

    questionObj.options = [...questionObj.options, action.newOption];

    state.questions = [...otherQuestions, questionObj];
  }

  if (action.type === "add-question") {
    state.questions = [...state.questions, action.newQuestion];
  }

  return {
    ...state,
  };
};

const store = createStore(voteReducer);

export default store;
