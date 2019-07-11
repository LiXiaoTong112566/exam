import React, { useEffect, useState } from "react";
import "./IndexPage.css";
import { Router, Route, Switch, NavLink } from "dva/router";
import { connect } from "dva";
import { Layout, Menu, Dropdown, Breadcrumb, Icon, message } from "antd";
//试题管理
import AddItem from "./qusetion/AddItem";
import CheckItem from "./qusetion/CheckItem";
import QuestionClassify from "./qusetion/QuestionClass";
//用户管理
import AddUser from "./users/AddUser";
import ShowUser from "./users/ShowUser";
//考试管理
import AddExam from "./exam/AddExam";
import ExamList from "./exam/ExamList";
//班级管理
import ClassManage from "./grade/ClassManage";
import GradeManage from "./grade/GradeManage";
import StudentManage from "./grade/StudentManage";
//阅卷管理
import AwaitClass from "./Marking/AwaitClass";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function IndexPage() {
  useEffect(() => {
    return () => {};
  });

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">个人中心</Menu.Item>
      <Menu.Item key="2">我的班级</Menu.Item>
     
      <Menu.Item key="3">设置</Menu.Item>
      <Menu.Item key="4">退出登录</Menu.Item>
    </Menu>
  );

  return (
    <div className="wrapper">
      <div className="header">
        <div className="header_left">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg"
            alt=""
          />
        </div>
        <div className="header_right">
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
             <img src="https://cdn.nlark.com/yuque/0/2019/png/anonymous/1547609339813-e4e49227-157c-452d-be7e-408ca8654ffe.png?x-oss-process=image/resize,m_fill,w_48,h_48/format,png" alt=""/>
             <span>chenmanjie</span>
            </a>
          </Dropdown>
          
        </div>
      </div>

      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>试题管理</span>
                </span>
              }
            >
              <Menu.Item key="1">
                <NavLink to="/home/addItem">添加试题</NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to="/home/classifyItem">试题分类</NavLink>
              </Menu.Item>
              <Menu.Item key="3">
                <NavLink to="/home/checkItem">查看试题</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>用户管理</span>
                </span>
              }
            >
              <Menu.Item key="4">
                <NavLink to="/home/addUser">添加用户</NavLink>
              </Menu.Item>
              <Menu.Item key="5">
                <NavLink to="/home/showUser">用户展示</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="team" />
                  <span>考试管理</span>
                </span>
              }
            >
              <Menu.Item key="6">
                <NavLink to="/home/addExam">添加考试</NavLink>
              </Menu.Item>
              <Menu.Item key="7">
                <NavLink to="/home/examList">试卷列表</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="team" />
                  <span>班级管理</span>
                </span>
              }
            >
              <Menu.Item key="8">
                <NavLink to="/home/gradeManage">班级管理</NavLink>
              </Menu.Item>
              <Menu.Item key="9">
                <NavLink to="/home/classManage">教室管理</NavLink>
              </Menu.Item>
              <Menu.Item key="10">
                <NavLink to="/home/studentManage">学生管理</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub5"
              title={
                <span>
                  <Icon type="team" />
                  <span>阅卷管理</span>
                </span>
              }
            >
              <Menu.Item key="11">
                <NavLink to="/home/awaitClass">待批班级</NavLink>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Route path="/home/addItem" component={AddItem} />
          <Route path="/home/classifyItem" component={QuestionClassify} />
          <Route path="/home/checkItem" component={CheckItem} />
          <Route path="/home/addUser" component={AddUser} />
          <Route path="/home/showUser" component={ShowUser} />
          <Route path="/home/addExam" component={AddExam} />
          <Route path="/home/examList" component={ExamList} />
          <Route path="/home/classManage" component={ClassManage} />
          <Route path="/home/gradeManage" component={GradeManage} />
          <Route path="/home/studentManage" component={StudentManage} />
          <Route path="/home/awaitClass" component={AwaitClass} />
        </Layout>
      </Layout>
    </div>
  );
}

export default connect()(IndexPage);
