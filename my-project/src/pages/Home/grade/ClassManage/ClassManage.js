import React, { useEffect, useState } from "react";
import { connect } from "dva";
import QuestStyle from "./QuestionClass.scss";
import {
  Button,
  Modal,
  Form,
  Input,
  Table,
  Icon,
  Spin
} from "antd";
const { Column, ColumnGroup } = Table;
const { confirm } = Modal;
function QuestionClass(props) {
  useEffect(() => {
    props.roomD();
  }, []);

  const data = props.questionClassData;
  const [visible, setvisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
    //删除时设置id

  let showModal = () => {
    setvisible(true);
  };
  //点击确定
  let handleOk = () => {
    setvisible(false);
    if (inputValue) {
     props.addRoomD({
       room_text:inputValue
     })
     props.roomD();
    }
    setInputValue("");
  };

    // //点击删除
    // let deleteL = id => {
    //   props.deleteClassD({
    //     room_id: id
    //   });
    //   props.roomD();
    // };

    function deleteL(id) {
      console.log(id)
      confirm({
        title: '删除',
        content: '确定删除吗？',
        onOk() {
          props.deleteClassD({
            room_id: id
          });
        
        },
        
        onCancel() {
          console.log('Cancel');
        },
        
      });
      props.roomD();
  }

  //点击取消
  let handleCancel = () => {
    setvisible(false);
  };

  //设置input框的值
  let changeInput = e => {
    setInputValue(e.target.value);
  };
  const { getFieldDecorator } = props.form;

  return props.global ? (
    <div className={QuestStyle.loading}>
      <Spin />
    </div>
  ) : (
    <div className={QuestStyle.box}>
      <h1 className={QuestStyle.title}>教室管理</h1>
      <div className={QuestStyle["QuestionClass_addType"]}>
        <div className={QuestStyle["main"]}>
          <Button
            type="primary"
            onClick={showModal}
            className={QuestStyle["ant-btn"]}
          >
            <Icon type="plus" />
            添加教室
          </Button>
          <Modal
            title="创建新类型"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="确认"
            cancelText="取消"
          >
            <Form>
              <Form.Item>
                {getFieldDecorator("username", {
                  validateTrigger: "onBlur",
                  rules: [{ required: true, message: "请输入类型名称" }]
                })(
                  <Input
                    placeholder="请输入类型名称"
                    setFieldsvalue={inputValue}
                    onChange={changeInput}
                  />
                )}
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <Table dataSource={props.roomData} pagination={false}>
          <Column
            title="教师号"
            dataIndex="room_text"
            key="questions_type_id"
          />
          <Column
            title="操作"
            key="action"
            dataIndex="room_id"
            render={(text, record) => (
             
              <span>
                <a href="javascript:;" onClick={() => deleteL(record.room_id)}>删除</a>
              </span>
            )}
          />
        </Table>
      </div>
    </div>
  );
}

QuestionClass.propTypes = {};
const mapStateToProps = state => {
  return { ...state.ClassManage };
};

const mapDispatchToProps = dispatch => {
  return {
    //获取所有教师号
    roomD: payload => {
      dispatch({
        type: "ClassManage/roomD",
        payload
      });
    },
    //获取所有教师号
    addRoomD: payload => {
      dispatch({
        type: "ClassManage/addRoom",
        payload
      });
   },
   //删除教书接口
   deleteClassD: payload => {
    dispatch({
      type: "ClassManage/deleteClass",
      payload
    });
 },
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(QuestionClass));
