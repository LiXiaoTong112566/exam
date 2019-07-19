
import styles from  "./IndexPage.scss";

import React, { useEffect, useState } from "react";

import { Route, NavLink, Redirect,Switch} from "dva/router";
import { connect } from "dva";
import { Layout, Menu, Dropdown, Icon, message,  Modal, Form} from "antd";
//试题管理
import AddItem from "./qusetion/AddItem/AddItem";
import CheckItem from "./qusetion/CheckItem/CheckItem";
import QuestionClassify from "./qusetion/QuestionClass/QuestionClass";
//用户管理
import AddUser from "./users/AddUser/AddUser";
import ShowUser from "./users/ShowUser/ShowUser";
//考试管理
import AddExam from "./exam/AddExam/AddExam";
import ExamList from "./exam/ExamList/ExamList";
import ExamEdit from "./exam/ExamEdit/ExamEdit";


//班级管理
import ClassManage from "./grade/ClassManage/ClassManage";
import GradeManage from "./grade/GrandeManage/GradeManage";
import StudentManage from "./grade/SturentManage/StudentManage";
//阅卷管理
import AwaitClass from "./Marking/AwaitClass/AwaitClass.js";
import TestClass from "./Marking/testClass/testClass.js";
import ReadExam from "./Marking/readExam/readExam.js";
//试题详情
import Detail from "./qusetion/CheckItem/detail";
//编辑试题
import DetailCompile from "./qusetion/CheckItem/detailCompile"
//kaoshiguanli
import ExamListDetail from "./exam/ExamList/detailX/ExamListDetail"
import {injectIntl} from 'react-intl';
import axios from 'axios'

const { Sider } = Layout;
const { SubMenu } = Menu;

function IndexPage(props) {
  const [visible, setvisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    return () => {};
  });
  
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  //
  let showModal = () => {
    setvisible(true);
  };
  console.log(inputValue)
    //点击确定
    let handleOk = () => {
      setvisible(false);
      
      if (inputValue) {
       props.upDataUserSerS({
          user_id:props.userInfoz.user_id,
          avatar:inputValue
       })
       props.userInfo()

      }
    };

      //点击取消
  let handleCancel = () => {
    setvisible(false);
  };

  let inp=(e)=>{
     let form=new FormData();
     console.log(e.nativeEvent.target)
     form.append(e.nativeEvent.target.files[0].name,e.nativeEvent.target.files[0])
     axios.post('http://123.206.55.50:11000/upload',form).then(res=>{
        if(res.data.code===1){
            setInputValue(res.data.data[0].path)
        }
     })
  }
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1" onClick={showModal}>个人中心</Menu.Item>
      <Menu.Item key="2">我的班级</Menu.Item>
     
      <Menu.Item key="3">设置</Menu.Item>
      <Menu.Item key="4">退出登录</Menu.Item>
    </Menu>
  );
  // 在获取我的路由之前啥也不渲染
  if (!props.myView.length){
    return null;
  }
  console.log(props.forbiddenView)
  return (
    <div className={styles['wrapper']}>
      <div className={styles["header"]}>
        <div className={styles["header_left"]}>
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg" alt=""/>
        </div>
        <div className={styles['header_right']}>
              {/* 头部 */}
            <button onClick={()=>props.changeLocale(props.intl.locale==='en'?'zh':'en')}>{props.intl.locale==='en'?'英文':'中文'}</button>
          <Dropdown overlay={menu}>
            <a className={styles["ant-dropdown-link"]} >
              <img src={props.userInfoz.avatar} alt=""/>
             <span>chenmanjie</span>
            </a>
          </Dropdown>
          
        </div>
      </div>
     
      <Layout className={styles['ant-layout']}>
        <Sider collapsible>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">

            {
              props.myView.map((item,index)=>{
                 return <SubMenu
                 key={item.name}
                 title={
                   <span>
                     <Icon type="user" />
                     <span>{props.intl.formatMessage({id:item.name })}</span>
                   </span>
                 }
               >
                 {
                   item.children.map(value=>{
                     return <Menu.Item key={value.name}>
                     <NavLink to={value.path}>{props.intl.formatMessage({id: value.name})}</NavLink>
                   </Menu.Item>
                   })
                 }
                 
               </SubMenu>
              })
            }
            
          </Menu>
        </Sider>
        <Layout>
          <Switch>
          <Redirect from="/home" exact to="/home/AddItem"/>
              {
                // {/* 配置用户拥有的路由 */}
                props.myView.map((item,index)=>{
                    return item.children.map((value,index)=>{
                      // console.log(value)
                        return <Route key={value.path} path={value.path} component={value.components} />
                    })
                })
              }
              
              {
                //  {/* 配置用户禁止访问的路由 */}
                props.forbiddenView.map((item,index)=>{
                  // console.log(item)
                    return  <Redirect  from={item.path} to="/403"></Redirect>
                })
              }
              {/* 配置不存在的路由 */}
              <Redirect to="/404"></Redirect>
          </Switch>
           

          <Route path="/home/detail/:id" component={Detail} />
          <Route path="/home/detailCompile/:id" component={DetailCompile} />
          <Route path="/home/exam/examEdit" component={ExamEdit} />
          <Route path="/home/ExamListDetail/:id" component={ExamListDetail} />


        </Layout>
      </Layout>
      <Modal
            title="创建新类型"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="确认"
            cancelText="取消"
          > 
            <input type="text" onChange={(e)=>{inp(e)}} />
            <input type="file" onChange={(e)=>{inp(e)}} />
          </Modal> 
    </div>
  );
}
const mapStateToProps = state => {
  return { ...state.login};
};
const mapDispatchToProps = dispatch=>{
  return {
    changeLocale: payload=>{
      dispatch({
        type: 'global/updateLocale',
        payload
      })
    },
    upDataUserSerS: payload=>{
      dispatch({
        type: 'login/upDataUserSer',
        payload
      })
    },
    userInfo: payload=>{
      dispatch({
        type: 'login/userInfo',
        payload
      })
    },
    upDataUserSer: payload=>{
      dispatch({
        type: 'login/upDataUserSer',
        payload
      })
    },
  }
}
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Form.create()(IndexPage)))