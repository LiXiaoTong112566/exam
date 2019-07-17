/**
 * 给身份设置视图权限
 */

import React, { useEffect } from "react";
import { connect } from "dva";
import { Form,Button, Select, message } from "antd";

import AdduserCss from "@/pages/Home/users/AddUser/AddUser.scss";
const { Option } = Select;

function SetViewCom(props) {
  useEffect(() => {
    props.getUserModel();
    props.getViewModel();
    if (props.setViewData) {
      if (props.setViewData.code === 1) {
        message.success(props.setViewData.msg);
      } else {
        message.error(props.setViewData.msg);
      }
    }
  }, [props.setViewData]);

  //重置
  function handleReset() {
    props.form.resetFields();
  }

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.setView(values);
      }
    });

   
  };

  const { getFieldDecorator } = props.form;
  return (
    <div className={AdduserCss.borderBox}>
      <div className={AdduserCss.btn}>给身份设置视图权限</div>

      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("identity_id", {
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
          {getFieldDecorator("view_authority_id", {
            rules: [{ required: true, message: "请选择视图权限id!" }]
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择视图权限id"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {props.getViewData &&
                props.getViewData.map((item, index) => {
                  return (
                    <Option value={item.view_authority_id} key={"view" + index}>
                      {item.view_authority_text}
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
          <Button className="login-form-button" onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

SetViewCom.propTypes = {};

const mapStateToProps = state => {
  return {
    ...state.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //获取身份id
    getUserModel() {
      dispatch({
        type: "userData/getUserID"
      });
    },
    //获取视图权限id
    getViewModel() {
      dispatch({
        type: "userData/getView"
      });
    },

    //设置视图权限
    setView(data) {
      dispatch({
        type: "userData/setViewModel",
        payload: data
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(SetViewCom));
