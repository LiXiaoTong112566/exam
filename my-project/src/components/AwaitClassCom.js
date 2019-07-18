import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { Table, Divider, Tag } from "antd";
// import {  Route, NavLink,routerRedux } from "dva/router";
const { Column, ColumnGroup } = Table;
function AwaitClassCom(props) {
  useEffect(() => {
    props.getAllGrade();
  }, []);

  function jumpTestClass(data) {
    console.log(data);
    // console.log(routerRedux);
    let { grade_id } = data;

    console.log(props);
    props.history.push({ pathname: `/home/testClass/${grade_id}`,params:{id:grade_id} });
  }

  const data = props.getAllGradeData;
  return (
    <div className="AwaitBox">
      <Table dataSource={data} rowKey="table">
        <Column title="班级名" dataIndex="grade_name" rowKey="grade_name" />
        <Column
          title="课程名称"
          dataIndex="subject_text"
          rowKey="subject_text"
        />
        <Column title="阅卷状态" dataIndex="" rowKey="" />
        <Column
          title="课程名称"
          dataIndex="subject_text"
          rowKey="subject_text"
        />
        <Column title="成材率" dataIndex="room_text" rowKey="room_text" />
        <Column
          title="操作"
          key="action"
          dataIndex="student_id"
          render={(text, record) => (
            <span
              onClick={() => {
                jumpTestClass(record);
              }}
            >
              批卷
            </span>
          )}
        />
      </Table>
    </div>
  );
}

AwaitClassCom.propTypes = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.AwaitClassModel
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllGrade() {
      dispatch({
        type: "AwaitClassModel/getAllGradeModel"
      });
    },
    jumpTestClass(data) {
      dispatch({
        type: "AwaitClassModel/redirectTestClass",
        payload: data
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AwaitClassCom);
