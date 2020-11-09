import { Col, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

function ToolsForLivingComponent(props) {
  const { t } = useTranslation();
  const {
    StableOccupationAndIncome,
    dataLanguage,
    changeYesNoForQuestion,
  } = props;
  console.log("ToolsForLivingComponent");
  return (
    <Row className="px-2" gutter={[16, 16]}>
      <Col span={24} md={12}>
        <span className="font-weight-500">{t("UNDER_14_YEARS")}</span>:{" "}
        {StableOccupationAndIncome.TotalBellow_14 || ""}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">{t("BETWEEN_15-60")}</span>:{" "}
        {StableOccupationAndIncome.TotalBetween_15_60 || ""}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">{t("OVER_60")}</span>:{" "}
        {StableOccupationAndIncome.TotalAbove_60 || ""}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">
          {t("WORKING_GROUPS_OF_REGULAR_FAMILY_MEMBERS")}
        </span>
        :{" "}
        {dataLanguage === "la"
          ? StableOccupationAndIncome.MainJob || ""
          : StableOccupationAndIncome.MainJobEng || ""}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">
          {t("MAIN_OCCUPATIONS_OF_MOST_FAMILY_MEMBERS")}
        </span>
        :{" "}
        {dataLanguage === "la"
          ? StableOccupationAndIncome.MainGoods || ""
          : StableOccupationAndIncome.MainGoodsEng || ""}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">
          {t("SOURCES_OTHER_THAN_THEIR_MAIN_SOURCE_OF_INCOME")}
        </span>
        : {changeYesNoForQuestion(StableOccupationAndIncome.ReceivedBenfits)}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">
          {t("HAVE_FAMILY_MEMBERS_BORROWED_FROM_OTHER_PARTIES")}
        </span>
        : {changeYesNoForQuestion(StableOccupationAndIncome.OweCredit)}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">{t("TYPE_OF_LENDER")}</span>:{" "}
        {dataLanguage === "la"
          ? StableOccupationAndIncome.TypeOfLender || ""
          : StableOccupationAndIncome.TypeOfLender || ""}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">
          {t("WHY_FAMILY_MEMBERS_BORROW_MONEY")}
        </span>
        :{" "}
        {dataLanguage === "la"
          ? StableOccupationAndIncome.BorrowingReason || ""
          : StableOccupationAndIncome.BorrowingReasonEng || ""}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">
          {t(
            "DOES_ANY_FAMILY_MEMBER_RUN_ANY_FARM_ON_THEIR_OWN_LAND_OR_LEASED_LAND"
          )}
        </span>
        : {changeYesNoForQuestion(StableOccupationAndIncome.OwnAgri)}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">{t("LAND_OWNED_OR_LEASED")}</span>:{" "}
        {changeYesNoForQuestion(StableOccupationAndIncome.MemberWork)}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">
          {t("SPECIFY_THE_NUMBER_OF_PLOTS")}
        </span>
        : {StableOccupationAndIncome.PlotRepeatCount}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">{t("NUMBER_OF_RELATED_PLOTS")}</span>:{" "}
        {StableOccupationAndIncome.NumberPlots || ""}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">
          {t("LIVESTOCK_RAISING_IN_THE_LAST_12_MONTHS")}
        </span>
        : {changeYesNoForQuestion(StableOccupationAndIncome.LiveStock)}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">
          {t("LOWER_SECONDARY_EDUCATION")}
        </span>
        : {StableOccupationAndIncome.CompletedPrimarySchool || ""}
      </Col>
    </Row>
  );
}

export default ToolsForLivingComponent;
