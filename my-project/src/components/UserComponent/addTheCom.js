/**
 * 添加身份页面
 */

import React, { useEffect } from "react";
import { connect } from "dva";
import { Form, Input, Button,  message } from "antd";
import AdduserCss from "@/pages/Home/users/AddUser/AddUser.scss";

function AddTheCom(props) {
 
  function handleReset() {
    props.form.resetFields();
  }

  useEffect(()=>{
    if (props.addUIData) {
     
      if (props.addUIData.code === 1) {
        message.success(props.addUIData.msg);
      } else if(props.addUIData.code===0){
        message.error(props.addUIData.msg);
      }
    }
  },[props.addUIData])

  //提交

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
     
      if (!err) {
       
        props.addIdent({ identity_text: values.text });
        
      }

    });

   
  };

  const { getFieldDecorator } = props.form;
  return (
    <div className={AdduserCss.borderBox}>
      <div className={AdduserCss.btn}>添加身份</div>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("text", {
            rules: [{ required: true, message: "请输入名称" }]
          })(<Input type="text" placeholder="请输入身份名称" />)}
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

AddTheCom.propTypes = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIdent(payload) {
     
      dispatch({
        type: "userData/addUserIdent",
        payload: payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AddTheCom));
