import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { Table, Divider, Tag } from "antd";

const { Column, ColumnGroup } = Table;
function TestClassCom(props) {
  console.log(props);
  console.log(props.location.params.id);
  console.log(props.match.params.id);
  const gradeId = props.match.params.id;
  console.log(gradeId);
  function jumpReadExam(data) {
    console.log(data);
    props.history.push({pathname:"/home/readExam",params:{score:data.score}})

  }

  useEffect(() => {
    props.getStudentExamFn({ grade_id: gradeId }); //获取学生试卷列表
  }, []);




  const data = props.ExamStudentData;
  return (
    <div className="AwaitBox">
      <Table dataSource={data} rowKey="table">
        <Column title="班级" dataIndex="grade_id" rowKey="grade_id" />
        <Column title="姓名" dataIndex="student_name" rowKey="student_name" />
        <Column title="阅卷状态" dataIndex={"status"?"未阅":"已阅卷"} rowKey="exam_exam_id" />
        <Column
          title="开始时间"
          dataIndex="start_time"
          rowKey="start_time"
        />
        <Column title="结束时间" dataIndex="end_time" rowKey="end_time" />
        <Column title="成材率" dataIndex="100" rowKey="good" />
        <Column
          title="批卷"
          key="action"
          dataIndex="student_id"
          render={(text, record) => (
            <span
              onClick={() => {
               jumpReadExam(record);
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

TestClassCom.propTypes = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.AwaitClassModel
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getStudentExamFn(data) {
      dispatch({
        type: "AwaitClassModel/getStudentExamModel",
        payload: data
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestClassCom);
