import React, { useEffect, useState } from "react";
import { connect } from "dva";
import QuestStyle from "./QuestionClass.scss";
import { Button, Modal, Form, Input, Table, Icon, Spin, message } from "antd";
const { Column } = Table;

function QuestionClass(props) {
  useEffect(() => {
    props.getQuestion();
  }, []);

  const data = props.questionClassData;
  const [visible, setvisible] = useState(false);

  let showModal = () => {
    setvisible(true);
  };

  // 添加试题类型
  function handleSubmit() {
    // props.form.validate();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.addQuestion({
          text: values.username,
          sort: (props.questionClassData.length + 1).toString()
        });
        setvisible(false);
      } else {
        message.error("请输入类型");
      }
    });
  }

  //点击取消
  let handleCancel = () => {
    setvisible(false);
  };

  const { getFieldDecorator } = props.form;
  return (
    <div className={QuestStyle.box}>
      <h1 className={QuestStyle.title}>试题分类</h1>
      <div className={QuestStyle["QuestionClass_addType"]}>
        <div className={QuestStyle["main"]}>
          <Button
            type="primary"
            onClick={showModal}
            className={QuestStyle["ant-btn"]}
          >
            <Icon type="plus" />
            添加类型
          </Button>
          <Modal
            title="创建新类型"
            visible={visible}
            onOk={() => handleSubmit()}
            onCancel={handleCancel}
            okText="确认"
            cancelText="取消"
          >
            <Form onSubmit={handleSubmit}>
              <Form.Item>
                {getFieldDecorator("username", {
                  validateTrigger: "onBlur",
                  rules: [{ required: true, message: "请输入类型名称" }]
                })(<Input placeholder="请输入类型名称" />)}
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <Table
          dataSource={data}
          pagination={false}
          rowKey={"questions_type_id"}
        >
          <Column
            title="类型ID"
            dataIndex="questions_type_id"
            rowKey="questions_type_id"
          />
          <Column
            title="类型名称"
            dataIndex="questions_type_text"
            rowKey="questions_type_text"
          />
          <Column
            title="操作"
            dataIndex="questions_type_sort "
            rowKey="questions_type_sort"
          />
        </Table>
      </div>
    </div>
  );
}

QuestionClass.propTypes = {};

const mapStateToProps = state => {
  return {
    ...state.questionClass,
    global: state.loading.global
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //获取所有的数据
    getQuestion: () => {
      dispatch({
        type: "questionClass/questionClass"
      });
    },
    //添加数据
    addQuestion: payload => {
      dispatch({
        type: "questionClass/addType",
        payload: payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(QuestionClass));
