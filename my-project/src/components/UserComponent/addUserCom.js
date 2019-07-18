/**
 * 添加用户的界面
 */

import React, { useEffect } from "react";
import { connect } from "dva";
import AdduserCss from "@/pages/Home/users/AddUser/AddUser.scss";
import UpDataUserCom from "@/components/UserComponent/UpDataUserCom";

import {
  Tabs,
  Input,
  Select,
  Button,
  Icon,
  Form,
 
  message
} from "antd";
const { Option } = Select;
const { TabPane } = Tabs;

function AddUserCom(props) {
  //提交添加用户
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if(!err){
          props.addUser({
            user_name: values.username,
            user_pwd: values.password,
            identity_id: values.identityId
          });
       
      }
      
    });

    if (props.addUserType) {
      if (props.addUserType.code === 1) {
        message.success(props.addUserType.msg);
      } else {
        message.error(props.addUserType.msg);
      }
    }
  };

  useEffect(() => {
    props.getUserIdent();
    props.getUserData();
    if (props.addUserType) {
      if (props.addUserType.code === 1) {
        message.success(props.addUserType.msg);
      } else {
        message.error(props.addUserType.msg);
      }
    }

    
    // 
  }, [props.addUserType]);

  const { getFieldDecorator } = props.form;

  function handleReset() {
    props.form.resetFields();
  }

  return (
    <div className={AdduserCss.borderBox}>
      <Tabs animated={false}>
        <TabPane tab="添加用户" type="card" key="1">
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
             
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
                // validateTrigger: "onBlur",
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
              {getFieldDecorator("identityId", {
                rules: [
                  { required: true, message: "Please input your Id!" }
                ]
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择身份id"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {props.userIdentData &&
                    props.userIdentData.map((item, index) => {
                      return (
                        <Option value={item.identity_text} key={index}>
                          {item.identity_text}
                        </Option>
                      );
                    })}
                </Select>
              )}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                确定
              </Button>
             
            </Form.Item>
            <Form.Item>
            <Button className="login-form-button" onClick={handleReset}>
                重置
              </Button>
              </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="更新用户" key="2">
          <UpDataUserCom />
        </TabPane>
      </Tabs>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    ...state.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //添加用户
    addUser(payload) {
      dispatch({
        type: "userData/addUserData",
        payload: payload
      });
    },

    //获取用户身份
    getUserIdent() {
      dispatch({
        type: "userData/getUserID"
      });
    },

    //获取用户数据
    getUserData() {
      dispatch({
        type: "userData/getUserModel"
      });
    }
  };
};

AddUserCom.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AddUserCom));
