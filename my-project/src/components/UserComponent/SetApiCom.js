/**
 * 给身份设置api权限
 */

import React, { useEffect } from "react";
import { connect } from "dva";
import { Form, Button, Select, message } from "antd";

import AdduserCss from "@/pages/Home/users/AddUser/AddUser.scss";
const { Option } = Select;
function AddViewCom(props) {
  useEffect(() => {
    props.getUserId();
    props.getApi();
    if (props.setApiData) {
      if (props.setApiData.code === 1) {
        message.success(props.setApiData.msg);
      } else {
        message.error(props.setApiData.msg);
      }
    }


  }, [props.setApiData]);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        //添加视图接口
        props.setApiIdent(values);
      }
    });

   
  };

  //重置
  function handleReset() {
    props.form.resetFields();
  }
  const { getFieldDecorator } = props.form;

  return (
    <div className={AdduserCss.borderBox}>
      <div className={AdduserCss.btn}>给身份设置api权限</div>

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
                    <Option value={item.identity_id} key={"id" + index}>
                      {item.identity_text}
                    </Option>
                  );
                })}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("api_authority_id", {
            rules: [{ required: true, message: "请选择api接口权限!" }]
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择api接口权限"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {props.getApiData &&
                props.getApiData.map((item, index) => {
                  return (
                    <Option
                      value={item.api_authority_id}
                      key={"apiData" + index}
                    >
                      {item.api_authority_text}
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

AddViewCom.propTypes = {};

const mapStateToProps = state => {
  return {
    ...state.userData
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    //获取用户身份
    getUserId() {
      dispatch({
        type: "userData/getUserID"
      });
    },
    //获取api接口权限
    getApi() {
      dispatch({
        type: "userData/getApiModel"
      });
    },
    //设置api接口权限

    setApiIdent(data) {
      dispatch({
        type: "userData/setApiModel",
        payload: data
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AddViewCom));
