import { Button, message, Modal } from "antd";
import React from "react";
import houseHoldApi from "../../../../api/houseHoldApi";
import { useTranslation } from "react-i18next";

function ModalDeleteHousehold(props) {
  const { visibleDeleteHH, setVisibleDeleteHH, HHCode, reloadApi } = props;
  const { t } = useTranslation();

  const handleDeleteHouseHold = async () => {
    setVisibleDeleteHH(false);
    await houseHoldApi.deleteHouseHold({ householdId: HHCode }).then((res) => {
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
  return (
    <>
      <Modal
        title={<span className="text-danger">Are you sure?</span>}
        visible={visibleDeleteHH}
        onCancel={() => {
          setVisibleDeleteHH(false);
        }}
        footer={null}
      >
        <div className="confirm-delete-hh text-right">
          <Button className="mr-2" size={"small"}>
            {t("CANCEL")}
          </Button>
          <Button
            type={"primary"}
            size={"small"}
            danger
            onClick={handleDeleteHouseHold}
          >
            {t("DELETE")}
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ModalDeleteHousehold;
