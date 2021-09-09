import { createStore } from "redux";
// import redux from "redux";

const initialPoll = {
  question: "The question will go here?",
  options: [
    {
      id: 1,
      text: "Yes",
      count: 2,
    },
    {
      id: 2,
      text: "No",
      count: 3,
    },
    {
      id: 3,
      text: "Undecided",
      count: 7,
    },
  ],
  totalVotes: 12,
};

const pollReducer = (state = initialPoll, action) => {
  if (action.type === "option1") {
    const otherOptions = state.options.filter((option) => option.id !== 1);
    let option1 = state.options.filter((option) => option.id === 1)[0];

    option1 = { ...option1, count: option1.count + 1 };
    state.options = [...otherOptions, option1].sort((a, b) =>
      a.id > b.id ? 1 : -1
    );

    state.totalVotes++;
  }
  if (action.type === "option2") {
    const otherOptions = state.options.filter((option) => option.id !== 2);
    let option = state.options.filter((option) => option.id === 2)[0];

    option = { ...option, count: option.count + 1 };
    state.options = [...otherOptions, option].sort((a, b) =>
      a.id > b.id ? 1 : -1
    );

    state.totalVotes++;
  }
  if (action.type === "option3") {
    const otherOptions = state.options.filter((option) => option.id !== 3);
    let option = state.options.filter((option) => option.id === 3)[0];

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
