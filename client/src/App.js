import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from "react-redux"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import store from "./redux/store";
import PrivateRoute from "./components/Private/PrivateRoutes";
import Dashboard from "./components/Dashboard";
import RouteLinks from "./components/Private/ReactLinks";
import CreateBlog from "./components/CreateBlog";


function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <RouteLinks exact path="/register" component={Register} />
            <RouteLinks exact path="/login" component={Login} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/createblog" exact component={CreateBlog} />
          </Switch>
        </Router>
      </Provider>
    </>
  );
}

export default App;
