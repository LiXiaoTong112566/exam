import React, { useState, useEffect } from "react";
import { connect } from "dva";
import useStyle from "./ShowUser.css";
import { Table } from "antd";
const { Column } = Table;

//用户数据展示信息
function UserData(props) {
  return (
    <div>
      <Table dataSource={props.userDatas}>
        <Column title="用户名" dataIndex="user_name" key="firstName" />
        <Column title="密码" dataIndex="user_pwd" key="lastName" />
        <Column title="身份" dataIndex="identity_text" key="action"  />
      </Table>
    </div>
  );
}
//身份数据
function Identity(props) {
  return (
    <Table dataSource={props.identityData}>
        <Column title="身份名称" dataIndex="identity_text" key="identity_text" />
    </Table>
  )
}
//接口权限
function Interface(props) {
  return (
    <Table dataSource={props.interfaceData}>
      <Column title="api权限名称" dataIndex="api_authority_text" key="firstName" />
      <Column title="api权限url" dataIndex="api_authority_url" key="lastName" />
      <Column title="api权限方法" dataIndex="api_authority_method" key="action"  />
  </Table>
  )
}
//接口关系
function Relationship(props) {
  // relationData
  return (
    <Table dataSource={props.relationData}>
      <Column title="身份名称" dataIndex="identity_text" key="firstName" />
      <Column title="api权限名称" dataIndex="api_authority_text" key="firstNazzme" />
      <Column title="api权限url" dataIndex="api_authority_url" key="lastName" />
      <Column title="api权限方法" dataIndex="api_authority_method" key="action"  />
  </Table>
  )
}
//接口视图
function InterfaceView(props) {
   return (
    <Table dataSource={props.viewAuthorityData}>
      <Column title="视图权限名称" dataIndex="view_authority_text" key="firstName" />
      <Column title="视图id" dataIndex="view_id" key="lastName" />
    </Table>
  )
}
//权限关系
function Permissions(props) {
  return (
    <Table dataSource={props.identityViewAuthorityData}>
        <Column title="身份" dataIndex="identity_text" key="firstName" />
        <Column title="视图名称" dataIndex="view_authority_text" key="lastName" />
        <Column title="视图id" dataIndex="view_id" key="action"  />
    </Table>
  )
}
function ShowUser(props) {
  const [ind,setind]=useState(0);

  let [userFlag, setUserFlag] = useState(0);

  useEffect(() => {
    //用户数据调用
    props.userD();
    //身份数据调用
    props.identityD();
    //api接口权限
    props.interfaceD();
    //展示身份和api权限关系
    props.relationD()
    //获取视图权限数据 
    props.viewAuthorityD()
    //展示身份和视图权限关系 
    props.identityViewAuthorityD()
  }, []);

  let userDisplay = [
    "用户数据",
    "身份数据",
    "api接口权限",
    "身份和api接口关系",
    "视图接口权限",
    "身份和视图权限关系"
  ];
  //点击时重新赋值
  let userFn = index => {
    setUserFlag(index);

    setind(index)

}


  return (
    <div className={useStyle.user}> 
      <h1 className={useStyle.h1}>用户展示</h1>
      <ol className={useStyle.ol}>
        {userDisplay.map((item, index) => (
          <li key={index} onClick={() => userFn(index)} className={ind===index?useStyle.active:''}
          >
            {item}
          </li>
        ))}
      </ol>
      <h3 className={useStyle.h3}>{userDisplay[userFlag]}</h3>
      <div className={useStyle.user_bottom}>
        {userFlag === 0 && <UserData userDatas={props.userDatas} />}
        {userFlag === 1 && <Identity identityData={props.identityData} />}
        {userFlag === 2 && <Interface interfaceData={props.interfaceData}/>}
        {userFlag === 3 && <Relationship relationData={props.relationData}/>}
        {userFlag === 4 && <InterfaceView viewAuthorityData={props.viewAuthorityData}/>}
        {userFlag === 5 && <Permissions identityViewAuthorityData={props.identityViewAuthorityData}/>}
      </div>
    </div>
  );
}

ShowUser.propTypes = {};

const mapStateToProps = state => {
  return { ...state.userManage };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    //用户数据
    userD: payload => {
      dispatch({
        type: "userManage/userUsers",
        payload
      });
    },
    //身份数据
    identityD: payload => {
      dispatch({
        type: "userManage/identity",
        payload
      });
    },
    //api接口权限
    interfaceD: payload => {
      dispatch({
        type: "userManage/interface",
        payload
      });
    },
      //展示身份和api权限关系  
    relationD: payload => {
      dispatch({
        type: "userManage/relation",
        payload
      });
    },
    //获取视图权限数据 
    viewAuthorityD: payload => {
    dispatch({
      type: "userManage/viewAuthority",
      payload
    });
    },
    //展示身份和视图权限关系
    identityViewAuthorityD: payload => {
      dispatch({
        type: "userManage/identityViewAuthority",
        payload
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowUser);
