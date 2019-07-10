import React,{useState,useEffect} from 'react';
import { connect } from 'dva';
import styles from './IndexPage.scss'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
function IndexPage(props) {
    const { getFieldDecorator } = props.form;
    useEffect(()=>{
      console.log(props)
        // props.login({user_name:"chenmanjie",user_paw:"Chenmanjie123!"})
    },[])

    
    let handleSubmit = (e)=>{
      e.preventDefault();
      props.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          props.login({user_name: values.username, user_pwd: values.password});
          console.log('Received values of form: ', values);
        }
      });

      if(props.isLogin){
         props.history.push('/home')
       }

    }
      

    return (
        <div className="longinW">
            <Form onSubmit={handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('username', {
                      validateTrigger:'onBlur',
                      rules: [
                        { required: true, message: 'Please input your username!' },
                        { min: 6,max:15, message: 'Please input your correct username!' },
                      ],
                    })(
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                      />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                      // validateTrigger:'onBlur',
                      rules: [
                        { required: true, message: 'Please input your password!' },
                        { pattern:/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!#@*&.]).*$/, message: 'Please input your correct password!' },
                      ],
                    })(
                      <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="Password"
                    />,
                    )}
                </Form.Item>
                <Form.Item>
                <Checkbox>Remember me</Checkbox>
                  <a className="login-form-forgot" href="">
                    Forgot password
                  </a>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                
                </Form.Item>
        </Form>
        </div>
    );
}

IndexPage.propTypes = {
};

const mapStateToProps = state => {
  return {...state.login}
}

const mapDispatchToPorps = dispatch=>{
  return {
    login: payload=>{
      //payload :用户名密码
      dispatch({
        type: 'login/login',
        payload
      })
    }
  }
}


export default connect(mapStateToProps,mapDispatchToPorps)(Form.create()(IndexPage));
