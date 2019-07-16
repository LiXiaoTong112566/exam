import React, { useState, useEffect } from "react";
import { connect } from "dva";
import {
  Table,
  Divider,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message
} from "antd";
const { Column, ColumnGroup } = Table;
const { Option } = Select;

function GradeManage(props) {
  useEffect(() => {
    props.roomD();
    props.subjectD();
    if(props.gradeData===1){
      message.success('添加成功')
    }else if(props.gradeData===0){
      message.error('班级名重复')
    }
    if(props.upDedata===1){
      message.success('更新成功')
    }else if(props.upDedata===0){
      message.error('更新失败')
    }
    props.gradeClassD()
    
  }, [props.gradeData,props.upDedata]);

  const { form } = props;
  const { getFieldDecorator } = form;
  const [visible, setVisible] = useState(false);
  //修改设置id
  const [updataLs, setupdataL] = useState();
  const [deletes, setdeleteL] = useState();
  
  const showModal = () => {
    setVisible(true);
  };
  console.log(deletes)
  //点击修改
 let updataL=(id)=>{
 
  setVisible(true);
  setupdataL(id)
 }
 //点击删除
 let deleteL=(id)=>{
   setdeleteL(id)
   props.deleteD(id)
  let ind=props.gradeClassData.findIndex(item=>item.grade_id===id);
  console.log(ind)
  props.gradeClassData.splice(ind,1)
  props.gradeClassD()
}
//  const showUpdata=()=>{
//    setVisible(true);
//  }
  // const handleOk = e => {
  //   console.log(e);
  //   setVisible(false);
  // };
  function handleSubmit() {
    // props.form.validate();
    props.form.validateFields((err, values) => {
        if (!err) {
          props.gradeD({
            grade_name: values.grade_name,
            room_id:values.room_id,
            subject_id:values.subject_id
          });
          if(updataLs){
            values.grade_id=updataLs;
            props.updateD(values)
          }

          console.log()
       
        
     
       
        }
        setVisible(false);
    });
  }

  //点击取消
  let handleCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <h2>班级管理</h2>
      <div>
        <Button type="primary" onClick={showModal}>
          添加班级
        </Button>
        <Modal
          title="添加班级"
          visible={visible}
          onOk={() => handleSubmit()}
          onCancel={handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form onSubmit={handleSubmit}>
            <Form.Item label="班级名">
              {getFieldDecorator("grade_name", {
                validateTrigger: "onBlur",
                rules: [{ required: true, message: "请输入班级名" }]
              })(<Input placeholder="班级名" />)}
            </Form.Item>

            <Form.Item label="教室号">
            {getFieldDecorator("room_id", {
                validateTrigger: "onBlur",
                rules: [{ required: true, message: "请输入教室号" }]
              })(<Select
                showSearch
                style={{ width: 476 }}
                placeholder="请选择教室号"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {props.roomData &&props.roomData.map((item, index) => {
                    return (
                      <Option key={index} value={item.room_id}>
                        {item.room_text}
                      </Option>
                    );
                  })}
              </Select>)}
            </Form.Item>
            <Form.Item label="课程名">
            {getFieldDecorator("subject_id", {
                validateTrigger: "onBlur",
                rules: [{ required: true, message: "请输入课程名" }]
              })(<Select
                showSearch
                style={{ width: 476 }}
                placeholder="请选择课程名"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {props.subjectData &&
                  props.subjectData.map((item, index) => {
                    return (
                      <Option key={index} value={item.subject_id}>
                        {item.subject_text}
                      </Option>
                    );
                  })}
              </Select>)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Table dataSource={props.gradeClassData}>
        <Column title="班级名" dataIndex="grade_name" key="age" />
        <Column title="课程名" dataIndex="subject_id" key="address" />
        <Column
          title="教室号"
          dataIndex="room_text"
          key="tags"
          // render={tags => (
          //   <span>
          //     {tags.map(tag => (
          //       <Tag color="blue" key={tag}>
          //         {tag}
          //       </Tag>
          //     ))}
          //   </span>
          // )}
        />
        <Column
          title="操作"
          key="action"
          dataIndex="grade_id"
          render={(text, record) => (
            <span>
              <a href="javascript:;" onClick={()=>updataL(record.grade_id)} >修改</a>
              <Divider type="vertical" />
              <a href="javascript:;" onClick={()=>deleteL(record.grade_id)}>删除</a>
            </span>
          )}
        />
      </Table>
    </div>
  );
}

GradeManage.propTypes = {};
const mapStateToProps = state => {
  return { ...state.GradeManageData };
};

const mapDispatchToPorps = dispatch => {
  return {
    //获取所有教师号
    roomD: payload => {
      dispatch({
        type: "GradeManageData/roomD",
        payload
      });
    },
    //获取所有课程
    subjectD: payload => {
        dispatch({
          type: "GradeManageData/subject",
          payload
        });
    },
    //获取所有课程
    gradeD: payload => {
      dispatch({
        type: "GradeManageData/grade",
        payload
      });
    },
    //获取已经分配教室的班级
    gradeClassD: payload => {
      dispatch({
        type: "GradeManageData/gradeClass",
        payload
      });
    },
    //更新班级信息
    updateD: payload => {
      dispatch({
        type: "GradeManageData/update",
        payload
      });
    },
     //删除班级接口
     deleteD: payload => {
      dispatch({
        type: "GradeManageData/deleteD",
        payload
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToPorps
)(Form.create()(GradeManage));
