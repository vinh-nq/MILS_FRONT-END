import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/js/all.js";
import LoadingSpinner from "./components/LoadingSpinner";
import MainRouteWrapper from "./layout/MainRouteWrapper";
import LoginScreen from "./screens/loginScreen";
import Page404 from "./components/404Page";
import { PATH } from "./routers/Path";
import MenuRedirect from "./components/MenuRedirect";

class App extends React.Component {
  render() {
    return (
      <Suspense
        fallback={<LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />}
      >
        <Router>
          <Switch>
            <Route path={"/login"} component={LoginScreen} exact />
            <MainRouteWrapper
              component={MenuRedirect}
              path={["/system", "/", PATH.HOUSEHOLD_MANAGEMENT]}
              exact
            />
            <MainRouteWrapper
              component={MenuRedirect}
              path="/system/demo1"
              exact
            />

            <MainRouteWrapper
              component={() => <div>AAA</div>}
              path={`${PATH.HOUSEHOLD_MANAGEMENT}/householdregistration`}
              exact
            />
            <MainRouteWrapper
              component={() => <div>AAA</div>}
              path={`${PATH.HOUSEHOLD_MANAGEMENT}/householdPoverty`}
              exact
            />
            <MainRouteWrapper
              component={() => <div>AAA</div>}
              path={`${PATH.HOUSEHOLD_MANAGEMENT}/genarationOfPMT`}
              exact
            />
            {/* <MainRouteWrapper component={Page404} path="/" exact /> */}
            {/* <MainRouteWrapper component={Page404} path={PATH.DATA_DICTIONARY} />
            <MainRouteWrapper
              component={Page404}
              path={PATH.HOUSEHOLD_MANAGEMENT}
            />
            <MainRouteWrapper component={Page404} path={PATH.CCT_PROGRAM} />
            <MainRouteWrapper component={Page404} path={PATH.PAYMENT} />
            <MainRouteWrapper
              component={Page404}
              path={PATH.GRIEVANCE_MANAGEMENT}
            />
            <MainRouteWrapper component={Page404} path={PATH.REPORT_BI} />
            <MainRouteWrapper component={Page404} path={PATH.SMS_BROADCAST} /> */}
            <Route component={Page404} />
          </Switch>
        </Router>
      </Suspense>
    );
  }
}

export default App;
