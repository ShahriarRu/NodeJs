import React from "react";
import Signup from "./Signup";

import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "../redux/store";

import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Search from "./Search";
import Details from "./Details";
import Rating from "./Rating";

import "./index.css";

function App() {
  return (
    <div>
      <Provider store={configureStore()}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              {/* search */}
              <PrivateRoute path="/search" component={Search} />
              <PrivateRoute path="/details" component={Details} />
              {/* rating */}
              <PrivateRoute path="/rating" component={Rating} />
              {/* <PrivateRoute path="/search" component={Search} /> */}
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
