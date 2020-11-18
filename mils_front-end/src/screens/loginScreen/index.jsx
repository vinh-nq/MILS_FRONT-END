import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./login.scss";
import { Alert, Form, Input, Button, message } from "antd";
import * as _ from "lodash";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import imageLogo from "./images/logo.png";
import getTokenApi from "../../api/getTokenApi";
import Cookies from "universal-cookie";
import upperCase from "lodash/upperCase";

function Login(props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    form.resetFields();
  }, [form]);

  const onSubmit = async (value) => {
    setLoading(true);
    const cookies = new Cookies();
    await getTokenApi
      .getToken({
        username: value.username,
        password: value.password,
        grant_type: "password",
      })
      .then((res) => {
        cookies.set(
          "user",
          {
            token: res.access_token,
            userId: res.UserId,
            fullName: res.FullName,
            UserName: res.UserName,
          },
          { path: "/", maxAge: 60 * 60 * 24 * 7 }
        );
        getTokenApi.insertLog(res.UserName).then((res) => {
          message.success(t("LOGIN_SUCCESS"));
          setLoading(false);
          history.push("/");
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(upperCase(err.response.data.error_description));
      });
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center backgroud-login"
      style={{ height: "100vh" }}
    >
      <div className="form-intro d-flex flex-column align-items-center login-container">
        <div className="w-100 d-flex align-items-center justify-content-center mt-4">
          <Link to="dang-nhap" className="text-center">
            <img src={imageLogo} alt={"logo-dark"} height={170} />
          </Link>
        </div>
        <div className="login-form-container w-100 mt-5">
          <Form
            form={form}
            className="w-100 pr-3 pl-3"
            name="form-login"
            onFinish={onSubmit}
          >
            <div>
              <span htmlFor="username" className="text-style">
                Username
              </span>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: `${t("username")} ${t("is_not_empty")}`,
                  },
                ]}
                className="mt-1"
              >
                <Input
                  style={{ fontSize: "15px" }}
                  onChange={() => {
                    setError();
                  }}
                />
              </Form.Item>
            </div>
            <div>
              <div className="d-flex align-items-center justify-content-between">
                <span htmlFor="username" className="text-style">
                  Password
                </span>
              </div>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: `${t("password")} ${t("is_not_empty")}`,
                  },
                ]}
                className="mt-1"
              >
                <Input.Password
                  style={{ fontSize: "15px" }}
                  onChange={() => {
                    setError();
                  }}
                />
              </Form.Item>
            </div>
          </Form>
          <div className="mt-1 mb-1 w-100 pr-3 pl-3">
            {_.isEmpty(error) ? null : (
              <Alert message={error} type="error" showIcon />
            )}
          </div>
          <div className="pt-2 pr-3 pl-3 w-100">
            <Button
              type="primary"
              form="form-login"
              key="submit"
              htmlType="submit"
              className="w-100 d-flex align-items-center justify-content-center"
              loading={loading}
              style={{ height: "35px" }}
            >
              <span
                style={{
                  fontSize: "16px",
                  paddingTop: "5px",
                }}
              >
                Login
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
