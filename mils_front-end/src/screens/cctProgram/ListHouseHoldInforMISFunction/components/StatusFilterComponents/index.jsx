import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function StatusComponents(props) {
  const { t } = useTranslation();
  const { arrayListStatus, selectedItemsId, setSelectItemId } = props;
  // const arrayListStatus = [
  //   {
  //     statusID: "all",
  //     statusTitle: "All",
  //     color: "#00e8ff",
  //   },
  //   {
  //     statusID: "100",
  //     statusTitle: "Reject",
  //     color: "red",
  //   },
  //   {
  //     statusID: "200",
  //     statusTitle: "Pending",
  //     color: "orange",
  //   },
  //   {
  //     statusID: "300",
  //     statusTitle: "Approve",
  //     color: "#43dc43",
  //   },
  // ];
  // const [selectedItemsId, setSelectItemId] = useState("all");
  const [itemHover, setItemHover] = useState(0);

  return (
    <div className="w-100 d-flex flex-row justify-content-end">
      {arrayListStatus.map((item, index) => (
        <div
          className="col-xl-3 col-lg-3 col-sm-3 col-3 pl-1 pr-1 pointer hoverItem"
          key={item.statusID}
          style={{
            borderRight: `${
              index === arrayListStatus.length - 1 ? null : "1px solid #b1b5c4"
            }`,
            height: "25px",
          }}
          onClick={(event) => {
            event.preventDefault();
            setSelectItemId(item.statusID);
          }}
          onMouseEnter={(event) => {
            event.preventDefault();
            setItemHover(item.statusID);
          }}
          onMouseLeave={(event) => {
            event.preventDefault();
            setItemHover(0);
          }}
        >
          <div
            className="w-100 h-100 d-flex justify-content-center flex-row align-items-center "
            style={{
              backgroundColor: `${
                selectedItemsId === item.statusID
                  ? "#1d50b3de"
                  : itemHover === item.statusID
                  ? "#00b9ff24"
                  : "#fff"
              }`,
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                height: "12px",
                width: "12px",
                minWidth: "12px",
                borderRadius: "50%",
                backgroundColor: `${item.color}`,
              }}
              className="mr-2"
            ></div>
            <span
              style={{
                fontSize: "15px",
                fontWeight: "500",
                color: `${selectedItemsId === item.statusID ? "#fff" : "#000"}`,
              }}
            >
              {item.statusTitle}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
