import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Provider} from "react-redux"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import store from "./redux/store";


function App() {
  return (
    <>
      {/* <Provider store = {store}> */}
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      {/* </Provider> */}
    </>
  );
}

export default App;
