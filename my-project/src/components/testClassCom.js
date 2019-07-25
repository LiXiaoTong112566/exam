import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { Table, Divider, Tag } from "antd";

const { Column, ColumnGroup } = Table;
function TestClassCom(props) {
 
  const gradeId = props.match.params.id; //获取传过来的班级Id

  useEffect(() => {
    props.getStudentExamFn({ grade_id: gradeId }); //获取学生试卷列表
    props.getGrade(); //获取所有的待批班级
  }, []);

  const data = props.ExamStudentData;

  

  const columns = [
    {
      title: "班级",
      key: "grade_id",
      render: () => (
        <>
          {props.getMangerGradeData &&
            props.getMangerGradeData.filter(
              (item, index) => item.grade_id === gradeId
            )[0].grade_name}
        </>
      )
    },
    {
      title: "姓名",
      dataIndex: "student_name",
      key: "student_name"
    },
    {
      title: "阅卷状态",
      key: "status",
      render: text => <>{text.status ? "已阅" : "未阅"}</>
    },
    {
      title: "开始时间",
      dataIndex: "start_time",
      key: "start_time"
    },
    {
      title: "结束时间",
      dataIndex: "end_time",
      key: "endtimer"
    },
    {
      title: "成才率",
      key: "score",
      render: text => <>{text.score ? text.score : "-"}</>
    },
    {
      title: "操作",
      key: "exam_student_id",
      render: text => (
        <a
          onClick={() => {
            props.history.push(`/home/readExam/${text.exam_student_id}`);
          }}
        >
          批卷
        </a>
      )
    }
  ];

  return (
    <div className="AwaitBox">
      <Table columns={columns} dataSource={data} />
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
    //获取学生的试卷列表
    getStudentExamFn(data) {
      dispatch({
        type: "AwaitClassModel/getStudentExamModel",
        payload: data
      });
    },
    //获取到所有的班级
    getGrade(data) {
      dispatch({
        type: "AwaitClassModel/getMangerGradeModel",
        payload: data
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestClassCom);
