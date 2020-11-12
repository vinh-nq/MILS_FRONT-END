import React, { useEffect, useState } from "react";
import { Cascader } from "antd";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import houseHoldApi from "../../../../../api/houseHoldApi";
import dataDictionaryApi from "../../../../../api/dataDictionaryApi";
import "./styles.scss";

export default function CascaderFilter(props) {
  const { t } = useTranslation();
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listVillage, setListVillage] = useState([]);
  const [options, setOptions] = useState([]);
  const { valueLocation, setValueLocation, disabled } = props;
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    const fetchDataProvince = async () => {
      return await dataDictionaryApi
        .GetAllProvince({
          keyword: null,
        })
        .then((res) => {
          setListProvince(res.data.Data);
          setOptions(
            res.data.Data.map((el) => ({
              ...el,
              value: el.Id,
              label:
                localStorage.getItem("i18nextLng") === "la"
                  ? el.ValueOfLao
                  : el.ValueOfEng,
              isLeaf: false,
              type: "province",
            }))
          );
        });
    };
    fetchDataProvince();
  }, []);

  useEffect(() => {
    setOptions((data) => {
      return data.map((el) => {
        if (!el.children) {
          return {
            ...el,
            label: dataLanguage === "la" ? el.ValueOfLao : el.ValueOfEng,
          };
        } else {
          return {
            ...el,
            label: dataLanguage === "la" ? el.ValueOfLao : el.ValueOfEng,
            loading: false,
            children:
              (el.children || []).map((ele) => {
                if (!ele.children) {
                  return {
                    ...ele,
                    loading: false,
                    label:
                      dataLanguage === "la"
                        ? ele.DistrictName
                        : ele.DistrictNameEng,
                  };
                } else {
                  return {
                    ...ele,
                    loading: false,
                    label:
                      dataLanguage === "la"
                        ? ele.DistrictName
                        : ele.DistrictNameEng,
                    children:
                      (ele.children || []).map((elee) => {
                        return {
                          ...elee,
                          label:
                            dataLanguage === "la"
                              ? elee.VillageName
                              : elee.VillageNameEng,
                        };
                      }) || null,
                  };
                }
              }) || null,
          };
        }
      });
    });
  }, [dataLanguage, options.length]);

  const onChange = (value) => {
    setValueLocation(value);
  };

  const loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    if (targetOption.type === "province") {
      const fetchDataDistrict = async (idProvince) => {
        await houseHoldApi
          .getAllDistrict({
            provinceId: idProvince,
          })
          .then((res) => {
            targetOption.loading = false;
            targetOption.children = res.data.Data.map((el) => ({
              ...el,
              value: el.DistrictId,
              label:
                dataLanguage === "la" ? el.DistrictName : el.DistrictNameEng,
              isLeaf: false,
              type: "district",
            }));
            setOptions(options);
            setListDistrict(res.data.Data);
          });
      };
      fetchDataDistrict(targetOption.value);
    }
    if (targetOption.type === "district") {
      const fetchDataVillage = async (districtId) => {
        await houseHoldApi.getAllVillage({ districtId }).then((res) => {
          targetOption.loading = false;
          targetOption.children = res.data.Data.map((el) => ({
            ...el,
            value: el.VillageId,
            label: dataLanguage === "la" ? el.VillageName : el.VillageNameEng,
          }));
          setOptions(options);
          setListVillage(res.data.Data);
        });
      };

      fetchDataVillage(targetOption.value);
    }
  };

  return (
    <div className="d-flex flex-column flex-start col-xl-9 col-md-10 col-10">
      {listProvince && listDistrict && listVillage ? <div></div> : null}
      <span style={{ fontSize: "12px" }}>
        {t("Select Province/ District/ Village")}
      </span>
      <Cascader
        disabled={disabled}
        options={options}
        loadData={loadData}
        onChange={onChange}
        changeOnSelect
        value={valueLocation || []}
        className="class-cascader"
        popupClassName="class-cascaderac"
        placeholder={t("Select Province/ District/ Village")}
      />
    </div>
  );
}
