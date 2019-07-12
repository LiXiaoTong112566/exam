/**
 * 添加用户的界面
 */

import React, { useState, useEffect } from "react";
import { connect } from "dva";
import AdduserCss from "@/pages/Home/users/AddUser/AddUser.scss";
import { Tabs, Input, Select, Button, Icon, Form, Checkbox } from "antd";
const { Option } = Select;
const { TabPane } = Tabs;

function AddUserCom(props) {
  //提交
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  const { getFieldDecorator } = props.form;

  function callback(key) {
    console.log(key)
  }

  function onChange() {}

  function onFocus() {}

  function onBlur() {}

  function onSearch() {}

  function addUserData() {}

  return (
    <div className={AdduserCss.borderBox}>
      <Tabs  onChange={callback} animated={false}>
        <TabPane tab="添加用户" type="card" key="1">
          <Form onSubmit={handleSubmit} className="login-form">
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
                  placeholder="Username"
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
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请选择身份id"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                确定
              </Button>
              <Button className="login-form-button">重置</Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="更新用户" key="2">
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请选择身份id"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </Form.Item>
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
                  placeholder="Username"
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
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请选择身份id"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                确定
              </Button>
              <Button className="login-form-button">重置</Button>
            </Form.Item>
          </Form>
        </TabPane>

     
      </Tabs>
    </div>
  );
}

AddUserCom.propTypes = {};

export default connect()(Form.create()(AddUserCom));
