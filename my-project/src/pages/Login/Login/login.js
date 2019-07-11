import React, { useState, useEffect } from "react";
import "./login.css";
import { connect } from "dva";
import { Form, Icon, Input, Button, Checkbox,message } from "antd";

function Login(props) {
  const { getFieldDecorator } = props.form;
  // console.log("props...",props);

  //判断是否登录成功
  useEffect(() => {
    if(props.isLogin===1){
      message.success("登录成功");
      let path="/";
      console.log(props);
      if(props.location.search){
        path=decodeURIComponent(props.location.search)
        
      }
      props.history.push(path);


    }else if(props.isLogin===0){
      message.success("用户名或密码错误")

    }
   
   
  }, [props.isLogin
]);
  let handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.login({ user_name: values.username, user_pwd: values.password });
        console.log("Received values of form: ", values);
        console.log(props);
        if (props.isLogin) {
          props.history.push("/home");
        }
      }
    });
  };

  return (
    <div className="wrapper">
      <div className="wrapper-form">
        <Form className="login-form" onSubmit={handleSubmit}>
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
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              validateTrigger: "onBlur",
              rules: [
                { required: true, message: "Please input your Password!" },
                {
                  pattern: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!#@*&.]).*$/,
                  message: "Please input your correct password"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="请输入密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Checkbox>记住密码</Checkbox>
            <a className="login-form-forgot" href="">
              忘记密码
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
    </div>
  );
}

const mapStateToProps = state => {
  return {
    ...state.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: payload => {
      dispatch({
        type: "login/login",
        payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Login));
