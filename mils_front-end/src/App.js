import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./style.scss"
import LoadingSpinner from "./components/LoadingSpinner";
import MainLayout from "./layout/MainLayout";
import LoginScreen from "./screens/loginScreen";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  render() {
    return (
      <Suspense
        fallback={<LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />}
      >
        <Router>
          <Switch>
            <Route path={"/"} component={MainLayout} exact />
            <Route path={"/login"} component={LoginScreen} exact />
          </Switch>
        </Router>
        {/* <LoginScreen /> */}
      </Suspense>
    );
  }
}

export default App;
