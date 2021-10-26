import "./App.css";
import PollList from "./components/PollList";
import AddPoll from "./components/AddPoll";
import "bootstrap/dist/css/bootstrap.css";

import { useEffect } from "react";
import { getQuestions, getOptions } from "./helpers";
import questionsSlice from "./store/questions-slice";
import { useDispatch } from "react-redux";
import optionsSlice from "./store/options-slice";

function App() {
  const dispatch = useDispatch();
  // USE THIS FOR REDUX TOOLKIT
  useEffect(() => {
    getQuestions().then((response) => {
      dispatch(questionsSlice.actions.setQuestions(response || []));
    });

    getOptions().then((response) => {
      dispatch(optionsSlice.actions.setOptions(response || []));
    });
  }, [dispatch]);

  //
  // USE THIS FOR REDUX
  // useEffect(() => {
  //   getQuestions().then((response) => {
  //     dispatch(
  //       { type: "setQuestions", questions: response || [] }
  //     );
  //   });

  //   getOptions().then((response) => {
  //     dispatch({ type: "setOptions", options: response || [] });
  //   });
  // }, [dispatch]);

  return (
    <div>
      <PollList />
      <AddPoll />
    </div>
  );
}

export default App;
