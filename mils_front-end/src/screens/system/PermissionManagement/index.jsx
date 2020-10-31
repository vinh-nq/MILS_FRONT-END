import React, { useEffect } from "react";
import { Button, Divider, Checkbox, message, Tabs } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import roleManagementApi from "../../../api/roleManagementApi";
import functionManagementApi from "../../../api/functionManagementApi";
import LoadingSpinner from "../../../components/LoadingSpinner";
import "./styles.scss";
import { useState } from "react";
import { PATH } from "../../../routers/Path";
import { getValueFromLink } from "../../../utils/getValueFromLink";

export default function PermissionManagement(props) {
  const { t } = useTranslation();
  const { TabPane } = Tabs;
  const history = useHistory();
  const [objectRole, setobjectRole] = useState({});
  const [listFunction, setListFunction] = useState([]);
  const [listGroupName, setListGroupName] = useState([]);
  const [checkLoading, setCheckLoading] = useState(false);
  const [listPermission, setListPermission] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    if (
      `${history.location.pathname}${history.location.search}` ===
        PATH.PERMISSIONS_MANAGEMENT ||
      `${history.location.pathname}${history.location.search}` ===
        PATH.RIGHTS_MANAGEMENT
    ) {
      history.push(PATH.ROLE_MANAGEMENT);
    }
    if (!getValueFromLink(props.location, "roleID")) {
      history.push(PATH.ROLE_MANAGEMENT);
    }
  }, [history, props.location]);

  useEffect(() => {
    const fetchDataRoleAndFunction = async (history) => {
      setCheckLoading(true);
      return await Promise.all([
        fetchDataAllRole(history.location),
        fetchDataAllFunction(),
      ])
        .then(([resRole, resFunction]) => {
          setCheckLoading(false);
          if (resRole.statusText !== "OK") {
            message.error("error role fetch");
          }
          if (resFunction.statusText !== "OK") {
            message.error("error role function");
          }
          return [resRole.data, resFunction.data];
        })
        .then(([dataRole, dataFunction]) => {
          if (!dataRole) {
            history.push(PATH.ROLE_MANAGEMENT);
          }
          setCheckAll(
            dataRole.Permissions.map((el) => el.FunctionCode).length ===
              dataFunction.listOfObj.length
          );
          setobjectRole(dataRole);
          setListPermission(dataRole.Permissions.map((el) => el.FunctionCode));
          setListFunction(dataFunction.listOfObj);
          setListGroupName([
            ...new Set(dataFunction.listOfObj.map((e) => e.GroupName)),
          ]);
        })
        .catch(() => {
          message.error("error");
        });
    };
    fetchDataRoleAndFunction(history);
  }, [history]);

  const fetchDataAllRole = (location) => {
    return roleManagementApi.GetRoleById({
      RoleId: getValueFromLink(location, "roleID"),
    });
  };

  const fetchDataAllFunction = () => {
    return functionManagementApi.GetAllFunctionet({
      keyword: null,
      pageNum: 1,
      pageSize: 1000,
    });
  };

  const renderListPermissionByGroupName = (groupName) => {
    const arrayFilter = (listFunction || []).filter(
      (el) => el.GroupName === groupName
    );
    if (arrayFilter.length > 0) {
      return (
        <TabPane tab={groupName} key={groupName}>
          <div className="row">
            {arrayFilter.map((el) => (
              <span
                key={el.FunctionCode}
                className="col-xl-3 col-lg-3 col-sm-3 col-6 mt-1 mb-1"
              >
                <Checkbox
                  onChange={(event) => {
                    const listDataPermision = [...listPermission];
                    if (event.target.checked) {
                      setListPermission([
                        ...listDataPermision,
                        el.FunctionCode,
                      ]);
                      setCheckAll(
                        [...listDataPermision, el.FunctionCode].length ===
                          listFunction.length
                      );
                    } else {
                      setListPermission(
                        listDataPermision.filter(
                          (ele) => ele !== el.FunctionCode
                        )
                      );
                      setCheckAll(false);
                    }
                  }}
                  checked={listPermission.includes(el.FunctionCode)}
                  value={el.FunctionCode}
                >
                  {el.FunctionName}
                </Checkbox>
              </span>
            ))}
          </div>
        </TabPane>
      );
    } else {
      return null;
    }
  };

  const onSavePermission = async () => {
    setCheckLoading(true);
    const arrayPermistion = listPermission.map((el) => {
      const objectFunction = listFunction.find(
        (ele) => ele.FunctionCode === el
      );
      return {
        PermissionId: null,
        RoleId: objectRole.RoleId,
        FunctionCode: objectFunction.FunctionCode,
        FunctionName: objectFunction.FunctionName,
        Allowed: 1,
      };
    });
    return await roleManagementApi
      .InsertPermission({
        RoleId: objectRole.RoleId,
        RoleName: objectRole.RoleName,
        Permissions: arrayPermistion,
      })
      .then(() => {
        setCheckLoading(false);
        message.success("ADD_SUCCESS");
      })
      .catch(() => {
        setCheckLoading(false);
        message.error("ERROR");
      });
  };

  return (
    <div className="role-management-container">
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div>
          <span className="h5 mb-0">{t("PERMISSION MANAGEMENT")} :</span>
          <span className="h5 m-0 ml-2" style={{ color: "#374efb" }}>
            {(objectRole || {}).RoleName}
          </span>
        </div>
        <div className="d-flex flex-row align-items-center">
          <Button className="d-flex align-items-center ml-2" type="primary">
            <SaveOutlined />
            <span
              className="ml-1"
              style={{ paddingTop: "2px" }}
              onClick={onSavePermission}
            >
              {t("SAVE")}
            </span>
          </Button>
        </div>
      </div>
      <Divider />
      <Checkbox
        className="mb-3"
        checked={checkAll}
        onChange={(event) => {
          if (event.target.checked) {
            setCheckAll(true);
            setListPermission(listFunction.map((el) => el.FunctionCode));
          } else {
            setCheckAll(false);
            setListPermission([]);
          }
        }}
      >
        {checkAll ? t("UNCHECK_ALL_FUNCTION") : t("CHECK_ALL_FUNCTION")}
      </Checkbox>
      <Tabs type="card">
        {listGroupName.map((eleGroupName) => {
          return renderListPermissionByGroupName(eleGroupName);
        })}
      </Tabs>
    </div>
  );
}
