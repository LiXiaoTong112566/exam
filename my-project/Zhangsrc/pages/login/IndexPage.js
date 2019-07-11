import React, { useState, useEffect } from "react";
import { connect } from "dva";
import styles from "./IndexPage.scss";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
function IndexPage(props) {
  console.log(props)
  const { getFieldDecorator } = props.form;
  useEffect(() => {
    if (props.isLogin === 1) {
      console.log(1);
      message.success("登陆成功");
      let path = "/home";
      if (props.location.search) {
        path = decodeURIComponent(props.location.search.split("=")[1]);
        console.log(path);
      }
      props.history.push(path);
    } else if (props.isLogin === 0) {
      console.log(1);
      message.success("用户名或密码错误");
    }
  }, [props.isLogin]);

  let handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        props.login({ user_name: values.username, user_pwd: values.password });
        console.log("Received values of form: ", values);
      }
    });
  };

  return (
    <div className="longinW">
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator("username", {
            validateTrigger: "onBlur",
            rules: [
              { required: true, message: "Please input your username!" },
              {
                min: 6,
                max: 15,
                message: "Please input your correct username!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            // validateTrigger:'onBlur',
            rules: [
              { required: true, message: "Please input your password!" },
              {
                pattern: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!#@*&.]).*$/,
                message: "Please input your correct password!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Checkbox>Remember me</Checkbox>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

IndexPage.propTypes = {};

const mapStateToProps = state => {
  return { ...state.login };
};

const mapDispatchToPorps = dispatch => {
  return {
    login: payload => {
      //payload :用户名密码
      dispatch({
        type: "login/login",
        payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToPorps
)(Form.create()(IndexPage));
