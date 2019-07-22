import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { Table, Divider, Tag, Pagination, LocaleProvider } from "antd";

import zh_CN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");
// import {  Route, NavLink,routerRedux } from "dva/router";
const { Column, ColumnGroup } = Table;
function AwaitClassCom(props) {
  useEffect(() => {
    props.getAllGrade();
  }, []);

  let pagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: 6,
    size: "small",
    total: 50
  };

  function jumpTestClass(data) {
    let { grade_id } = data;

    props.history.push({
      pathname: `/home/testClass/${grade_id}`,
      params: { id: grade_id }
    });
  }

  const data = props.getAllGradeData;

  return (
    <LocaleProvider locale={zh_CN}>
      <div className="AwaitBox">
        <Table dataSource={data} rowKey="room_id" pagination={pagination}>
          <Column title="班级名" dataIndex="grade_name" rowKey="grade_name" />
          <Column
            title="课程名称"
            dataIndex="subject_text"
            rowKey="subject_text"
          />
          <Column title="阅卷状态" dataIndex="" rowKey="grade_id" />
          <Column title="课程名称" dataIndex="subject_id" rowKey="subject_id" />
          <Column title="成材率" dataIndex="room_text" rowKey="room_text" />
          <Column
            title="操作"
            rowKey="action"
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
    </LocaleProvider>
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
