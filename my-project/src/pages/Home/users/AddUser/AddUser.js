/** 
 * 添加用户的页面
*/

import React from "react";
import { connect } from "dva";
import AdduserCss from "./AddUser.scss";
import AddUserCom from "@/components/UserComponent/addUserCom"; //添加用户
import AddTheCom from "@/components/UserComponent/addTheCom"; //添加身份
import APICom from "@/components/UserComponent/APICom"; //添加api接口权限
import AddViewCom from "@/components/UserComponent/addViewCom"; //添加api接口权限
import SetApiCom from "@/components/UserComponent/SetApiCom"; //给身份设置api接口权限
import SetViewCom from "@/components/UserComponent/setViewCom"; //添加api接口权限

//添加用户名
function AddUser(props) {
  return (
    <div className={AdduserCss.addUserBox}>
      <h1>添加用户</h1>
      <div className={AdduserCss.main}>
        <AddUserCom />
        <AddTheCom />
        <APICom />
        <AddViewCom />
        <SetApiCom />
        <SetViewCom />
      </div>
    </div>
  );
}

AddUser.propTypes = {};

export default connect()(AddUser);
