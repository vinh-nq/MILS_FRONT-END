// import React, { useEffect, useState } from "react";
// import { Tooltip, Button, Divider, Table, Input, Cascader } from "antd";
// import { PlusSquareOutlined, EditOutlined } from "@ant-design/icons";
// import { useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
// import { useHistory } from "react-router-dom";
// import LoadingSpinner from "../../../components/LoadingSpinner";
// import houseHoldApi from "../../../api/houseHoldApi";
// import dataDictionaryApi from "../../../api/dataDictionaryApi";
// import "./styles.scss";

// export default function indexCascaderFilter(props) {
//   const { t } = useTranslation();
//   const history = useHistory();
//   const [checkLoading, setCheckLoading] = useState(false);
//   const [listProvince, setListProvince] = useState([]);
//   const [listDistrict, setListDistrict] = useState([]);
//   const [listVillage, setListVillage] = useState([]);
//   const [options, setOptions] = useState([]);
//   const dataLanguage =
//     useSelector((state) => state.languageReducer.objectLanguage.value) ||
//     localStorage.getItem("i18nextLng");

//   useEffect(() => {
//     fetchDataProvince();
//   }, []);

//   useEffect(() => {
//     const data = options.map((el) => {
//       if (!el.children) {
//         return {
//           ...el,
//           label: dataLanguage === "la" ? el.ValueOfLao : el.ValueOfEng,
//         };
//       } else {
//         return {
//           ...el,
//           label: dataLanguage === "la" ? el.ValueOfLao : el.ValueOfEng,
//           loading: false,
//           children:
//             (el.children || []).map((ele) => {
//               if (!ele.children) {
//                 return {
//                   ...ele,
//                   loading: false,
//                   label:
//                     dataLanguage === "la"
//                       ? ele.DistrictName
//                       : ele.DistrictNameEng,
//                 };
//               } else {
//                 return {
//                   ...ele,
//                   loading: false,
//                   label:
//                     dataLanguage === "la"
//                       ? ele.DistrictName
//                       : ele.DistrictNameEng,
//                   children:
//                     (ele.children || []).map((elee) => {
//                       return {
//                         ...elee,
//                         label:
//                           dataLanguage === "la"
//                             ? elee.VillageName
//                             : elee.VillageNameEng,
//                       };
//                     }) || null,
//                 };
//               }
//             }) || null,
//         };
//       }
//     });
//     setOptions(data);
//   }, [dataLanguage]);

//   const fetchDataProvince = async () => {
//     setCheckLoading(true);
//     return await dataDictionaryApi
//       .GetAllProvince({
//         keyword: null,
//       })
//       .then((res) => {
//         setCheckLoading(false);
//         setListProvince(res.data.Data);
//         setOptions(
//           res.data.Data.map((el) => ({
//             ...el,
//             value: el.Id,
//             label: dataLanguage === "la" ? el.ValueOfLao : el.ValueOfEng,
//             isLeaf: false,
//             type: "province",
//           }))
//         );
//       });
//   };

//   const onChange = (value, selectedOptions) => {
//     console.log(value);
//   };

//   const loadData = (selectedOptions) => {
//     const targetOption = selectedOptions[selectedOptions.length - 1];
//     targetOption.loading = true;
//     if (targetOption.type === "province") {
//       const fetchDataDistrict = async (idProvince) => {
//         await houseHoldApi
//           .getAllDistrict({
//             provinceId: idProvince,
//           })
//           .then((res) => {
//             targetOption.loading = false;
//             targetOption.children = res.data.Data.map((el) => ({
//               ...el,
//               value: el.DistrictId,
//               label:
//                 dataLanguage === "la" ? el.DistrictName : el.DistrictNameEng,
//               isLeaf: false,
//               type: "district",
//             }));
//             setOptions(options);
//             setListDistrict(res.data.Data);
//           });
//       };
//       fetchDataDistrict(targetOption.value);
//     }
//     if (targetOption.type === "district") {
//       const fetchDataVillage = async (districtId) => {
//         await houseHoldApi.getAllVillage({ districtId }).then((res) => {
//           targetOption.loading = false;
//           targetOption.children = res.data.Data.map((el) => ({
//             ...el,
//             value: el.VillageId,
//             label: dataLanguage === "la" ? el.VillageName : el.VillageNameEng,
//           }));
//           setOptions(options);
//           setListVillage(res.data.Data);
//         });
//       };

//       fetchDataVillage(targetOption.value);
//     }
//   };

//   return (
//     <div className="w-100 h-100">
//       {checkLoading ? (
//         <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
//       ) : null}
//       <div className="d-flex flex-row align-items-center justify-content-between">
//         <span className="h5 mb-0">{t("EROLLMENT")}</span>
//       </div>
//       <Divider />
//       <Cascader
//         options={options}
//         loadData={loadData}
//         onChange={onChange}
//         changeOnSelect
//         style={{ width: "400px" }}
//         className="class-cascader"
//         popupClassName="class-cascaderac"
//         placeholder="Select Province/ District/ Village"
//       />

      
//     </div>
//   );
// }
