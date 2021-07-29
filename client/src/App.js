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
import Editname from "./components/Editname";
import Changepassword from "./components/Changepassword";
import DetailPost from "./components/DetailPost";


function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home/:page?" component={Home} />
            <Route exact path="/detail/:id" component={DetailPost} />
            <RouteLinks exact path="/register" component={Register} />
            <RouteLinks exact path="/login" component={Login} />
            <PrivateRoute path="/dashboard/:page?" exact component={Dashboard} />
            <PrivateRoute path="/createblog" exact component={CreateBlog} />
            <PrivateRoute path="/edit_name" exact component={Editname} />
            <PrivateRoute path="/edit_password" exact component={Changepassword} />
          </Switch>
        </Router>
      </Provider>
    </>
  );
}

export default App;
