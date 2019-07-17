/**
 * 添加api接口权限
 */

import React,{useEffect} from "react";
import { connect } from "dva";
import { Form,  Input, Button, message } from "antd";
import AdduserCss from "@/pages/Home/users/AddUser/AddUser.scss";

function APICom(props) {

  useEffect(()=>{
    if (props.addApiData) {
      if (props.addApiData.code === 1) {
        message.success(props.addApiData.msg);
      } else {
        message.error(props.addApiData.msg);
      }
    }

  },[props.addApiData])
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.addapiFn(values);
      }
    });

   
  };
  const { getFieldDecorator } = props.form;

  //重置
  function handleReset() {
    props.form.resetFields();
  }
  return (
    <div className={AdduserCss.borderBox}>
      <div className={AdduserCss.btn}>添加api接口权限</div>

      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("api_authority_text", {
            validateTrigger: "onBlur",
            rules: [{ required: true, message: "请输入api接口权限名称!" }]
          })(<Input type="text" placeholder="请输入api接口权限名称" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("api_authority_url", {
            validateTrigger: "onBlur",
            rules: [{ required: true, message: "请输入api接口权限url!" }]
          })(<Input type="text" placeholder="请输入api接口权限url" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("api_authority_method", {
            validateTrigger: "onBlur",
            rules: [{ required: true, message: "请输入api接口权限方法!" }]
          })(<Input type="text" placeholder="请输入api接口权限方法" />)}
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

APICom.propTypes = {};
const mapStateToProps = (state, ownProps) => {
  return {
    ...state.userData
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addapiFn: data => {
      dispatch({
        type: "userData/addApimodel",
        payload: data
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(APICom));
