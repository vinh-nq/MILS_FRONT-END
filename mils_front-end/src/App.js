import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./style.scss";
import LoadingSpinner from "./components/LoadingSpinner";
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
import DetailBeneficiary from "./screens/householdManagement/ManageAssessment/DetailBeneficiary";
import ListOfProvince from "./screens/dataDictionary/ListOfProvince";
import ListOfDistrict from "./screens/dataDictionary/ListOfDistrict";
import ListOfWallMetarail from "./screens/dataDictionary/ListOfWallMetarail";
import ListOfFloorMetarail from "./screens/dataDictionary/ListOfFloorMetarail";
import ListOfRoofMetarail from "./screens/dataDictionary/ListOfRoofMetarail";
import ListOfDrinkingWater from "./screens/dataDictionary/ListOfDrinkingWater";
import ListOfToilet from "./screens/dataDictionary/ListOfToilet";
import ListOfEnergySource from "./screens/dataDictionary/ListOfEnergySource";
import ListOfEthnic from "./screens/dataDictionary/ListOfEthnic";
import ListOfLevel from "./screens/dataDictionary/ListOfLevel";
import ListOfClass from "./screens/dataDictionary/ListOfClass";
import ListOfMainJob from "./screens/dataDictionary/ListOfMainJob";
import ListOfBusiness from "./screens/dataDictionary/ListOfBusiness";
import ListOfPlotStatus from "./screens/dataDictionary/ListOfPlotStatus";
import ListOfPlotCause from "./screens/dataDictionary/ListOfPlotCause";
import ListOfPlotType from "./screens/dataDictionary/ListOfPlotType";
import ListOfLandType from "./screens/dataDictionary/ListOfLandType";
import ListOfSchoolType from "./screens/dataDictionary/ListOfSchoolType";
import ListOfBorrowReason from "./screens/dataDictionary/ListOfBorrowReason";
import ListOfMainGoodAndService from "./screens/dataDictionary/ListOfMainGoodAndService";
import ListOfVillage from "./screens/dataDictionary/ListOfVillage";
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
            <Route path={PATH.LOGIN} component={LoginScreen} exact />
            <MainRouteWrapper
              component={() => <div>DASH BOARD</div>}
              path="/"
              exact
            />
            <MainRouteWrapper
              component={MenuRedirect}
              path={[
                PATH.system,
                PATH.datadictionary,
                PATH.householdmanagement,
                PATH.cctprogram,
                PATH.paymentmodule,
                PATH.grievancemanagement,
                PATH.reportbi,
                PATH.smsbroadcast,
              ]}
              exact
            />
            <MainRouteWrapper
              component={FunctionManagement}
              path={PATH.FUNCTION_LIST_MANAGEMENT}
              exact
            />
            <MainRouteWrapper
              component={ListOfProvince}
              path={PATH.LIST_OF_PROVINCE}
              exact
            />
            <MainRouteWrapper
              component={ListOfWallMetarail}
              path={PATH.LIST_OF_WALL_MATERIAL}
              exact
            />
            <MainRouteWrapper
              component={ListOfFloorMetarail}
              path={PATH.LIST_OF_FLOOR_MATERIAL}
              exact
            />
            <MainRouteWrapper
              component={ListOfRoofMetarail}
              path={PATH.LIST_OF_ROOF_MATERIAL}
              exact
            />
            <MainRouteWrapper
              component={ListOfDistrict}
              path={PATH.LIST_OF_DISTRICT}
              exact
            />
            <MainRouteWrapper
              component={ListOfDrinkingWater}
              path={PATH.LIST_OF_DRINKING_WATER}
              exact
            />
            <MainRouteWrapper
              component={ListOfToilet}
              path={PATH.LIST_OF_TOILET}
              exact
            />
            <MainRouteWrapper
              component={ListOfEnergySource}
              path={PATH.LIST_OF_ENERGY_SOURCE}
              exact
            />
            <MainRouteWrapper
              component={ListOfEthnic}
              path={PATH.LIST_OF_ETHNIC}
              exact
            />
            <MainRouteWrapper
              component={ListOfLevel}
              path={PATH.LIST_OF_LEVEL}
              exact
            />
            <MainRouteWrapper
              component={ListOfClass}
              path={PATH.LIST_OF_CLASS}
              exact
            />
            <MainRouteWrapper
              component={ListOfBusiness}
              path={PATH.LIST_OF_BUSINESS}
              exact
            />
            <MainRouteWrapper
              component={ListOfMainJob}
              path={PATH.LIST_OF_MAIN_JOB}
              exact
            />

            <MainRouteWrapper
              component={ManageAssessment}
              path={`${PATH.HOUSEHOLD_REGISTRATION}`}
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
              component={ListOfPlotStatus}
              path={`${PATH.LIST_OF_PLOT_STATUS}`}
              exact
            />
            <MainRouteWrapper
              component={ListOfPlotCause}
              path={`${PATH.LIST_OF_PLOT_CAUSE}`}
              exact
            />
            <MainRouteWrapper
              component={ListOfPlotType}
              path={`${PATH.LIST_OF_PLOT_TYPE}`}
              exact
            />
            <MainRouteWrapper
              component={ListOfLandType}
              path={`${PATH.LIST_OF_LAND_TYPE}`}
              exact
            />
            <MainRouteWrapper
              component={ListOfSchoolType}
              path={`${PATH.LIST_OF_SCHOOL_TYPE}`}
              exact
            />
            <MainRouteWrapper
              component={ListOfBorrowReason}
              path={`${PATH.LIST_OF_BORROW_REASON}`}
              exact
            />
            <MainRouteWrapper
              component={ListOfMainGoodAndService}
              path={`${PATH.LIST_OF_MAIN_GOOD_AND_SERVICES}`}
              exact
            />
            <MainRouteWrapper
              component={ListOfVillage}
              path={`${PATH.LIST_OF_VILLAGE}`}
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
              path={`/householdmanagement/generationofpmtscorecard`}
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
            <Route component={Page403} path={PATH.PAGE_403} exact />
            <Route component={Page404} />
          </Switch>
        </Router>
      </Suspense>
    );
  }
}

export default App;
