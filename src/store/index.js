import { createStore, combineReducers } from "redux";

const initialPoll = {
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
  totalVotes: 0,
};

const voteReducer = (state = initialPoll, action) => {
  if (action.type === "vote") {
    // console.log("vote", action);
    const otherOptions = state.options.filter(
      (option) => option.id !== +action.optionId
    );
    let option = state.options.find((option) => option.id === +action.optionId);

    option = { ...option, count: option.count + 1 };
    state.options = [...otherOptions, option].sort((a, b) =>
      a.id > b.id ? 1 : -1
    );

    state.totalVotes++;
  }

  if (action.type === "add-option") {
    console.log("new option", action.newOption);
    state.options = [...state.options, action.newOption];
    state.totalVotes++;
  }
  return {
    ...state,
  };
};

const store = createStore(voteReducer);

export default store;
