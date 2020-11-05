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
import ListOfLanderType from "./screens/dataDictionary/ListOfLanderType";
import ListOfCookingSource from "./screens/dataDictionary/ListOfCookingSource";
import ListOfMainGoodAndService from "./screens/dataDictionary/ListOfMainGoodAndService";
import ListOfVillage from "./screens/dataDictionary/ListOfVillage";
import UpdateHousehold from "./screens/householdManagement/UpdateHousehold";
import Account from "./screens/account";
import DashBoard from "./screens/dashboard";
import UserVillageManagement from "./screens/system/UserVillageManagement";
import DetailBeneficiary from "./screens/householdManagement/ManageAssessment/component/DetailHouseHold";
import ListOfRelation from "./screens/dataDictionary/ListOfRelation";
import ListOfMaritalStatus from "./screens/dataDictionary/ListOfMaritalStatus";
import MemberInHouseHold from "./screens/householdManagement/ManageAssessment/component/DetailHouseHold/component/MemberInHouseHoldComponent";
import ListOfDisability from "./screens/dataDictionary/ListOfDisability";
import ListOfSchoolEnroll from "./screens/dataDictionary/ListOfSchoolEnroll";
import ListOfAreaMateral from "./screens/dataDictionary/ListOfAreaMateral";
import ListOfSafetyArea from "./screens/dataDictionary/ListOfSafetyArea";
class App extends React.Component {
  render() {
    return (
      <Suspense
        fallback={<LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />}
      >
        <Router>
          <Switch>
            <Route path={PATH.LOGIN} component={LoginScreen} exact />
            <MainRouteWrapper component={DashBoard} path="/" exact />
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
              component={ListOfSafetyArea}
              path={PATH.LIST_OF_SAFETY_AREA}
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
              component={ListOfAreaMateral}
              path={PATH.LIST_OF_AREA_MATERAL}
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
              component={ListOfPlotStatus}
              path={PATH.LIST_OF_PLOT_STATUS}
              exact
            />
            <MainRouteWrapper
              component={ManageAssessment}
              path={`${PATH.HOUSEHOLD_REGISTRATION}`}
              exact
            />
            <MainRouteWrapper
              component={ListOfRelation}
              path={`${PATH.LIST_OF_RELATION}`}
              exact
            />
            <MainRouteWrapper
              component={() => <UpdateHousehold typeModal={"UPDATE"} />}
              path={`${PATH.UPDATE_HOUSEHOLD}`}
              exact
            />
            <MainRouteWrapper
              component={() => <UpdateHousehold typeModal={"ADD"} />}
              path={`${PATH.ADD_HOUSEHOLD}`}
              exact
            />
            <MainRouteWrapper
              component={() => <MemberInHouseHold typeModal={"ADD"} />}
              path={`${PATH.MEMBER_IN_HOUSEHOLD}`}
              exact
            />
            <MainRouteWrapper
              component={() => <MemberInHouseHold typeModal={"UPDATE"} />}
              path={`${PATH.UPDATE_MEMBER_IN_HOUSEHOLD}`}
              exact
            />
            <MainRouteWrapper
              component={DetailBeneficiary}
              path={PATH.DETAIL_HOUSEHOLD}
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
              component={ListOfMaritalStatus}
              path={`${PATH.LIST_OF_MARITAL_STATUS}`}
              exact
            />
            <MainRouteWrapper
              component={ListOfLanderType}
              path={`${PATH.LIST_OF_LANDER_TYPE}`}
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
              component={ListOfCookingSource}
              path={PATH.LIST_OF_COOKING_SOURCE}
              exact
            />
            <MainRouteWrapper
              component={ListOfDisability}
              path={PATH.LIST_OF_DISABILITY}
              exact
            />
            <MainRouteWrapper
              component={UserVillageManagement}
              path={PATH.USERVILLAGE}
              exact
            />
            <MainRouteWrapper
              component={ListOfSchoolEnroll}
              path={PATH.LIST_OF_SCHOOL_ENROLL}
              exact
            />
            <MainRouteWrapper component={Account} path={PATH.ACCOUNT} exact />
            <MainRouteWrapper
              component={() => <div>AAA</div>}
              path={`${PATH.householdmanagement}/householdPoverty`}
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
