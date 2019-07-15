/** 
 * 添加身份页面
*/

import React from 'react';
import {connect} from "dva";
import { Form, Icon, Input, Button } from 'antd';
import AdduserCss from "@/pages/Home/users/AddUser/AddUser.scss";


function AddTheCom(props){

   const handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };
      const { getFieldDecorator } = props.form;
    return (
        
        <div className={AdduserCss.borderBox}>
             <div className={AdduserCss.btn}>添加身份</div>
        <Form onSubmit={handleSubmit} className="login-form">
       
        <Form.Item>
          {getFieldDecorator('password', {
        validateTrigger: "onBlur",
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              type="text"
              placeholder="请输入身份名称"
            />,
          )}
        </Form.Item>
        <Form.Item>
          
         
          <Button type="primary" htmlType="submit" className="login-form-button">
            确定
          </Button>
          <Button type="primary" htmlType="submit" className="login-form-button">
            确重置
          </Button>
        
        </Form.Item>
      </Form>
      </div>
      
       
    )

}

AddTheCom.propTypes={

}

export default connect()(Form.create()(AddTheCom))