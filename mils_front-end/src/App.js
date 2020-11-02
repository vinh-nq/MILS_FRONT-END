import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./style.scss";
import LoadingSpinner from "./components/LoadingSpinner";
// import MainLayout from "./layout/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "@fortawesome/fontawesome-free/js/all.js";
import MainRouteWrapper from "./layout/MainRouteWrapper";
import LoginScreen from "./screens/loginScreen";
import Page404 from "./components/404Page";
import Page403 from "./components/403Page";
import { PATH } from "./routers/Path";
import MenuRedirect from "./components/MenuRedirect";
import ManageAssessment from "./screens/householdManagement/ManageAssessment";
import RoleManagement from "./screens/system/RoleManagement";
import FunctionManagement from "./screens/system/FunctionManagement";
import PermissionManagement from "./screens/system/PermissionManagement";
import UserManagement from "./screens/system/UserManagement";
import AddHouseHold from "./screens/householdManagement/AddHouseHold";
import DetailBeneficiary from "./screens/householdManagement/ManageAssessment/component/DetailBeneficiary";
import UpdateHousehold from "./screens/householdManagement/UpdateHousehold";

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
              component={ManageAssessment}
              path={`${PATH.HOUSEHOLD_MANAGEMENT}/householdregistration`}
              exact
            />
            <MainRouteWrapper
              component={AddHouseHold}
              path={`${PATH.ADD_HOUSEHOLD}`}
              exact
            />
            <MainRouteWrapper
                component={UpdateHousehold}
                path={`${PATH.UPDATE_HOUSEHOLD}`}
                exact
            />
            <MainRouteWrapper
              component={DetailBeneficiary}
              path={`${PATH.HOUSEHOLD_MANAGEMENT}/detail-household`}
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
            <MainRouteWrapper
              component={FunctionManagement}
              path={`${PATH.FUNCTION_LIST_MANAGEMENT}`}
              exact
            />
            <MainRouteWrapper
              component={PermissionManagement}
              path={`${PATH.RIGHTS_MANAGEMENT}`}
              exact
            />
            <MainRouteWrapper
              component={RoleManagement}
              path={`${PATH.ROLE_MANAGEMENT}`}
              exact
            />
            <MainRouteWrapper
              component={UserManagement}
              path={`${PATH.USER_MANAGEMENT}`}
              exact
            />
            <MainRouteWrapper
              component={() => <div>AAA</div>}
              path={`${PATH.SYSTEMS_PARAMETERS}`}
              exact
            />
            <MainRouteWrapper
              component={() => <div>AAA</div>}
              path={`${PATH.BACKUP_DATABASE}`}
              exact
            />
            <MainRouteWrapper
              component={PermissionManagement}
              path={`${PATH.PERMISSIONS_MANAGEMENT}`}
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
            <Route component={Page403} path={PATH.PAGE_403} exact />
            <Route component={Page404} />
          </Switch>
        </Router>
        {/* <LoginScreen /> */}
      </Suspense>
    );
  }
}

export default App;
