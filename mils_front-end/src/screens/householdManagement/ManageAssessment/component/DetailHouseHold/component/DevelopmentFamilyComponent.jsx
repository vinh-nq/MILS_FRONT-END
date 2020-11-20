import { Col, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

function DevelopmentComponent(props) {
  const { DevelopmentFamilyViewModel, changeYesNoForQuestion } = props;
  const { t } = useTranslation();
  return (
    <>
      <Row className="px-2" gutter={[16, 16]}>
        <Col span={24}>
          <span className="font-weight-600">{t("LOCATION_OF_HOUSEHOLD")}</span>:{" "}
          {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev1_1)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">{t("LAND_CERTIFICATE")}</span>:{" "}
          {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev1_2)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">
            {t("THE_FAMILY_HAS_A_HOUSE_A_PERMANENT_SHELTER")}
          </span>
          : {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev2_1)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">
            {t(
              "BUILDINGS_RELATED_TO_THE_HOUSE_SUCH_AS_KITCHENS_LATRINES_STABLES_HORTICULTURE_WOODEN_GARDENS_ARE_ARRANGED_TO_BE_CLEAN_BEAUTIFUL_SAFE_AND_CONVENIENT_TO_USE"
            )}
          </span>
          : {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev2_2)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">
            {t("CONTRIBUTED_CAPITAL_OR_LABOR_TO_VILLAGE_DEVELOPMENT")}
          </span>
          : {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev3_1)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">
            {t(
              "CONTRIBUTE_TO_THE_PROTECTION_OF_STATE_INVESTED_SOCIO_ECONOMIC_INFRASTRUCTURE_AND_MAKE_THE_MOST_OF_IT"
            )}
          </span>
          : {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev3_2)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">
            {t(
              "BE_A_MODEL_FARMING_FAMILY_IN_TERMS_OF_PRODUCTION_AS_A_COMMODITY_OR_ANY_PRODUCTION_OR_OTHER_OCCUPATION_THAT_GENERATES_A_STEADY_INCOME_FOR_THE_FAMILY_WITHOUT_BREAKING_THE_RULES"
            )}
          </span>
          : {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev4_1)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">
            {" "}
            {t(
              "FAMILIES_MUST_HAVE_AN_AVERAGE_INCOME_HIGHER_THAN_THE_REGIONAL_AVERAGE"
            )}
          </span>
          : {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev5_1)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">
            {" "}
            {t(
              "AS_A_FAMILY_WITH_A_GOOD_EDUCATION_POLICY_PRE-SCHOOL_CHILDREN_(0-3_YEARS_OLD)_MUST_ATTEND_BOARDING_SCHOOL_OR_KINDERGARTEN_FAMILIES_WITH_SCHOOL-AGE_CHILDREN_MUST_ATTEND_PRIMARY_SCHOOL_AS_REQUIRED"
            )}
          </span>
          : {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev6_1)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">
            {t("BE_A_ROLE_MODEL_HEALTH_FAMILY")}
          </span>
          : {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev6_2)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">{t("A_CULTURAL_FAMILY")}</span>:{" "}
          {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev6_3)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">
            {t(
              "AS_A_FAMILY_EXERCISE_GENDER_EQUALITY_PROMOTE_CHILD_DEVELOPMENT_AND_REFRAIN_FROM_VIOLENCE_AGAINST_WOMEN_AND_CHILDREN"
            )}
          </span>
          : {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev6_4)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">
            {t(
              "FAMILY_MEMBERS_AGED_15_AND_OVER_ARE_EDUCATED_IN_POLITICS_MINDFULNESS_AND_PARTICIPATION_IN_THE_VILLAGE_DEVELOPMENT_PROCESS"
            )}
          </span>
          : {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev7_1)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">{t("A_UNITED_FAMILY")}</span>:{" "}
          {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev7_2)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">
            {t("BEING_A_MODEL_FAMILY_FOLLOWING_THE_LAW")}
          </span>
          : {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev7_3)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">
            {t("A_FAMILY_OF_3_GOOD_WOMEN")}
          </span>
          : {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev7_4)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">{t("A_DRUG_FREE_FAMILY")}</span>:{" "}
          {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev7_5)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">
            {t("A_GOOD_DEFENSIVE_FAMILY")}
          </span>
          : {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev8_1)}
        </Col>
        <Col span={24}>
          <span className="font-weight-600">
            {t("A_GOOD_PEACE_LOVING_FAMILY")}
          </span>
          : {changeYesNoForQuestion(DevelopmentFamilyViewModel.Dev8_2)}
        </Col>
      </Row>
    </>
  );
}

export default DevelopmentComponent;
