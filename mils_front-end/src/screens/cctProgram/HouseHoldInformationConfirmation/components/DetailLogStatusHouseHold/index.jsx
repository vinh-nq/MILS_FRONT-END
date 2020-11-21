import React from "react";
import { Timeline, Empty } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import moment from "moment";

export default function DetailLogStatusHouseHold(props) {
  const { t } = useTranslation();
  const { timeLineAccount } = props;

  return (
    <div>
      <div className="d-flex align-items-center mb-3 p-2 title-detail-household">
        {t("REQUEST STATUS HISTORY")}
      </div>
      {timeLineAccount.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <div className="w-100 d-flex justify-content-start pl-2">
          <Timeline>
            {timeLineAccount.map((el) => (
              <Timeline.Item
                dot={<ClockCircleOutlined className="timeline-clock-icon" />}
                color="red"
                key={el.log_id}
              >
                <div className="d-flex flex-column justify-content-start">
                  <div>
                    <span
                      className="ml-1"
                      style={{ color: "#9c9c9c", fontStyle: "italic" }}
                    >
                      {el.log_datetime
                        ? moment(el.log_datetime).format("DD/MM/YYYY HH:mm:ss")
                        : t("No data")}
                    </span>
                  </div>
                  <div>
                    <span
                      className="ml-1"
                      style={{
                        fontWeight: "600",
                        color: "#0747a6",
                        fontSize: "15px",
                      }}
                    >
                      {el.user_name || t("No data")}
                    </span>
                  </div>
                  <div>
                    <span className="ml-1">
                      {el.log_action || t("No data")}
                    </span>
                  </div>
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      )}{" "}
    </div>
  );
}
