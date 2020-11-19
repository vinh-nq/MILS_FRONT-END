import { Col, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

function PrimaryPublicServiceComponent(props) {
  const { PrimaryPublicServiceForBeneficiary, changeYesNoForQuestion } = props;
  const { t } = useTranslation();
  return (
    <Row className="px-2" gutter={[16, 16]}>
      <Col span={24}>
        <span className="font-weight-500">
          {t("PRIMARY_SCHOOL_OR_LOWER_SECONDARY_SCHOOL")}
        </span>
        :{" "}
        {changeYesNoForQuestion(
          PrimaryPublicServiceForBeneficiary.PrimarySchool
        )}
      </Col>
      <Col span={24}>
        <span className="font-weight-500">
          {t("A_PERMANENT_(DAILY)_MARKET")}
        </span>
        : {changeYesNoForQuestion(PrimaryPublicServiceForBeneficiary.Market)}
      </Col>
      <Col span={24}>
        <span className="font-weight-500">{t("DISPENSARY_OR_HEALTH")}</span>:{" "}
        {changeYesNoForQuestion(PrimaryPublicServiceForBeneficiary.Dispensary)}
      </Col>
      <Col span={24}>
        <span className="font-weight-500">
          {t(
            "HOW_LONG_DOES_IT_NORMALLY_TAKE_TO_REACH_THE_DISPENSARY/HEALTH_POST"
          )}
        </span>
        : {PrimaryPublicServiceForBeneficiary.TimeDispensary}
      </Col>
      <Col span={24}>
        <span className="font-weight-500">
          {t("IS_THERE_A_HOSPITAL_IN_THIS_VILLAGE")}
        </span>
        : {changeYesNoForQuestion(PrimaryPublicServiceForBeneficiary.Hospital)}
      </Col>
      <Col span={24}>
        <span className="font-weight-500">
          {t("HOW_FAR_AWAY_IS_THE_NEAREST_HOSPITAL")}
        </span>
        : {PrimaryPublicServiceForBeneficiary.DistanceNearestHospital}
      </Col>
      <Col span={24}>
        <span className="font-weight-500">
          {t("HOW_LONG_DOES_IT_NORMALLY_TAKE_TO_REACH_ANY_HOSPITAL")}
        </span>
        : {PrimaryPublicServiceForBeneficiary.TImeNearestHospital}
      </Col>
      <Col span={24}>
        <span className="font-weight-500">
          {t(
            "IS_THERE_ANY_SCHEDULED_PASSENGER_TRANSPORT_STOPPING_IN_THIS_VILLAGE"
          )}
        </span>
        :{" "}
        {changeYesNoForQuestion(
          PrimaryPublicServiceForBeneficiary.TransportStop
        )}
      </Col>
      <Col span={24}>
        <span className="font-weight-500">
          {t("IS_THIS_VILLAGE_CONNECTED_TO_AN_ELECTRIC_NETWORK")}
        </span>
        :{" "}
        {changeYesNoForQuestion(
          PrimaryPublicServiceForBeneficiary.ElectricNetwork
        )}
      </Col>
    </Row>
  );
}

export default PrimaryPublicServiceComponent;
