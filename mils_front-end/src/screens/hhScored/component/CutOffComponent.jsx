import {
  Button,
  Col,
  Input,
  message,
  Modal,
  Row,
  Table,
  Tag,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { regexTemplate } from "../../../utils/regexTemplate";
import getCutOff from "../../../api/getCutOff";
import { useSelector } from "react-redux";

function CutOffComponent(props) {
  const { visible, setVisible } = props;
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);

  const [page, setPage] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [text, setText] = useState("");
  const [searchText, setSearchText] = useState("");

  const { Text } = Typography;
  const { t } = useTranslation();

  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    setShowTable(false);
    setText("");
    setSearchText("");
  }, [visible]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (data, record, index) => {
        return page ? index + 1 + 10 * (page - 1) : index + 1;
      },
    },
    {
      title: t("HHCode"),
      dataIndex: "HHCode",
      key: "HHCode",
      align: "center",
      render: (data) => <div style={{ minWidth: 100 }}>{data}</div>,
    },
    {
      title: t("HEAD_OF_HH_NAME"),
      dataIndex: "HHHeadName",
      key: "HHHeadName",
      align: "center",
      render: (data) => <div style={{ minWidth: 120 }}>{data}</div>,
    },
    {
      title: t("PROVINCE"),
      dataIndex: "Province",
      key: "Province",
      align: "center",
      render: (data, record) => (
        <div style={{ minWidth: 100 }}>
          {dataLanguage === "la" ? record.Province : record.ProvinceEng}
        </div>
      ),
    },
    {
      title: t("DISTRICT"),
      dataIndex: "District",
      key: "District",
      align: "center",
      render: (data, record) => (
        <div style={{ minWidth: 100 }}>
          {dataLanguage === "la" ? record.District : record.DistrictEng}
        </div>
      ),
    },
    {
      title: t("VILLAGE"),
      dataIndex: "Village",
      key: "Village",
      align: "center",
      render: (data, record) => (
        <div style={{ minWidth: 100 }}>
          {dataLanguage === "la" ? record.Village : record.VillageEng}
        </div>
      ),
    },
    {
      title: t("PMT_SCORED"),
      dataIndex: "PMTScored",
      key: "PMTScored",
      align: "center",
      render: (data) => (
        <div style={{ minWidth: 80 }}>
          <Tag color={"green"}>
            <span className="font-weight-600">{data}</span>
          </Tag>
        </div>
      ),
    },
  ];

  const onCutOffChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const onCutOff = async () => {
    let isError = false;
    if (!regexTemplate.NUMBER.test(text)) {
      isError = true;
      message.error({
        content: "Only input integer number",
        key: "message-form-role",
        duration: 1.5,
      });
    } else {
      if (text < 0 || text > 100) {
        isError = true;
        message.error({
          content: "Cut off >= 0 and Cut Off <= 100",
          key: "message-form-role",
          duration: 1.5,
        });
      }
    }
    if (!isError) {
      setLoading(true);
      await getCutOff.getAll({ cutOff: text }).then((res) => {
        setData(res.data.Data);
        setDataFilter(res.data.Data);
        setShowTable(true);
        setLoading(false);
      });
    }
  };

  const footerModal = () => {
    return showTable
      ? [
          <Button
            type={"primary"}
            className="ml-auto"
            onClick={() => {
              setShowTable(false);
              setSearchText("");
            }}
          >
            {t("BACK")}
          </Button>,
        ]
      : [
          <Button
            key="1"
            onClick={() => {
              setVisible(false);
            }}
          >
            {t("CANCEL")}
          </Button>,
          <Button key="3" type="primary" loading={isLoading} onClick={onCutOff}>
            {t("CUTOFF")}
          </Button>,
        ];
  };

  const onClickSearch = () => {
    let array = [...data];
    if (searchText && regexTemplate.NUMBER.test(searchText)) {
      array = array.filter((value) => value.HHCode.includes(searchText));
    } else if (searchText && !regexTemplate.NUMBER.test(searchText)) {
      array = array.filter((value) => value.HHHeadName.includes(searchText));
    }
    setDataFilter(array);
  };

  return (
    <Modal
      title="Cut Off Household PMT Scored"
      visible={visible}
      width={showTable ? "80%" : "400px"}
      onCancel={() => {
        setVisible(false);
      }}
      onOk={onCutOff}
      cancelButtonProps={{
        type: "default",
      }}
      bodyStyle={{
        paddingTop: 8,
        paddingBottom: 0,
      }}
      style={showTable ? { top: 20 } : null}
      footer={footerModal()}
      forceRender
    >
      {showTable ? (
        <>
          <Row className="mb-2" gutter={[16]}>
            <Col span={24} md={12} lg={4}>
              <Input
                value={searchText}
                placeholder={`${t("HEAD_OF_HH_NAME")} / ${t("HHCode")}`}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    onClickSearch();
                  }
                }}
              />
            </Col>
            <Col span={24} md={12} lg={4}>
              <Button type="primary" onClick={onClickSearch}>
                <i className="fas fa-search mr-2"></i>
                {t("SEARCH")}
              </Button>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={dataFilter}
            rowKey="HHCode"
            pagination={{
              current: Number(page),
              pageSize: 10,
              total: dataFilter.length,
              onChange: (value) => {
                setPage(value);
              },
              showSizeChanger: false,
            }}
            className="hh-scored--table"
          />
        </>
      ) : (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Text>{t("CUTOFF")}</Text>
            <Input
              className="w-100"
              value={text}
              placeholder={"Input your value!"}
              onChange={(e) => {
                onCutOffChange(e);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  onCutOff();
                }
              }}
            />
          </Col>
        </Row>
      )}
    </Modal>
  );
}

export default CutOffComponent;
