// import logo from './logo.svg';
import "./App.css";
import PollList from "./components/PollList";
import AddPoll from "./components/AddPoll";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "./store/index";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Provider store={store}>
      <PollList />
      <AddPoll />
    </Provider>
  );
}

export default App;
