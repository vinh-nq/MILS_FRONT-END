import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Input,
  // Dropdown,
  // Menu,
  // Modal,
  Pagination,
  Row,
  Select,
  Table,
  Typography,
  message,
  Popconfirm,
} from "antd";

// import HouseHoldMemberList from "./component/HHMemberList";
// import PlotLandList from "./component/PlotLandList";
import houseHoldApi from "../../../api/houseHoldApi";
import downloadFileExcelApi from "../../../api/downloadFileExcelApi";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PATH } from "../../../routers/Path";
import { saveAs } from "file-saver";
import {
  // UserOutlined,
  // InfoCircleOutlined,
  // BankOutlined,
  // EllipsisOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons/lib/icons";

function ManageAssessment(props) {
  // const [visibleMemberList, setVisibleMemberList] = useState(false);
  // const [visiblePlotLand, setVisiblePlotLand] = useState(false);
  const [data, setData] = useState([]);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [village, setVillage] = useState([]);
  const [unit, setUnit] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setLoading] = useState(false);
  //selected province, district, village, unit cho tìm kiếm
  const [selectedProvince, setSelectedProvince] = useState("-1");
  const [selectedDistrict, setSelectedDistrict] = useState("-1");
  const [selectedVillage, setSelectedVillage] = useState("-1");
  const [selectedUnit, setSelectedUnit] = useState("-1");
  const [selectChildren, setSelectChildren] = useState(-1);
  const [selectPregnant, setSelectPregnant] = useState(-1);
  const [headName, setHeadName] = useState("");
  const history = useHistory();

  //get member in household state
  // const [memberInHouseHold, setMemberInHouseHold] = useState([]);
  // const [plotLandInHouseHold, setPlotLandInHouseHold] = useState([]);

  //delete member in household
  // const confirm = Modal.confirm;

  const { Option } = Select;
  const { Text } = Typography;
  const { t } = useTranslation();

  //Chuyên đổi ngôn ngữ sang tiếng anh và tiếng lào
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  //Column header
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) =>
        page ? index + 1 + 10 * (page - 1) : index + 1,
    },
    {
      title: t("VILLAGE"),
      dataIndex: "Village",
      key: "Village ",
      align: "center",
      render: (data, record) => (
        <div style={{ minWidth: 120 }}>
          {dataLanguage === "la"
            ? record.Village.trim()
            : record.VillageEng.trim()}
        </div>
      ),
    },
    {
      title: t("UNIT"),
      dataIndex: "Unit",
      key: "Unit",
      align: "center",
      render: (data, record) => (
        <div style={{ minWidth: 60 }}>
          {dataLanguage === "la" ? record.Unit.trim() : record.UnitEng.trim()}
        </div>
      ),
    },
    {
      title: t("HH_LEVEL"),
      dataIndex: "HHLevel",
      key: "HHLevel",
      align: "center",
      render: (data) => <div style={{ minWidth: 60 }}>{data}</div>,
    },
    {
      title: t("HEAD_OF_HH_NAME"),
      dataIndex: "HeadOfHHName",
      key: "HeadOfHHName",
      align: "center",
      render: (data) => <div style={{ minWidth: 150 }}>{data}</div>,
    },
    {
      title: t("NUMBER_OF_HH"),
      dataIndex: "TotalHHMembers",
      key: "TotalHHMembers",
      align: "center",
      render: (data) => <div style={{ minWidth: 70 }}>{data}</div>,
    },
    {
      title: t("NUMBER_PLOTS"),
      dataIndex: "NumberPlots",
      key: "NumberPlots",
      align: "center",
      render: (data) => <div style={{ minWidth: 100 }}>{data}</div>,
    },
    {
      title: t("NUMBER_PREGNANT_WOMAN"),
      dataIndex: "NumberPregnant",
      key: "NumberPregnant",
      align: "center",
      render: (data) => <div style={{ minWidth: 120 }}>{data}</div>,
    },
    {
      title: t("NUMBER_CHILD"),
      dataIndex: "NumberChild",
      key: "NumberChild",
      align: "center",
      render: (data) => <div style={{ minWidth: 150 }}>{data}</div>,
    },
    {
      key: "actions",
      align: "center",
      dataIndex: "actions",
      render: (data, record) => {
        // const menu = (
        //   <Menu>
        //     <Menu.Item
        //       key="1"
        //       icon={<UserOutlined className="ant--icon__middle" />}
        //       onClick={() => {
        //         showModalMemberInHouseHold(record.HHCode);
        //       }}
        //     >
        //       {t("MEMBER_IN_FAMILY")}
        //     </Menu.Item>
        //     <Menu.Item
        //       key="2"
        //       icon={<BankOutlined className="ant--icon__middle" />}
        //       onClick={() => {
        //         getPlotLandByHouseHold(record.HHCode);
        //       }}
        //     >
        //       {t("LAND_PLOT")}
        //     </Menu.Item>
        //     <Menu.Item
        //       key="3"
        //       icon={<InfoCircleOutlined className="ant--icon__middle" />}
        //       onClick={() => {
        //         history.push(
        //           `${PATH.DETAIL_HOUSEHOLD}?hh_code=${record.HHCode}`
        //         );
        //       }}
        //     >
        //       {t("DESCRIPTION")}
        //     </Menu.Item>
        //     <Menu.Item
        //       key="4"
        //       icon={
        //         <DeleteOutlined className="ant--icon__middle text-danger" />
        //       }
        //       onClick={() => {
        //         showConfirm(record.HHCode);
        //       }}
        //     >
        //       <span className="text-danger">{t("DELETE")}</span>
        //     </Menu.Item>
        //   </Menu>
        // );
        // return (
        //   <div className="d-flex justify-content-end">
        //     <Dropdown overlay={menu}>
        //       <EllipsisOutlined className="font-weight-bold text-primary font-24 pointer" />
        //     </Dropdown>
        //   </div>
        // );
        return (
          <div className="d-flex justify-content-end" style={{ minWidth: 80 }}>
            <Button
              className="set-center-content mr-1"
              icon={<EditOutlined />}
              size={"small"}
              type={"primary"}
              ghost
              onClick={() => {
                history.push(
                  `${PATH.DETAIL_HOUSEHOLD}?hh_code=${record.HHCode}`
                );
              }}
            />
            <Popconfirm
              title="Are you sure？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                handleDeleteHouseHold(record.HHCode);
              }}
            >
              <Button
                className="set-center-content"
                danger
                size={"small"}
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const getValueOfQueryParams = (location, queryParamName, type) => {
    if (type === "STRING") {
      return new URLSearchParams(location.search).get(queryParamName) === null
        ? "-1"
        : new URLSearchParams(location.search).get(queryParamName);
    } else if (type === "PAGE") {
      return new URLSearchParams(location.search).get(queryParamName) === null
        ? 1
        : new URLSearchParams(location.search).get(queryParamName);
    } else if (type === "NUMBER") {
      return new URLSearchParams(location.search).get(queryParamName) === null
        ? -1
        : new URLSearchParams(location.search).get(queryParamName);
    } else {
      return new URLSearchParams(location.search).get(queryParamName) === null
        ? ""
        : new URLSearchParams(location.search).get(queryParamName);
    }
  };

  //Lấy dữ liêu từ URL và check
  const getDataFromUrl = () => {
    let pageUrl = getValueOfQueryParams(history.location, "page", "PAGE");
    let provinceId = getValueOfQueryParams(
      history.location,
      "provinceId",
      "STRING"
    );
    let districtId = getValueOfQueryParams(
      history.location,
      "districtId",
      "STRING"
    );
    let villageId = getValueOfQueryParams(
      history.location,
      "villageId",
      "STRING"
    );
    let unitId = getValueOfQueryParams(history.location, "unitId", "STRING");
    let child = getValueOfQueryParams(history.location, "child", "NUMBER");
    let pregnant = getValueOfQueryParams(
      history.location,
      "pregnant",
      "NUMBER"
    );
    let headName = getValueOfQueryParams(
      history.location,
      "headName",
      "KEYWORD"
    );

    return {
      pageUrl,
      provinceId,
      districtId,
      villageId,
      unitId,
      child,
      pregnant,
      headName,
    };
  };

  useEffect(() => {
    let pageUrl = getValueOfQueryParams(history.location, "page", "PAGE");
    let provinceId = getValueOfQueryParams(
      history.location,
      "provinceId",
      "STRING"
    );
    let districtId = getValueOfQueryParams(
      history.location,
      "districtId",
      "STRING"
    );
    let villageId = getValueOfQueryParams(
      history.location,
      "villageId",
      "STRING"
    );
    let unitId = getValueOfQueryParams(history.location, "unitId", "STRING");
    let child = getValueOfQueryParams(history.location, "child", "NUMBER");
    let pregnant = getValueOfQueryParams(
      history.location,
      "pregnant",
      "NUMBER"
    );
    let headName = getValueOfQueryParams(
      history.location,
      "headName",
      "KEYWORD"
    );

    setSelectedProvince(provinceId);
    setSelectedDistrict(districtId);
    setSelectedVillage(villageId);
    setSelectedUnit(unitId);
    setSelectChildren(parseInt(child));
    setSelectPregnant(parseInt(pregnant));
    setHeadName(headName);
    setPage(pageUrl);

    const objectParams = {
      currentPage: pageUrl,
      provinceId: provinceId,
      districtId: districtId,
      villageId: villageId,
      unitId: unitId,
      child: child,
      pregnant: pregnant,
      headName: headName,
    };

    const getDataHouseHold = async (params) => {
      setLoading(true);
      await Promise.all([
        getHouseHoldList(params),
        getProvincePromiseAll(),
        getDistrictPromiseAll(params.provinceId),
        getDistrictVillageAll(params.districtId),
        getUnitPromiseAll(params.villageId),
      ]).then(
        ([resHouseHoldList, resProvince, resDistrict, resVillage, resUnit]) => {
          setData(resHouseHoldList.data.Data.houseHoldViewModels);
          setTotalPage(resHouseHoldList.data.Data.TotalPage);
          setProvince(resProvince.data.Data);
          setDistrict(resDistrict.data.Data);
          setVillage(resVillage.data.Data);
          setUnit(resUnit.data.Data);
        }
      );
      setLoading(false);
    };
    getDataHouseHold(objectParams);
  }, [history.location]);

  const getHouseHoldList = (params) => {
    return houseHoldApi.searchHouseHold(params);
  };

  const getProvincePromiseAll = () => {
    return houseHoldApi.getAllProvince();
  };

  const getDistrictPromiseAll = (provinceId) => {
    if (provinceId !== "-1") {
      return houseHoldApi.getAllDistrict({ provinceId });
    } else {
      return {
        data: {
          Data: [],
        },
      };
    }
  };

  const getDistrictVillageAll = (districtId) => {
    if (districtId !== "-1") {
      return houseHoldApi.getAllVillage({ districtId });
    } else {
      return {
        data: {
          Data: [],
        },
      };
    }
  };

  const getUnitPromiseAll = (villageId) => {
    if (villageId !== "-1") {
      return houseHoldApi.getAllUnit({ villageId });
    } else {
      return {
        data: {
          Data: [],
        },
      };
    }
  };

  const getDistrict = async (provinceId) => {
    await houseHoldApi.getAllDistrict({ provinceId }).then((res) => {
      setDistrict(res.data.Data);
    });
  };

  const getVillage = async (districtId) => {
    await houseHoldApi
      .getAllVillage({ districtId })
      .then((res) => setVillage(res.data.Data));
  };

  const getUnit = async (villageId) => {
    await houseHoldApi
      .getAllUnit({ villageId })
      .then((res) => setUnit(res.data.Data));
  };

  //Xem thông tin chi tiết của từng thành viên trong gia đình
  // const getMemberInHouseHold = async (HHCode) => {
  //   setLoading(true);
  //   await houseHoldApi
  //     .getMembersInHouseHold({ householdId: HHCode })
  //     .then((res) => {
  //       setMemberInHouseHold(res.data.Data);
  //     });
  //   setLoading(false);
  // };

  //lấy dữ liệu khi muốn xem thông tin của từng cá nhân và plotland
  // const getPlotLandByHouseHold = async (id) => {
  //   setLoading(true);
  //   await houseHoldApi
  //     .getPlotLandsByHouseHold({ houseHoldId: id })
  //     .then((res) => {
  //       setPlotLandInHouseHold(res.data.Data);
  //     });
  //   setVisiblePlotLand(true);
  //   setLoading(false);
  // };
  //
  // const showModalMemberInHouseHold = async (id) => {
  //   await getMemberInHouseHold(id);
  //   setVisibleMemberList(true);
  // };
  //

  //Xóa một household
  // const showConfirm = (hhCode) => {
  //   setTimeout(() => {
  //     confirm({
  //       title: "Do you want to delete this household?",
  //       okText: t("DELETE"),
  //       onOk: () => {
  //         handleDeleteHouseHold(hhCode);
  //       },
  //       onCancel: () => {},
  //     });
  //   }, 400);
  // };

  const handleDeleteHouseHold = async (hhCode) => {
    setLoading(true);
    await houseHoldApi.deleteHouseHold({ householdId: hhCode }).then((res) => {
      if (res.data.Status) {
        reloadApi();
      } else {
        message.error({
          content: t("DELETE_FAILED"),
          key: "message-form-role",
          duration: 1,
        });
      }
    });
  };

  const reloadApi = async () => {
    const {
      pageUrl,
      provinceId,
      districtId,
      villageId,
      unitId,
      child,
      pregnant,
      headName,
    } = getDataFromUrl();
    setLoading(true);
    await houseHoldApi
      .searchHouseHold({
        provinceId: provinceId,
        districtId: districtId,
        villageId: villageId,
        unitId: unitId,
        child: child,
        pregnant: pregnant,
        headName: headName,
        currentPage: pageUrl,
      })
      .then((res) => {
        if (res.data.Status) {
          setData(res.data.Data.houseHoldViewModels);
          setTotalPage(res.data.Data.TotalPage);
        } else {
          message.error({
            content: t("FETCH_DATA_FAILED"),
            key: "message-form-role",
            duration: 1,
          });
        }
      });
    setLoading(false);
  };

  const onSearchChange = () => {
    history.push(
      `/householdmanagement/householdregistration?page=1&provinceId=${selectedProvince}&districtId=${selectedDistrict}&villageId=${selectedVillage}&unitId=${selectedUnit}&child=${selectChildren}&pregnant=${selectPregnant}&headName=${headName}`
    );
  };

  const onSelectProvince = (id) => {
    setSelectedProvince(id);
    getDistrict(id);
    setSelectedDistrict("-1");
    setSelectedVillage("-1");
    setSelectedUnit("-1");
    setDistrict([]);
    setVillage([]);
    setUnit([]);
  };

  const onSelectDistrict = (id) => {
    setSelectedDistrict(id);
    getVillage(id);
    setSelectedVillage("-1");
    setSelectedUnit("-1");
    setVillage([]);
    setUnit([]);
  };

  const onSelectVillage = (id) => {
    setSelectedVillage(id);
    setSelectedUnit("-1");
    getUnit(id);
    setUnit([]);
  };

  const onSelectUnit = (id) => {
    setSelectedUnit(id);
  };

  const onSelectChildren = (id) => {
    setSelectChildren(id);
  };

  const onSelectPregnantWoman = (id) => {
    setSelectPregnant(id);
  };

  const onPageChange = (currentPage) => {
    setPage(currentPage);
    const {
      provinceId,
      districtId,
      villageId,
      unitId,
      child,
      pregnant,
      headName,
    } = getDataFromUrl();
    history.push(
      `/householdmanagement/householdregistration?page=${currentPage}&provinceId=${provinceId}&districtId=${districtId}&villageId=${villageId}&unitId=${unitId}&child=${child}&pregnant=${pregnant}&headName=${headName}`
    );
  };

  const renderProvinceSelect = () => {
    return province.map((value, index) => (
      <Option
        value={value.Id}
        key={index}
        onChange={() => {
          onSelectProvince(value.Id);
        }}
      >
        {dataLanguage === "la" ? value.ProvinceName : value.ProvinceNameEng}
      </Option>
    ));
  };

  const renderDistrictSelect = () => {
    return district.map((value, index) => (
      <Option value={value.DistrictId} key={index}>
        {dataLanguage === "la" ? value.DistrictName : value.DistrictNameEng}
      </Option>
    ));
  };

  const renderVillageSelect = () => {
    return village.map((value, index) => (
      <Option value={value.VillageId} key={index}>
        {dataLanguage === "la"
          ? value.VillageName
          : value.VillageNameEng || t("EMPTY")}
      </Option>
    ));
  };

  const renderUnitSelect = () => {
    return unit.map((value, index) => (
      <Option value={value.UnitId} key={index}>
        {dataLanguage === "la" ? value.UnitName : value.UnitNameEng}
      </Option>
    ));
  };

  return (
    <div className="manage-assessment">
      {isLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      {/*Header của trang content*/}
      <section className="border-bottom mb-3">
        <div className="d-flex align-items-center mb-3">
          <span className="h5 mb-0">{t("HOUSEHOLD_LIST")}</span>
          <span className="ml-auto d-flex flex-row">
            <Button
              className="set-center-content mr-2"
              icon={<i className="fas fa-file-excel mr-2"></i>}
              style={{ color: "#0c960c", border: "1px #0c960c solid" }}
              onClick={async () => {
                setLoading(true);
                await downloadFileExcelApi
                  .ExportMembers({
                    villageId: selectedVillage === "-1" ? "" : selectedVillage,
                  })
                  .then((res) => {
                    fetch(
                      `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${res.data}`
                    )
                      .then((ress) => {
                        return ress.blob();
                      })
                      .then((blobs) => {
                        const fileExtension = ".xlsx";
                        setLoading(false);
                        saveAs(
                          blobs,
                          `${t("Member&PlotLand")}` + fileExtension
                        );
                      });
                  });
              }}
            >
              Export F1_V2_Form
            </Button>
            <Button
              className="set-center-content mr-2"
              icon={<i className="fas fa-file-excel mr-2"></i>}
              style={{ color: "#0c960c", border: "1px #0c960c solid" }}
              onClick={async () => {
                setLoading(true);
                await downloadFileExcelApi
                  .ExportF1ResultForm({
                    villageId: selectedVillage === "-1" ? "" : selectedVillage,
                  })
                  .then((res) => {
                    fetch(
                      `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${res.data}`
                    )
                      .then((ress) => {
                        return ress.blob();
                      })
                      .then((blobs) => {
                        const fileExtension = ".xlsx";
                        setLoading(false);
                        saveAs(blobs, `${t("F1ResultForm")}` + fileExtension);
                      });
                  });
              }}
            >
              Export F1_Result_Form
            </Button>
            <Button
              className="set-center-content"
              type="primary"
              onClick={() => {
                history.push(`${PATH.ADD_HOUSEHOLD}`);
              }}
            >
              <i className="fas fa-plus mr-2"></i> {t("ADD")}
            </Button>
          </span>
        </div>
      </section>

      {/*Body của trang content*/}
      <section>
        {/*Tìm kiếm */}
        <Row gutter={[16, 12]}>
          <Col span={24} md={12} lg={6}>
            <Text className="font-13">{t("PROVINCE")}</Text>
            <Select
              className="w-100"
              value={selectedProvince}
              onChange={onSelectProvince}
            >
              <Option value={"-1"}>{t("ALL")}</Option>
              {renderProvinceSelect()}
            </Select>
          </Col>
          <Col span={24} md={12} lg={6}>
            <Text className="font-13">{t("DISTRICT")}</Text>
            <Select
              className="w-100"
              value={selectedDistrict}
              onChange={onSelectDistrict}
            >
              <Option value={"-1"}>{t("ALL")}</Option>
              {renderDistrictSelect()}
            </Select>
          </Col>
          <Col span={24} md={12} lg={6}>
            <Text className="font-13">{t("VILLAGE")}</Text>
            <Select
              className="w-100"
              value={selectedVillage}
              onChange={onSelectVillage}
            >
              <Option value={"-1"}>{t("ALL")}</Option>
              {renderVillageSelect()}
            </Select>
          </Col>
          <Col span={24} md={12} lg={6}>
            <Text className="font-13">{t("UNIT")}</Text>
            <Select
              className="w-100"
              value={selectedUnit}
              onChange={onSelectUnit}
            >
              <Option value={"-1"}>{t("ALL")}</Option>
              {renderUnitSelect()}
            </Select>
          </Col>
        </Row>
        <Row gutter={[16, 12]} className="mt-2">
          <Col span={24} md={12} lg={6}>
            <Text className="font-13">{t("CHILDREN_UNDER_2")}</Text>
            <Select
              className="w-100"
              value={selectChildren}
              onChange={onSelectChildren}
            >
              <Option value={-1}>{t("ALL")}</Option>
              <Option value={1}>{t("HAVE_CHILDREN")}</Option>
              <Option value={0}>{t("NO_CHILDREN")}</Option>
            </Select>
          </Col>
          <Col span={24} md={12} lg={6}>
            <Text className="font-13">{t("PREGNANT_WOMAN")}</Text>
            <Select
              className="w-100"
              value={selectPregnant}
              onChange={onSelectPregnantWoman}
            >
              <Option value={-1}>{t("ALL")}</Option>
              <Option value={1}>{t("THERE_IS_A_PREGNANT_WOMAN")}</Option>
              <Option value={0}>{t("NO_PREGNANT_WOMAN")}</Option>
            </Select>
          </Col>
          <Col span={24} md={12} lg={6}>
            <Text className="font-13">{t("HEAD_OF_HH_NAME")}</Text>
            <Input
              placeholder={t("SEARCH_HEAD_OF_HH_NAME")}
              value={headName}
              onChange={(e) => {
                setHeadName(e.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  onSearchChange();
                }
              }}
            />
          </Col>
          <Col span={24} md={12} lg={6}>
            <div>
              <Text className="font-13">{t("SEARCH")}</Text>
            </div>
            <Button type="primary" onClick={onSearchChange}>
              <i className="fas fa-search mr-2"></i> {t("SEARCH")}
            </Button>
          </Col>
        </Row>

        {/*Table*/}
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="Id"
          style={{ overflowX: "auto", overflowY: "hidden" }}
          size="small"
        />
        <div className="mt-3 d-flex">
          <Pagination
            current={Number(page)}
            total={totalPage * 10}
            onChange={(page) => {
              onPageChange(page);
            }}
            showSizeChanger={false}
            className="ml-auto"
          />
        </div>
      </section>
      {/*Modal*/}
      {/*Modal danh sách hộ gia đình*/}

      {/*<HouseHoldMemberList*/}
      {/*  memberInHouseHold={memberInHouseHold}*/}
      {/*  visibleMemberList={visibleMemberList}*/}
      {/*  setVisibleMemberList={setVisibleMemberList}*/}
      {/*  dataLanguage={dataLanguage}*/}
      {/*/>*/}

      {/*Danh sách plot land của từng hộ gia đình/}
      {/*<PlotLandList*/}
      {/*  plotLandInHouseHold={plotLandInHouseHold}*/}
      {/*  visiblePlotLand={visiblePlotLand}*/}
      {/*  setVisiblePlotLand={setVisiblePlotLand}*/}
      {/*/>*/}
    </div>
  );
}

export default ManageAssessment;
