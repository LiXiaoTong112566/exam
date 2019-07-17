import React, { useEffect } from 'react';
import { connect } from 'dva';
import styles from './login.scss';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

function Login(props) {

  //起到了componentDidMount的作用
  // useEffect(() => {
  //   props.login({ user_name: 'chenmanjie', user_pwd: 'Chenmanjie123!' })
  // }, [])

  useEffect(() => {

    if (props.isLogin === 1) {
      message.success('登陆成功')
      let path = '/home';
      if (props.location.search) {
        path = decodeURIComponent(props.location.search.split('=')[1])
      }
      props.history.push(path)
    } else if (props.isLogin === 0) {
      message.error('用户名或密码错误')
    }
  }, [props.isLogin])

  //处理表单提交
  let handleSubmit = (e) => {
    // e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.login({ user_name: values.username, user_pwd: values.password })

      }
    });
  }
  const { getFieldDecorator } = props.form;

  return (
    <div className={styles.wrap}>
      <div className={styles.normal}>
        <Form className={styles['login-form']} onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              validateTrigger: 'onBlur',
              rules: [{ required: true, message: 'Please input your username!' },
              { min: 6, max: 15, message: '请输入最少6个字符，最多15个字符' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0, .25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              validateTrigger: 'onBlur',
              rules: [{ required: true, message: 'Please input your Password!' },
              { pattern: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!#@*&.]).*$/, message: 'Please input your Passworddddd' }],
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
            <a className={styles["login-form-forgot"]} href="">
              Forgot password
          </a>
            <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>
              登录
          </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>

  );
}

Login.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    ...state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: payload => {
      dispatch({
        type: 'login/login',
        payload
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));
