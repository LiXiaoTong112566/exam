import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { Table, Divider, Tag } from "antd";

const { Column, ColumnGroup } = Table;
function TestClassCom(props) {
  const gradeId = props.match.params.id;
  console.log(gradeId);

  // function jumpReadExam(data) {
  //   props.history.push({ pathname: `/home/readExam/${data.exam_student_id}` });
  // }

  useEffect(() => {
    props.getStudentExamFn({ grade_id: gradeId }); //获取学生试卷列表

  }, []);

  const data = props.ExamStudentData;

  console.log(data);
  // onClick={() => {
  //   jumpReadExam(record);
  // }}

  const columns=[
    {
        title: '班级',
        key: 'grade_id',
      dataIndex:"grade_id"
       
    }, {
     
      title: '姓名',
      dataIndex: "student_name",
      key: 'student_name',
     
   
  }, {
     
    title: '阅卷状态',
    key: 'status',
    render:text=><>{text.status?"已阅":"未阅"}</>
  
},{
     
  title: '开始时间',
  dataIndex: "start_time",
  key: 'start_time',
 

},{
     
  title: '结束时间',
  dataIndex: "end_time",
  key: 'endtimer',


},{
     
  title: '成才率',
  key: 'score',
  render:text=><>{text.score?text.score:"-"}</>
  

},{
     
  title: '操作',
  key: 'exam_student_id',
  render:text=><a onClick={()=>{props.history.push(`/home/readExam/${text.exam_student_id}`)}}>批卷</a>
 
}
  ]




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
