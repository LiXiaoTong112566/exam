import React, { useEffect, useState } from "react";
import { connect } from "dva";
import QuestStyle from "./QuestionClass.scss";
import { Button, Modal, Form, Input, Table, Icon, Spin } from 'antd';
const { Column } = Table;
// import { Form, Icon, Input, Button, Checkbox,message } from "antd";

function QuestionClass(props) {
  // console.log(props);

  useEffect(() => {
    props.getQuestion();
  }, [])

  const data = props.questionClassData;
  const [visible, setvisible] = useState(false)
  const [inputValue, setInputValue] = useState("")

  let showModal = () => {
    setvisible(true);
  }

  //点击确定
  let handleOk = () => {

    setvisible(false);
    if (inputValue) {
      props.addQuestion({ text: inputValue, sort: (props.questionClassData.length + 1).toString() });
    }
    setInputValue("")
    props.getQuestion();

  }

  //点击取消
  let handleCancel = () => {
    setvisible(false);
  }

  //设置input框的值
  let changeInput = (e) => {
    setInputValue(e.target.value);

  }
  const { getFieldDecorator } = props.form;

  return (


    props.global ? <div className={QuestStyle.loading}><Spin></Spin></div> :
      <div className={QuestStyle.box}>

        <h1 className={QuestStyle.title}>试题分类</h1>
        <div className={QuestStyle['QuestionClass_addType']}>
          <div className={QuestStyle['main']}>
            <Button type="primary" onClick={showModal} className={QuestStyle['ant-btn']}>
              <Icon type="plus" />添加类型
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
                    rules: [
                      { required: true, message: "请输入类型名称" },

                    ]
                  })(
                    <Input placeholder="请输入类型名称" value={inputValue} onChange={changeInput} />

                  )}
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <Table dataSource={data} pagination={false}>
            <Column title="类型ID" dataIndex="questions_type_id" key="questions_type_id" />
            <Column title="类型名称" dataIndex="questions_type_text" key="questions_type_text" />
            <Column title="操作" dataIndex="questions_type_sort " key="questions_type_sort" />
          </Table>
        </div>
      </div>
  );
}

QuestionClass.propTypes = {};

const mapStateToProps = (state) => {
  // console.log(state, "..........")


  return {
    ...state.questionClass,
    global: state.loading.global

  }
}

const mapDispatchToProps = dispatch => {
  return {
    //获取所有的数据
    getQuestion: () => {
      dispatch({
        type: "questionClass/questionClass",

      })

    },
    //添加数据
    addQuestion: (payload) => {
      // console.log(payload);
      dispatch({
        type: "questionClass/addType",
        payload: payload,
      })


    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(QuestionClass));
