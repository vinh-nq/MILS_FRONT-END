import React, { useEffect, useState } from "react";
import { Cascader, Divider } from "antd";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import houseHoldApi from "../../../../../api/houseHoldApi";
import dataDictionaryApi from "../../../../../api/dataDictionaryApi";
import { getValueFromLink } from "../../../../../utils/getValueFromLink";
import "./styles.scss";
import { useHistory } from "react-router-dom";
import { messageError } from "../../../../../components/MessageError";

export default function CascaderFilter(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [listDistrict, setListDistrict] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listVillage, setListVillage] = useState([]);
  const [options, setOptions] = useState([]);
  const [valueLocation, setValueLocation] = useState([]);

  const { setFilterVillage } = props;

  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    const idVillage =
      getValueFromLink(history.location, "region", "STRING") || null;
    if (idVillage && [...idVillage].length > 2) {
      if ([...idVillage].length === 7) {
        const fetchAllDataEdit = async (idProvince, idDistrict) => {
          setLoading(true);
          await Promise.all([
            fetchDataProvinceData(),
            fetchDataDistrictData(idProvince),
            fetchDataVillageData(idDistrict),
          ])
            .then(([resProvince, resDistrict, resVillage]) => {
              setOptions(
                resProvince.data.Data.map((el) => {
                  if (`${el.Id}` === `${idProvince}`) {
                    return {
                      ...el,
                      value: el.Id,
                      label:
                        localStorage.getItem("i18nextLng") === "la"
                          ? el.ValueOfLao
                          : el.ValueOfEng,
                      isLeaf: false,
                      type: "province",
                      loading: false,
                      children: resDistrict.data.Data.map((ele) => {
                        if (ele.DistrictId === idDistrict) {
                          return {
                            ...ele,
                            value: ele.DistrictId,
                            label:
                              localStorage.getItem("i18nextLng") === "la"
                                ? ele.DistrictName
                                : ele.DistrictNameEng,
                            isLeaf: false,
                            type: "district",
                            loading: false,
                            children: resVillage.data.Data.map((elee) => {
                              return {
                                ...elee,
                                value: elee.VillageId,
                                label:
                                  localStorage.getItem("i18nextLng") === "la"
                                    ? elee.VillageName
                                    : elee.VillageNameEng,
                              };
                            }),
                          };
                        } else {
                          return {
                            ...ele,
                            value: ele.DistrictId,
                            label:
                              localStorage.getItem("i18nextLng") === "la"
                                ? ele.DistrictName
                                : ele.DistrictNameEng,
                            isLeaf: false,
                            type: "district",
                          };
                        }
                      }),
                    };
                  } else {
                    return {
                      ...el,
                      value: el.Id,
                      label:
                        localStorage.getItem("i18nextLng") === "la"
                          ? el.ValueOfLao
                          : el.ValueOfEng,
                      isLeaf: false,
                      type: "province",
                    };
                  }
                })
              );
              setValueLocation([idProvince, idDistrict, idVillage]);
              setLoading(false);
            })
            .catch((error) => {
              messageError({
                content: error,
                duration: 2,
              });
            });
        };
        fetchAllDataEdit(idVillage.substr(0, 2), idVillage.substr(0, 4));
      }
      if ([...idVillage].length === 4) {
        const fetchAllDataEdit = async (idProvince, idDistrict) => {
          setLoading(true);
          await Promise.all([
            fetchDataProvinceData(),
            fetchDataDistrictData(idProvince),
          ])
            .then(([resProvince, resDistrict]) => {
              setOptions(
                resProvince.data.Data.map((el) => {
                  if (`${el.Id}` === `${idProvince}`) {
                    return {
                      ...el,
                      value: el.Id,
                      label:
                        localStorage.getItem("i18nextLng") === "la"
                          ? el.ValueOfLao
                          : el.ValueOfEng,
                      isLeaf: false,
                      type: "province",
                      loading: false,
                      children: resDistrict.data.Data.map((ele) => {
                        return {
                          ...ele,
                          value: ele.DistrictId,
                          label:
                            localStorage.getItem("i18nextLng") === "la"
                              ? ele.DistrictName
                              : ele.DistrictNameEng,
                          isLeaf: false,
                          type: "district",
                        };
                      }),
                    };
                  } else {
                    return {
                      ...el,
                      value: el.Id,
                      label:
                        localStorage.getItem("i18nextLng") === "la"
                          ? el.ValueOfLao
                          : el.ValueOfEng,
                      isLeaf: false,
                      type: "province",
                    };
                  }
                })
              );
              setValueLocation([idProvince, idDistrict]);
              setLoading(false);
            })
            .catch((error) => {
              messageError({
                content: error,
                duration: 2,
              });
            });
        };
        fetchAllDataEdit(idVillage.substr(0, 2), idVillage);
      }
    } else {
      const fetchDataProvince = async () => {
        setLoading(true);
        return await dataDictionaryApi
          .GetAllProvince({
            keyword: null,
          })
          .then((res) => {
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
            setValueLocation(idVillage ? [idVillage] : ["All"]);
            setLoading(false);
          })
          .catch((error) => {
            messageError({
              content: error,
              duration: 2,
            });
          });
      };
      fetchDataProvince();
    }
  }, [history.location]);

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
  }, [dataLanguage]);

  const fetchDataProvinceData = () => {
    return dataDictionaryApi.GetAllProvince({
      keyword: null,
    });
  };

  const fetchDataDistrictData = (idProvince) => {
    return houseHoldApi.getAllDistrict({
      provinceId: idProvince,
    });
  };

  const fetchDataVillageData = (districtId) => {
    return houseHoldApi.getAllVillage({
      districtId: districtId,
    });
  };
  const onChange = (value) => {
    setValueLocation(value);
    setFilterVillage(value[value.length - 1]);
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

  const dropdownRender = (menus) => {
    return (
      <div>
        {menus}
        <Divider style={{ margin: 0 }} />
        <div
          style={{
            padding: 4,
          }}
        >
          <div
            style={{
              width: "90px",
              padding: 3,
              border: "1px solid blue",
              borderRadius: "4px",
              color: "blue",
            }}
            className="pointer d-flex justify-content-center"
            onClick={(event) => {
              event.preventDefault();
              setFilterVillage("all");
              setValueLocation(["All"]);
            }}
          >
            Select All
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex flex-column flex-start">
      {listDistrict && listVillage ? <div></div> : null}
      <span style={{ fontSize: "12px" }}>
        {t("Select Province/ District/ Village")}
      </span>
      <Cascader
        disabled={loading}
        options={options}
        loadData={loadData}
        onChange={onChange}
        changeOnSelect
        value={valueLocation || []}
        dropdownRender={dropdownRender}
        className="class-cascader"
        popupClassName="class-cascaderac"
        placeholder={t("Select Province/ District/ Village")}
        allowClear={false}
      />
    </div>
  );
}
