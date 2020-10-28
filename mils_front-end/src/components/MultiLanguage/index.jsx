import React from "react";
import { withTranslation } from "react-i18next";
import {languageList} from "./listLanguage";

class MultiLanguage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: languageList[0].value,
        };
    }

    componentDidMount(){
        this.setState({
            value: localStorage.getItem('i18nextLng') || 'vi'
        })
    }

    renderOption = (t) => {
        return languageList.map((element, index) => (
            <a className="dropdown-item" key={index} onClick={()=>{this.handleChange(element.value)}}>
                <img src={`../assets/images/flags/${element.imageIcon}.png`} alt="user-image" className="mr-1" height="20" />
                <span className="align-middle">{t(element.displayName)}</span>
            </a>
        ))
    };

    renderOptionSelected = () => {
        let itemSelected = languageList.find(element => element.value === this.state.value);
        itemSelected = itemSelected ?  itemSelected : languageList[0];
        return (
            <a
                className="nav-link dropdown-toggle arrow-none waves-effect waves-light"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
            >
                <img
                    src={`../assets/images/flags/${itemSelected.imageIcon}.png`}
                    alt="user-image"
                    height="24"
                    className="mr-1"
                />
                <span className="align-middle">{itemSelected.code}</span>
            </a>
        );
    }

    handleChange = (value) => {
        const { i18n } = this.props;
        i18n.changeLanguage(value);
        this.setState({
            value: value,
        });
    };

    render() {
        const { t } = this.props;
        return (
            <li className="dropdown d-none d-lg-inline-block topbar-dropdown">
                {this.renderOptionSelected()}
                <div className="dropdown-menu dropdown-menu-right">
                    {this.renderOption(t)}
                </div>
            </li>
        );
    }
}

export default withTranslation()(MultiLanguage);
