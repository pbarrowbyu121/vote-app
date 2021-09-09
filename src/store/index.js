import { createStore } from "redux";

const initialPoll = {
  question: "The question will go here?",
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
  totalVotes: 0,
};

const pollReducer = (state = initialPoll, action) => {
  if (action.type === "vote") {
    const otherOptions = state.options.filter(
      (option) => option.id !== action.optionId
    );
    let option = state.options.filter(
      (option) => option.id === action.optionId
    )[0];

    option = { ...option, count: option.count + 1 };
    state.options = [...otherOptions, option].sort((a, b) =>
      a.id > b.id ? 1 : -1
    );

    state.totalVotes++;
  }
  return {
    ...state,
  };
};

const store = createStore(pollReducer);

export default store;
