/**
 * 学生管理页面的table
 *
 *
 */

import React, { useEffect } from "react";
import { connect } from "dva";

import { Table } from "antd";

const { Column} = Table;
// const [data,setData]=useState([])

function StudentManageTable(props) {
  useEffect(() => {
    props.getManageStudent(); //获取所有已经分班的学生的接口
    props.getNewManageStudent(); //获取所有没有分班的学生的接口
  }, []);

  const data = props.AllManagerStudentData; //获取所有分班学生的信息


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
        dataIndex="student_id"
       
        render={(text, record) => (
          <span
            onClick={() => {
              props.del(record);
            }}
          >
            删除
          </span>
        )}
      />
    </Table>
  );
}

StudentManageTable.propTypesTable = {};

const mapStateToProps = state => {
  return {
    ...state.ManageStudentPage
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    //获取所有已经分班的学生
    getManageStudent() {
      dispatch({
        type: "ManageStudentPage/getManageStuModel"
      });
    },
    //删除
    del(data) {
      dispatch({
        type: "ManageStudentPage/delManageStuModel",
        payload: { id: data.student_id }
      });
    },
    //获取所有没有分班的学生

    getNewManageStudent() {
      dispatch({
        type: "ManageStudentPage/getNewManageStuModel"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentManageTable);
