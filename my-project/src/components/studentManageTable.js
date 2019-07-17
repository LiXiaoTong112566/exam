/**
 * 学生管理页面的table
 *
 *
 */

import React,{useState,useEffect} from "react";
import { connect } from "dva";

import { Table, Divider, Tag } from "antd";

const { Column, ColumnGroup } = Table;
// const [data,setData]=useState([])


function StudentManageTable(props) {

useEffect(()=>{
    props.getManageStudent();//获取所有已经分班的学生的接口

},[])

const data = props.MangerStudentData;




  return (
  
    <Table dataSource={data} rowKey="table">
      <Column title="姓名" dataIndex="student_name" rowKey="student_name" />
      <Column title="学号" dataIndex="student_id" rowKey="student_id" />
      <Column title="班级" dataIndex="grade_name" rowKey="grade_name" />
      <Column title="教室" dataIndex="room_text" rowKey="room_text" />
      <Column title="密码" dataIndex="student_pwd" rowKey="student_pwd" />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <span>
            <a href="javascript:;">Delete</a>
          </span>
        )}
      />
    </Table>

  
     
  );
}

StudentManageTable.propTypesTable = {};

const mapStateToProps = (state) => {
    return {
    ...state.ManageStudentPage,
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getManageStudent(){
            dispatch({
                type:"ManageStudentPage/getManageStuModel",

            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(StudentManageTable);
