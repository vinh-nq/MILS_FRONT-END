import { Col, Form, Input, Row, Typography } from "antd";
import { handleValidateFrom } from "../../../../utils/handleValidateFrom";
import { objectValidateForm } from "../validate/objectValidateForm";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GoogleMapReact from "google-map-react";

const Marker = (props) => {
  const { name } = props;
  return (
    <span className="text-danger pointer" title={name}>
      <i className="fas fa-map-marker-alt font-24"></i>
    </span>
  );
};

let timeOut = "";

function LocationMapComponent(props) {
  const { typeModal, LatLongForBeneficiary } = props;
  const [defaultProps, setDefaultProps] = useState({
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 10,
  });

  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");

  const { t } = useTranslation();
  const { TextArea } = Input;
  const { Text } = Typography;

  useEffect(() => {
    if (typeModal === "UPDATE") {
      setDefaultProps({
        center: {
          lat: Number(LatLongForBeneficiary.Lat) || 0,
          lng: Number(LatLongForBeneficiary.Long) || 0,
        },
        zoom: 10,
      });
    }
  }, []);

  useEffect(() => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      if (long && lat) {
        setDefaultProps({
          center: {
            lat: Number(lat),
            lng: Number(long),
          },
          zoom: 10,
        });
      }
    }, 2000);
  }, [long, lat]);

  const onLongLatChange = (e, type) => {
    if (type === "LONG") {
      setLong(e.target.value);
    } else {
      setLat(e.target.value);
    }
  };

  return (
    <Row className="mb-2" gutter={[16, 16]}>
      <Col span={24}>
        <Text className="font-13 font-weight-500">{t("DESCRIPTION")}</Text>
        <Form.Item
          name={["LatLongForBeneficiary", "Description"]}
          className="mb-0"
        >
          <TextArea
            autoSize={{ minRows: 2, maxRows: 3 }}
            showCount
            maxLength={200}
          />
        </Form.Item>
      </Col>
      <Col span={24} md={12}>
        <Text className="font-13 font-weight-500">
          Longitude<span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </Text>
        <Form.Item
          name={["LatLongForBeneficiary", "Long"]}
          className="mb-0"
          rules={[
            {
              validator(rule, value) {
                return handleValidateFrom(
                  rule,
                  value,
                  objectValidateForm.checkString(20, true, "Longitude"),
                  t
                );
              },
            },
          ]}
        >
          <Input
            onChange={(e) => {
              onLongLatChange(e, "LONG");
            }}
          />
        </Form.Item>
      </Col>
      <Col span={24} md={12}>
        <Text className="font-13 font-weight-500">
          Latitude<span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </Text>
        <Form.Item
          name={["LatLongForBeneficiary", "Lat"]}
          className="mb-0"
          rules={[
            {
              validator(rule, value) {
                return handleValidateFrom(
                  rule,
                  value,
                  objectValidateForm.checkString(20, true, "Latitude"),
                  t
                );
              },
            },
          ]}
        >
          <Input
            onChange={(e) => {
              onLongLatChange(e, "LAT");
            }}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <div style={{ height: "400px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDFscFGDtZL1daD8iYZKxFrGn2FXdHbMbw",
            }}
            center={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <Marker
              lat={defaultProps.center.lat}
              lng={defaultProps.center.lng}
              name="Location"
            />
          </GoogleMapReact>
        </div>
      </Col>
    </Row>
  );
}

export default LocationMapComponent;
