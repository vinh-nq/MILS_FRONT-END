import React from "react";
import { Dropdown, Menu } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { languageList } from "./optionValue/optionValue";
import { withTranslation } from "react-i18next";
import { upperCase } from "lodash";
import { connect } from "react-redux";
import "./style.scss";

class SelectLanguage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: languageList[0],
    };
  }

  componentDidMount() {
    this.setState({
      value:
        languageList.find(
          (el) => el.value === localStorage.getItem("i18nextLng")
        ) || languageList[0],
    });
    this.props.AddLanguage(
      languageList.find(
        (el) => el.value === localStorage.getItem("i18nextLng")
      ) || languageList[0]
    );
  }

  handleChange = (value) => {
    const { i18n } = this.props;
    i18n.changeLanguage(value.value);
    this.props.AddLanguage(value);
    this.setState({
      value: value,
    });
  };

  render() {
    const { t } = this.props;
    const { value } = this.state;
    const menuData = (
      <Menu>
        {languageList.map((element, index) => (
          <Menu.Item
            key={element.value}
            onClick={() => {
              this.handleChange(element);
            }}
          >
            <div className="container-select-country-langua">
              <img
                src={`/assets/images/flag/${element.imageIcon}.png`}
                style={{ width: 25, height: 25 }}
                alt={element.value}
              />
              <span className="text-Container">{t(element.displayName)}</span>
            </div>
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <Dropdown overlay={menuData} placement="bottomRight">
        <div className="container-select-country-langua">
          <img
            src={`/assets/images/flag/${value.imageIcon}.png`}
            alt={value.imageIcon}
            style={{ width: 25, height: 25, paddingTop: "2px" }}
          />
          <span
            className="text-Container"
            style={{ color: "#ffffff99", fontWeight: "500" }}
          >
            {upperCase(value.value)}
          </span>
          <CaretDownOutlined
            className="ml-1"
            style={{
              color: "#ffffff99",
              fontSize: "13px",
            }}
          />
        </div>
      </Dropdown>
    );
  }
}

const mapStateToProps = (state) => {
  // const { todos } = state;
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    AddLanguage: (language) => {
      dispatch({
        type: "ADD_LANGUAGE",
        payload: language,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(SelectLanguage));
