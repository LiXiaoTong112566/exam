import { Router, Route, Switch,NavLink } from 'dva/router';
import React,{Component} from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './index.scss'
import AddQ from "./questions/addQ";
import LookQ from "./questions/lookQ";
import QuestionsL from "./questions/questionsL";
import AddUser from "./userControl/addUser";
import Usershow from "./userControl/userShow";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Home(){
    return(
        <div>
          <Layout style={{ minHeight: '100vh' }}>
          <Sider>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    <span>试题管理</span>
                  </span>
                }
              >
                  <Menu.Item key="1"><NavLink to="/home/addQ" value='添加试题'>添加试题</NavLink></Menu.Item>
                  <Menu.Item key="2"><NavLink to="/home/lookQ">试题分类</NavLink></Menu.Item>
                  <Menu.Item key="3"><NavLink to="/home/questionsL">查看试题</NavLink></Menu.Item>
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
                    <Menu.Item key="4"><NavLink to="/home/adduser">添加用户</NavLink></Menu.Item>
                    <Menu.Item key="5"><NavLink to="/home/usershow">用户展示</NavLink></Menu.Item>
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
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
              </Breadcrumb>
              {/* 右边 */}
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  <Route path='/home/addQ' component={AddQ}></Route>
                  <Route path='/home/lookQ' component={LookQ}></Route>
                  <Route path='/home/questionsL' component={QuestionsL}></Route>
                  <Route path='/home/adduser' component={AddUser}></Route>
                  <Route path='/home/usershow' component={Usershow}></Route>

              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
        </div>
    )
}



Home.propTypes = {
};

export default connect()(Home);
