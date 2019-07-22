import styles from "./IndexPage.scss";
import axios from "axios";

import React, { useState, useEffect } from "react";

import { Route, NavLink, Redirect, Switch } from "dva/router";
import { connect } from "dva";
import { Layout, Menu, Dropdown, Icon, message, Spin, Modal } from "antd";

import { injectIntl } from "react-intl";
import Axios from "axios";

const { Sider } = Layout;
const { SubMenu } = Menu;

function IndexPage(props) {
  //在获取我的路由之前啥也不渲染
  if (!props.myView.length) {
    return null;
  }

  const [newPath, setNewPath] = useState("");
  const [visible, setvisible] = useState(false);

  const onClick = ({ key }) => {
    if (key == 1) {
      setvisible(true);
    }
  };

  let handleOk = () => {
    props.upDataUserAvatar({
      user_id: props.userInfoData.user_id,
      avatar: newPath
    });

    setvisible(false);
  };

  let handleCancel = () => {
    setvisible(false);
  };

  //获取input框的值
  function getFileData(e) {
    const data = e.nativeEvent.target.files;
    let form = new FormData();
    form.append(data[0].name, data[0]);

    axios.post("http://123.206.55.50:11000/upload", form).then(res => {
      if (res.data.code === 1) {
        setNewPath(res.data.data[0].path); //设置新的图片路径
      }
    });
  }

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">个人中心</Menu.Item>
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
              <img src={props.userInfoData.avatar} alt="" />
              <span>chenmanjie</span>
            </a>
          </Dropdown>
        </div>
      </div>

      <Layout className={styles["ant-layout"]}>
        <Sider collapsible>
          <Menu
            theme="dark"
            // defaultSelectedKeys={"props.myView[0].name"}
            mode="inline"
          >
            {props.myView.map(item => {
              return (
                <SubMenu
                  key={item.name}
                  title={
                    <span>
                      <Icon type="user" />
                      <span>{props.intl.formatMessage({ id: item.name })}</span>
                    </span>
                  }
                >
                  {item.children.map(value => {
                    return (
                      value.name && (
                        <Menu.Item key={value.name}>
                          <NavLink to={value.path}>
                            {props.intl.formatMessage({ id: value.name })}
                          </NavLink>
                        </Menu.Item>
                      )
                    );
                  })}
                </SubMenu>
              );
            })}
          </Menu>
        </Sider>

        <Layout>
          <div>
            {/* 二级路由区域 */}
            <Switch>
              <Redirect from="/home" exact to="/home/addItem" />
              {/* 配置用户拥有的路由 */}
              {props.myView.map(item => {
                return item.children.map(value => {
                  return (
                    <Route
                      key={value.name}
                      path={value.path}
                      component={value.components}
                    />
                  );
                });
              })}

              {/* 配置用户禁止访问的路由 */}
              {props.forbiddenView.map(item => {
                return <Redirect key={item.name} from={item.path} to="/403" />;
              })}

              {/* //配置不存在的路由 */}
              <Redirect to="/404" />
            </Switch>

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
    }
  };
};
export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IndexPage)
);
