import { Router, Route, Switch, NavLink } from "dva/router";
import React, { Component } from "react";
import { connect } from "dva";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import "./index.scss";
import AddQ from "./questions/addQ";
import LookQ from "./questions/lookQ";
import QuestionsL from "./questions/questionsL";
import AddUser from "./userControl/addUser";
import Usershow from "./userControl/userShow";
import Detail from "./questions/detail"
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Home() {
  return (
    <div>
      <Header className="header" style={{ background: "#fff", padding: 0 }}>
        <img
          className="headerImg"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg"
          alt=""
        />
      </Header>
      <Layout style={{ minHeight: "91vh" }}>
        <Sider>
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
                <NavLink to="/home/addQ" value="添加试题">
                  添加试题
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to="/home/lookQ">试题分类</NavLink>
              </Menu.Item>
              <Menu.Item key="3">
                <NavLink to="/home/questionsL">查看试题</NavLink>
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
                <NavLink to="/home/adduser">添加用户</NavLink>
              </Menu.Item>
              <Menu.Item key="5">
                <NavLink to="/home/usershow">用户展示</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="user" />
                  <span>考试管理</span>
                </span>
              }
            >
              <Menu.Item key="6">添加考试</Menu.Item>
              <Menu.Item key="7">试卷列表</Menu.Item>
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
              <Menu.Item key="8">班级管理</Menu.Item>
              <Menu.Item key="9">教室管理</Menu.Item>
              <Menu.Item key="10">学生管理</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub5"
              title={
                <span>
                  <Icon type="user" />
                  <span>阅卷管理</span>
                </span>
              }
            >
              <Menu.Item key="11">待批班级</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                {/* 右边 */}
                <div
                  style={{ padding: 24, background: "##f0f2f5", minHeight: 850 }}
                >
                  <Route path="/home/addQ" component={AddQ} />
                  <Route path="/home/lookQ" component={LookQ} />
                  <Route path="/home/questionsL" component={QuestionsL} />
                  <Route path="/home/adduser" component={AddUser} />
                  <Route path="/home/usershow" component={Usershow} />
                  <Route path="/home/detail/:id" component={Detail} />
                </div>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

Home.propTypes = {};

export default connect()(Home);
