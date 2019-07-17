import React,{useState,useEffect} from 'react';
import {connect} from "dva";
import { Table, Divider, Tag } from "antd";

const { Column, ColumnGroup } = Table;
function TestClassCom(props){

  console.log(props);
 function jumpTestClass(data){
     console.log(data);


 }

 useEffect(()=>{

  props.getAllTest();

 },[])

   const data=props.getAllGradeData;
    return (
        <div className="AwaitBox">
         <Table dataSource={[]} rowKey="table">
        <Column title="班级名" dataIndex="grade_name" rowKey="grade_name" />
        <Column title="课程名称" dataIndex="subject_text" rowKey="subject_text" />
        <Column title="阅卷状态" dataIndex="" rowKey="" />
        <Column title="课程名称" dataIndex="subject_text" rowKey="subject_text" />
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
    )

}

TestClassCom.propTypes={



}

const mapStateToProps = (state, ownProps) => {
    return {
       ...state.AwaitClassModel,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

        getAllTest(){
        dispatch({
          type:"AwaitClassModel/getAllTestModel"
        })
      }
      
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(TestClassCom)