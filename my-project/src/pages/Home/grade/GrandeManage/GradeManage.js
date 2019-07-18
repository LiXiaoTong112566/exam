import React, { useState, useEffect } from "react";
import { connect } from "dva";
import GradeManageScss from "./QuestionClass.scss"
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
    if (props.gradeData === 1) {
      message.success("添加成功");
    } else if (props.gradeData === 0) {
       message.error("班级名重复");
    }
    if (props.upDedata === 1) {
      message.success("更新成功");
    } else if (props.upDedata === 0) {
      message.error("更新失败");
    }
    props.gradeClassD();
  }, [props.gradeData, props.upDedata]);

  const { form } = props;
  const { getFieldDecorator } = form;
  const [visible, setVisible] = useState(false);
  //修改设置id
  const [updataLs, setupdataL] = useState();
  //删除时设置id
  const [deletes, setdeleteL] = useState();
  //type
  const [type, settype] = useState();
  // //设置默认值班级号
  const [defaulta, setdefaulta] = useState('班级号');
  //设置默认值
  const [defaultaKe, setdefaultaKe] = useState('课程名');

  const showModal = (add) => {
    setVisible(true);
    settype(add)
  };
  //点击修改
  let updataL = (record,updata) => {
    console.log(record)
    //设置默认值  
    setdefaulta(record.room_text)
    setdefaultaKe(record.subject_text)
    // 弹框
    setVisible(true);
    //设置id
    setupdataL(record.grade_id);
    //弹框类型
    settype(updata)
    props.gradeClassD();
  };
  //点击删除
  let deleteL = id => {
    setdeleteL(id);
    props.delete({
      grade_id: id
    });
    props.gradeClassD();
  };
  //  const showUpdata=()=>{
  //    setVisible(true);
  //  }
  // const handleOk = e => {
  //   console.log(e);
  //   setVisible(false);
  // };
  function handleSubmit() {
    props.form.validateFields((err, values) => {
      if (!err) {
        props.gradeD({
          grade_name: values.grade_name,
          room_id: values.room_id,
          subject_id: values.subject_id
        });
        if (updataLs) {
          delete values.grade_name;
          values.grade_id = updataLs;
          props.updateD(values);
        }
      }
      setVisible(false);
    });
  }

  //点击取消
  let handleCancel = () => {
    setVisible(false);
  };
  return (
    <div className={GradeManageScss.box}>
      <h1 className={GradeManageScss.title}>班级管理</h1>
      <div className={GradeManageScss["QuestionClass_addType"]}>
      <div className={GradeManageScss["main"]}>
        <Button type="primary" onClick={()=>{showModal("add")}} className={GradeManageScss["ant-btn"]}>
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
            {
              type==="add"?<Form.Item label="班级名">
              {getFieldDecorator("grade_name", {
                validateTrigger: "onBlur",
                rules: [{ required: true, message: "请输入班级名" }]
              })(<Input placeholder="班级名" />)}
            </Form.Item>:<Form.Item label="班级名">
              {getFieldDecorator("grade_name", {
                validateTrigger: "onBlur",
              })(<Input placeholder="班级名" disabled />)}
            </Form.Item>
            }
            
            <Form.Item label="教室号">
              {getFieldDecorator("room_id", {
                validateTrigger: "onBlur",
                rules: [{ required: true, message: "请输入教室号" }],
                initialValue:defaulta
              })(
                <Select
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
                  {props.roomData && props.roomData.map((item, index) => {
                      return (
                        <Option key={index} value={item.room_id}>
                          {item.room_text}
                        </Option>
                      );
                    })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="课程名">
              {getFieldDecorator("subject_id", {
                validateTrigger: "onBlur",
                rules: [{ required: true, message: "请输入课程名" }],
                initialValue:defaultaKe
              })(
                <Select
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
                  {props.subjectData && props.subjectData.map((item, index) => {
                      return (
                          <Option key={index} value={item.subject_id}>
                            {item.subject_text}
                          </Option>
                      );
                    })}
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
        </div>
      </div>
      <Table dataSource={props.gradeClassData} className={GradeManageScss.form}>
        <Column title="班级名" dataIndex="grade_name" key="age" />
        <Column title="课程名" dataIndex="subject_text" key="address" />
        <Column title="教室号" dataIndex="room_text" key="tags" />
        <Column
          title=" 操作"
          key="action"
          dataIndex="grade_id"
          render={(text, record) => (
            <span>
              <a href="javascript:;" onClick={() => updataL(record,'updata')}>
                修改
              </a>
              <Divider type="vertical" />
              <a href="javascript:;" onClick={() => deleteL(record.grade_id)}>
                删除
              </a>
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
    delete: payload => {
      dispatch({
        type: "GradeManageData/deleteD",
        payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToPorps
)(Form.create()(GradeManage));
