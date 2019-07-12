/**
 * 给身份设置api权限
 */

import React from "react";
import { connect } from "dva";
import { Form, Icon, Input, Button, Select } from "antd";

import AdduserCss from "@/pages/Home/users/AddUser/AddUser.scss";
const { Option } = Select;
function AddViewCom(props) {
  const handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }
  const { getFieldDecorator } = props.form;
  return (
    <div className={AdduserCss.borderBox}>
      <div className={AdduserCss.btn}>给身份设置api权限</div>
      
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
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择api接口权限"
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

AddViewCom.propTypes = {};

export default connect()(Form.create()(AddViewCom));
