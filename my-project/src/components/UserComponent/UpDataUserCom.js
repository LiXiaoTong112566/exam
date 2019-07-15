import React, { useEffect } from "react";
import { connect } from "dva";

import {
 
  Input,
  Select,
  Button,
  Icon,
  Form,
 
  message
} from "antd";
const { Option } = Select;
//更新用户
function UpDataUserCom(props) {
  useEffect(() => {
    if (props.upDataUserData) {
      if (props.upDataUserData.code === 1) {
        message.success(props.upDataUserData.msg);
      } else {
        message.error(props.upDataUserData.msg);
      }
    }
  }, [props.upDataUserData]);

  const { getFieldDecorator } = props.form;

  //更新用户

  const handleSubmitUpdata = e => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      let { user_id, user_name, user_pwd, identity_id } = values;

      if (!err) {
        if (user_id) {
          props.upDataUser({ user_id, user_name, user_pwd, identity_id });
        }
      }
    });
  };

  function handleReset() {
    props.form.resetFields();
  }

  return (
    <Form onSubmit={handleSubmitUpdata} className="login-form">
      <Form.Item>
        {getFieldDecorator("user_id", {
          rules: [{ required: true, message: "请选择身份id!" }]
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
            {props.userAllData &&
              props.userAllData.map((item, index) => {
                return (
                  <Option value={item.user_id} key={index}>
                    {item.user_name}
                  </Option>
                );
              })}
          </Select>
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("user_name", {
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
        {getFieldDecorator("user_pwd", {
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
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("identity_id", {
          rules: [{ required: true, message: "Please input your Password!" }]
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
                  <Option value={item.identity_id} key={index}>
                    {item.identity_text}
                  </Option>
                );
              })}
          </Select>
        )}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          确定
        </Button>
        <Button className="login-form-button" onClick={handleReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}

UpDataUserCom.propTypes = {};

const mapStateToProps = state => {
  return {
    ...state.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //更改用户数据
    upDataUser(data) {
      dispatch({
        type: "userData/upDataUserModel",
        payload: data
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(UpDataUserCom));
