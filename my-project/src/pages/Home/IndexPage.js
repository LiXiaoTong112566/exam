import styles from "./IndexPage.scss";
import axios from "axios";

import React, { useState, useEffect } from "react";

import { Route, NavLink } from "dva/router";
import { connect } from "dva";
import { Layout, Menu, Dropdown, Icon, message, Spin, Modal } from "antd";
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
import DetailCompile from "./qusetion/CheckItem/detailCompile";
//kaoshiguanli
import ExamListDetail from "./exam/ExamList/detailX/ExamListDetail";
import { injectIntl } from "react-intl";
import Axios from "axios";

const { Sider } = Layout;
const { SubMenu } = Menu;

function IndexPage(props) {

  const [newPath, setNewPath] = useState("");
  const [visible, setvisible] = useState(false);
  
  const onClick = ({ key }) => {
    console.log(key);
    if (key == 1) {
      setvisible(true);
    }
  };
  console.log(newPath);
  let handleOk = () => {
    console.log(newPath);
    console.log(123);
    props.upDataUserAvatar({
      user_id: props.userInfoData.user_id,
      avatar: newPath
    });

    setvisible(false);
  };

  let handleCancel = () => {
    console.log("取消")
    setvisible(false);
  };

  //获取input框的值
  function getFileData(e) {
    console.log(e.nativeEvent);
    const data = e.nativeEvent.target.files;
    let form = new FormData();
    form.append(data[0].name, data[0]);
    console.log(form.get(e.target.files[0].name));
    console.log(props);
    console.log(props.userInfoData);

    axios.post("http://123.206.55.50:11000/upload", form).then(res => {
      console.log(res.data);
      if (res.data.code === 1) {
        console.log(res.data.data[0].path);
        setNewPath(res.data.data[0].path);//设置新的图片路径
      }
    });
  }

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1" >个人中心</Menu.Item>
      <Menu.Item key="2">我的班级</Menu.Item>
      <Menu.Item key="3">设置</Menu.Item>
      <Menu.Item key="4">退出登录</Menu.Item>

    </Menu>
  );

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["header"]}>
        <div className={styles["header_left"]}>
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg"
            alt=""
          />
        </div>
        <div className={styles["header_right"]}>
          {/* 头部 */}
          <button
            onClick={() =>
              props.changeLocale(props.intl.locale == "en" ? "zh" : "en")
            }
          >
            {props.intl.locale == "en" ? "英文" : "中文"}
          </button>
          <Dropdown overlay={menu}>
            <a className={styles["ant-dropdown-link"]}>
              <img
                src={props.userInfoData.avatar}
                alt=""
              />
              <span>chenmanjie</span>
            </a>
          </Dropdown>
        </div>
      </div>

      <Layout className={styles["ant-layout"]}>
        <Sider collapsible>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>
                    {props.intl.formatMessage({ id: "router.questions" })}
                  </span>
                </span>
              }
            >
              <Menu.Item key="1">
                <NavLink to="/home/addItem">
                  {props.intl.formatMessage({ id: "router.questions.add" })}
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to="/home/classifyItem">
                  {props.intl.formatMessage({ id: "router.questions.type" })}
                </NavLink>
              </Menu.Item>
              <Menu.Item key="3">
                <NavLink to="/home/checkItem">
                  {props.intl.formatMessage({ id: "router.questions.view" })}
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>
                    {props.intl.formatMessage({ id: "router.management" })}
                  </span>
                </span>
              }
            >
              <Menu.Item key="4">
                <NavLink to="/home/addUser">
                  {props.intl.formatMessage({ id: "router.management.add" })}
                </NavLink>
              </Menu.Item>
              <Menu.Item key="5">
                <NavLink to="/home/showUser">
                  {props.intl.formatMessage({ id: "router.management.view" })}
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="team" />
                  <span>
                    {props.intl.formatMessage({ id: "router.examination" })}
                  </span>
                </span>
              }
            >
              <Menu.Item key="6">
                <NavLink to="/home/addExam">
                  {props.intl.formatMessage({ id: "router.examination.add" })}
                </NavLink>
              </Menu.Item>
              <Menu.Item key="7">
                <NavLink to="/home/examList">
                  {props.intl.formatMessage({ id: "router.examination.list" })}
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="team" />
                  <span>
                    {props.intl.formatMessage({ id: "router.classManagement" })}
                  </span>
                </span>
              }
            >
              <Menu.Item key="8">
                <NavLink to="/home/gradeManage">
                  {props.intl.formatMessage({ id: "router.classManagement" })}
                </NavLink>
              </Menu.Item>
              <Menu.Item key="9">
                <NavLink to="/home/classManage">
                  {props.intl.formatMessage({
                    id: "router.classRoomManagement"
                  })}
                </NavLink>
              </Menu.Item>
              <Menu.Item key="10">
                <NavLink to="/home/studentManage">
                  {props.intl.formatMessage({ id: "router.Stylexamination" })}
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub5"
              title={
                <span>
                  <Icon type="team" />
                  <span>
                    {props.intl.formatMessage({ id: "router.Marking" })}
                  </span>
                </span>
              }
            >
              <Menu.Item key="11">
                <NavLink to="/home/awaitClass">
                  {props.intl.formatMessage({ id: "router.AwaitingApproval" })}
                </NavLink>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>

        <Layout>
          <div>
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
            <Route path="/home/readExam" component={ReadExam} />
            <Route path="/home/testClass/:id" component={TestClass} />
            <Route path="/home/detail/:id" component={Detail} />
            <Route path="/home/detailCompile/:id" component={DetailCompile} />
            <Route path="/home/exam/examEdit" component={ExamEdit} />
            <Route path="/home/ExamListDetail/:id" component={ExamListDetail} />
            {props.loadingFlag ? (
              <div className={styles.loading}>
                <Spin />
              </div>
            ) : null}
          </div>
        </Layout>
      </Layout>
   
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <input
          type="file"
          onChange={e => {
            getFileData(e);
          }}
        />
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  console.log(state);
  return {
    loadingFlag: state.loading.global,
    ...state.login
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeLocale: payload => {
      dispatch({
        type: "global/updateLocale",
        payload
      });
    },
    //修改用户信息
    upDataUserAvatar: payload => {
      dispatch({
        type: "login/upDataUser",
        payload
      });
    },

   
  };
};
export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IndexPage)
);
