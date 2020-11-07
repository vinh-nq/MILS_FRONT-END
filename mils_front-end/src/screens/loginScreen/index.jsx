import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./login.scss";
import { Alert, Form, Input, Button, message } from "antd";
import * as _ from "lodash";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import imageLogo from "./images/MAF_Logo.jpg";
import getTokenApi from "../../api/getTokenApi";
import Cookies from "universal-cookie";
import upperCase from "lodash/upperCase";

function Login(props) {
  const [isHover, setIsHover] = useState("");
  const [error, setError] = useState("");
  const [errorReset, setErrorReset] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);
  const [errorRecoverPassword, setErrorRecoverPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const [loadingRecoverPassword, setLoadingRecoverPassword] = useState(false);
  const [form] = Form.useForm();
  const [formReset] = Form.useForm();
  const [formNewPassword] = Form.useForm();
  // const [userId, setUserId] = useState(null);
  const history = useHistory();
  const [className, setClassName] = useState("login-container");
  const { t } = useTranslation();
  const [visibleModal, setVisibleModal] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    form.resetFields();
    formReset.resetFields();
  }, [form, formReset]);

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
        console.log(res);
        cookies.set(
          "user",
          {
            token: res.access_token,
            userId: res.UserId,
            fullName: res.FullName,
            UserName: res.UserName
          },
          { path: "/", maxAge: 60 * 60 * 24 * 7 }
        );
        message.success(t("LOGIN_SUCCESS"));
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        setError(upperCase(err.response.data.error_description));
      });
  };

  const onReset = async (value) => {
    setLoadingReset(true);
    // return await accountManagementApi
    //   .sendEmail({
    //     email: value.email,
    //   })
    //   .then((res) => {
    //     if (res.data.Status) {
    //       setLoadingReset(false);
    //       setErrorReset();
    //       setVisibleModal(true);
    //       setUserId(res.data.ReturnValue);
    //     } else {
    //       setLoadingReset(false);
    //       setErrorReset(res.data.Messages);
    //     }
    //   });
  };

  const handleSignInClick = () => {
    setVisibleModal(false);
    if (className === "login-container") {
      setClassName("login-container right-panel-active");
      formReset.resetFields();
    } else {
      setClassName("login-container");
      form.resetFields();
    }
  };

  const recoverPassword = async (value) => {
    if (!errorConfirmPassword && confirmPassword) {
      setLoadingRecoverPassword(true);
      // return await accountManagementApi
      //   .recoverPassword({
      //     NguoiDungId: userId,
      //     MaXacThuc: value.code,
      //     MatKhau: value.password,
      //   })
      //   .then((res) => {
      //     setLoadingRecoverPassword(false);
      //     if (res.data.Status) {
      //       message.success(res.data.Messages);
      //       handleSignInClick();
      //       formNewPassword.resetFields();
      //       setConfirmPassword("");
      //       setErrorRecoverPassword(null);
      //     } else {
      //       formNewPassword.resetFields();
      //       setConfirmPassword("");
      //       setErrorRecoverPassword(res.data.Messages);
      //     }
      //   });
    }
    if (!confirmPassword) {
      setErrorConfirmPassword("Mật khẩu không giống nhau");
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center backgroud-login"
      style={{ height: "100vh" }}
    >
      <div className="login-wrapper">
        <div className={className}>
          <div
            className="form-container sign-up-container"
            style={{ overflow: "auto" }}
          >
            <div className="form-intro d-flex flex-column align-items-center h-100">
              <div className="w-100 d-flex align-items-center justify-content-center mt-5">
                <Link to="dang-nhap" className="">
                  <img src={imageLogo} alt={"logo-dark"} height={170} />
                </Link>
              </div>
              <div className="login-form-container w-100 mt-3">
                <Form
                  form={formNewPassword}
                  className="w-100 pr-3 pl-3"
                  name="form-confirm-password-123"
                  onFinish={recoverPassword}
                  style={{ display: `${visibleModal ? "" : "none"}` }}
                >
                  <div className="d-flex flex-column">
                    <span htmlFor="username" style={{ fontSize: "12px" }}>
                      Chúng tôi đã gửi mã Code đến mail của bạn.
                    </span>
                    <span htmlFor="username" style={{ fontSize: "12px" }}>
                      Vui lòng nhập mã Code để tạo mật khẩu mới.
                    </span>
                  </div>
                  <div className="pt-2">
                    <span className="text-style-email-reset pt-2">Code</span>
                    <Form.Item
                      name="code"
                      rules={[
                        {
                          required: true,
                          message: `${t("Code")} ${t("is_not_empty")}`,
                        },
                      ]}
                      className="mt-1"
                    >
                      <Input
                        style={{ fontSize: "15px" }}
                        onChange={() => {
                          setErrorRecoverPassword(null);
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <span htmlFor="username" className="text-style-email-reset">
                      Mật khẩu mới
                    </span>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: `${t("Password")} ${t("is_not_empty")}`,
                        },
                      ]}
                      className="mt-1"
                    >
                      <Input.Password
                        style={{ fontSize: "15px" }}
                        onChange={(event) => {
                          setErrorRecoverPassword(null);
                          if (confirmPassword) {
                            if (confirmPassword === event.target.value) {
                              setErrorConfirmPassword(null);
                            } else {
                              setErrorConfirmPassword(
                                "Mật khẩu không giống nhau"
                              );
                            }
                          }
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <span
                      htmlFor="username"
                      className="text-style-email-reset "
                    >
                      Xác nhận mật khẩu mới
                    </span>
                    <div
                      className={`${
                        errorConfirmPassword
                          ? "ant-row ant-form-item ant-form-item-with-help mt-1 ant-form-item-has-error"
                          : ""
                      }`}
                    >
                      <Input.Password
                        style={{ fontSize: "15px" }}
                        value={confirmPassword}
                        onChange={(event) => {
                          setConfirmPassword(event.target.value);
                          setErrorRecoverPassword(null);
                          if (
                            formNewPassword.getFieldValue("password") ===
                            event.target.value
                          ) {
                            setErrorConfirmPassword(null);
                          } else {
                            setErrorConfirmPassword(
                              "Mật khẩu không giống nhau"
                            );
                          }
                        }}
                      />
                      <div className="ant-form-item-explain">
                        {errorConfirmPassword}
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 mb-1 w-100">
                    {_.isEmpty(errorRecoverPassword) ? null : (
                      <Alert
                        message={errorRecoverPassword}
                        type="error"
                        showIcon
                      />
                    )}
                  </div>
                  <div className="w-100 mt-2">
                    <Button
                      type="primary"
                      form="form-confirm-password-123"
                      key="submit"
                      htmlType="submit"
                      className="w-100 d-flex align-items-center justify-content-center"
                      loading={loadingRecoverPassword}
                      style={{ height: "35px" }}
                    >
                      <span
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        Đặt lại mật khẩu
                      </span>
                    </Button>
                  </div>
                </Form>
                {/* ) : ( */}
                <>
                  <Form
                    form={formReset}
                    className="w-100 pr-3 pl-3"
                    name="form-reset"
                    onFinish={onReset}
                    style={{ display: `${visibleModal ? "none" : ""}` }}
                  >
                    <div>
                      <span
                        htmlFor="username"
                        className="text-style-email-reset"
                      >
                        Input email to reset password.
                      </span>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            type: "email",
                            message: t("required_email"),
                          },
                          {
                            required: true,
                            message: `${t("email")} ${t("is_not_empty")}`,
                          },
                        ]}
                        className="mt-1"
                      >
                        <Input
                          type="email"
                          style={{ fontSize: "15px" }}
                          onChange={() => {
                            setErrorReset();
                          }}
                        />
                      </Form.Item>
                    </div>
                  </Form>
                  <div className="mt-1 mb-1 w-100 pr-3 pl-3">
                    {_.isEmpty(errorReset) ? null : (
                      <Alert message={errorReset} type="error" showIcon />
                    )}
                  </div>
                  <div
                    className="pr-3 pl-3 w-100 mt-2"
                    style={{ display: `${visibleModal ? "none" : ""}` }}
                  >
                    <Button
                      type="primary"
                      form="form-reset"
                      key="submit"
                      htmlType="submit"
                      className="w-100 d-flex align-items-center justify-content-center"
                      loading={loadingReset}
                      style={{ height: "35px" }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        Send email reset password
                      </span>
                    </Button>
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-end mt-2 pr-2"
                    style={{ display: `${visibleModal ? "none" : ""}` }}
                  >
                    <Button
                      type="link"
                      style={{ fontSize: "14px" }}
                      onClick={handleSignInClick}
                    >
                      Back To Login
                    </Button>
                  </div>
                </>
                {/* )} */}
              </div>
            </div>
          </div>
          <div className="form-container sign-in-container">
            <div
              className="form-intro d-flex flex-column align-items-center h-100"
              style={{ overflow: "auto" }}
            >
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
                      <Button
                        type="link"
                        style={{ fontSize: "14px" }}
                        onClick={handleSignInClick}
                      >
                        Forgot Password ?
                      </Button>
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
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left d-flex flex-column align-items-center justify-content-end pb-4">
                <div className="d-flex flex-column align-items-center">
                  <span
                    className="content-style"
                    style={{
                      textShadow: `${
                        isHover ? "0 0 6px #fff" : "0 0 4px #7b7b7b"
                      }`,
                    }}
                    onMouseEnter={() => {
                      setIsHover(true);
                    }}
                    onMouseLeave={() => {
                      setIsHover(false);
                    }}
                  >
                    JB Tech
                  </span>
                </div>
              </div>
              <div className="overlay-panel overlay-right d-flex flex-column align-items-center justify-content-end pb-4">
                <div className="d-flex flex-column align-items-center">
                  <span
                    className="content-style"
                    style={{
                      textShadow: `${
                        isHover ? "0 0 6px #fff" : "0 0 4px #7b7b7b"
                      }`,
                    }}
                    onMouseEnter={() => {
                      setIsHover(true);
                    }}
                    onMouseLeave={() => {
                      setIsHover(false);
                    }}
                  >
                    JB Tech
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
