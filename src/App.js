// import logo from './logo.svg';
import "./App.css";
import Poll from "./components/Poll";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "./store/index";

function App() {
  return (
    <Provider store={store}>
      <Poll />;
    </Provider>
  );
}

export default App;
