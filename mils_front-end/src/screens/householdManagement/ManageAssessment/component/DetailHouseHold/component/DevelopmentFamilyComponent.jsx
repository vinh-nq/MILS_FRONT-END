import { Col, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

function DevelopmentComponent(props) {
  const { t } = useTranslation();
  return (
    <>
      <Row className="px-2" gutter={[16, 16]}>
        <Col span={24}>
          <span className="font-weight-500">
            {t(
              "THE_FAMILY_HAS_SET_UP_THE_HOUSE_ACCORDING_TO_THE_DEFINED_VILLAGE_PLAN"
            )}
          </span>
          :{" "}
        </Col>
        <Col span={24}>
          <span className="font-weight-500">
            {t(
              "EVERY_PIECE_OF_LAND_YOU_AND_YOUR_FAMILY_MEMBERS_HAVE_A_LAND_TITLE_DEED"
            )}
          </span>
          :{" "}
        </Col>
        <Col span={24}>
          <span className="font-weight-500">
            {t("THE_FAMILY_HAS_A_HOUSE_A_PERMANENT_SHELTER")}
          </span>
          :{" "}
        </Col>
        <Col span={24}>
          <span className="font-weight-500">
            {t("HOME_RELATED_STRUCTURES_SUCH_AS_KITCHENS")}
          </span>
          :{" "}
        </Col>
        <Col span={24}>
          <span className="font-weight-500">
            {t("CONTRIBUTED_CAPITAL_OR_LABOR_TO_THE_DEVELOPMENT_OF_H7_VILLAGE")}
          </span>
          :{" "}
        </Col>
        <Col span={24}>
          <span className="font-weight-500">
            {t(
              "BE_A_MODEL_FARMING_FAMILY_IN_TERMS_OF_PRODUCTION_AS_A_COMMODITY"
            )}
          </span>
          :{" "}
        </Col>
        <Col span={24}>
          <span className="font-weight-500">
            {t(
              "HOUSEHOLDS_MUST_HAVE_AN_AVERAGE_INCOME_HIGHER_THAN_THE_REGIONAL_AVERAGE"
            )}
          </span>
          :{" "}
        </Col>
        <Col span={24}>
          <span className="font-weight-500">
            {" "}
            {t("AS_A_FAMILY_WITH_A_GOOD_EDUCATION_POLICY")}
          </span>
          :{" "}
        </Col>
        <Col span={24}>
          <span className="font-weight-500">
            {" "}
            {t("AS_A_HEALTH_FAMILY_MODEL_H15")}
          </span>
          :{" "}
        </Col>
        <Col span={24}>
          <span className="font-weight-500">{t("H16_CULTURAL_FAMILY")}</span>:{" "}
        </Col>
        <Col span={24}>
          <span className="font-weight-500">
            {t("REFRAIN_FROM_VIOLENCE_AGAINST_WOMEN_AND_CHILDREN")}
          </span>
          :{" "}
        </Col>
        <Col span={24}>
          <span className="font-weight-500">
            {t(
              "FAMILY_MEMBERS_AGED_15_AND_OVER_ARE_EDUCATED_IN_THE_CONCEPT_OF_POLITICS"
            )}
          </span>
          :{" "}
        </Col>
        <Col span={24}>
          <span className="font-weight-500">{t("H20_SOLIDARITY_FAMILY")}</span>:{" "}
        </Col>
        <Col span={24}>
          <span className="font-weight-500">
            {t(
              "BE_A_MODEL_FAMILY_IMPLEMENTING_THE_LAW_(A_FAMILY_FREE_OF_LAWSUITS)_H21"
            )}
          </span>
          :{" "}
        </Col>
        <Col span={24}>
          <span className="font-weight-500">
            {t("A_GOOD_FEMALE_FAMILY_3_H22")}
          </span>
          :{" "}
        </Col>
        <Col span={24}>
          <span className="font-weight-500">
            {t("BEING_A_DRUG_FREE_FAMILY_H23")}
          </span>
          :{" "}
        </Col>
        <Col span={24}>
          <span className="font-weight-500">
            {t("A_GOOD_DEFENSE_FAMILY_H25")}
          </span>
          :{" "}
        </Col>
        <Col span={24}>
          <span className="font-weight-500">
            {t("A_GOOD_SECURITY_FAMILY_H26")}
          </span>
          :{" "}
        </Col>
      </Row>
    </>
  );
}

export default DevelopmentComponent;
