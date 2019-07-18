import React, { useEffect, useState } from "react";
import { connect } from "dva";
import styles from "../AddItem/AddItem.scss";
import { Layout, Form, Button, Input, Select, message, Modal } from "antd";
import Editor from "for-editor";

function DetailCompile(props) {
  console.log(props.isCode,"iscode")
  let obj = {};
  //获取到数据
  useEffect(() => {
    // 获取用户信息
    props.userInfo();
    //获取考试类型
    props.examType();
    //获取课程类型
    props.subjectType();
    //获取题目类型
    props.questionsType();
    props.detailCon({
      questions_id: props.match.params.id.split("=")[1]
    });
  }, [props.isCode]);

  
 //弹窗
  const [ModalText, setModalText] = useState("确认修改吗");
  const [visible, setvisible] = useState(false);

  let showModal = () => {
    setvisible(true);
    // console.log(props.detailTiCode)
  }
  //点击确定
  let handleOk=()=>{
      setvisible(false);
      handleSubmit()
      props.history.push({pathname:'/home/checkItem'})
  }
  //点击取消
  let handleCancel = () => {
     setvisible(false);
  }

  const { getFieldDecorator } = props.form;
  const { Option } = Select;
  const { Header, Content } = Layout;
  let handleSubmit = e => {
      props.form.validateFields((err, values) => {
        if (!err) {
          let questions_type_id = props.questionsTypeData.find( item => item.questions_type_text === values.questions_type_id).questions_type_id;
          let exam_id = props.examTypeData.find(item => item.exam_name === values.exam_id).exam_id;
          let subject_id = props.subjectTypeData.find(item => item.subject_text === values.subject_id).subject_id;
          values.exam_id = exam_id;
          values.subject_id = subject_id;
          values.questions_id = props.match.params.id.split("=")[1];
          values.questions_type_id = questions_type_id;
          obj = Object.values(values);
          if (obj.includes(undefined)) {
            message.error("参数不完整");
          } else {
            props.detailConT(values)
            props.history.push({pathname:'/home/checkItem'})
          
          }
        }
      });
  };

  return (
    <div className={styles["wrap"]}>
      {props.detailConDataL &&props.detailConDataL.map((item, index) => {
          return (
            <div key={index}>
              <Header style={{ background: "#f0f2f5", padding: 0 }}>
                <div className={styles.conhead}>添加试题</div>
              </Header>
              <Content style={{ margin: "0 16px" }} className={styles.con}>
                <div
                  style={{ padding: 24, background: "#fff", minHeight: 360 }}
                >
                  <Form className="login-form" onSubmit={handleSubmit}>
                    <div className={styles.markcont}>
                      <p>题目信息</p>
                      <Form.Item>
                        {getFieldDecorator("title", {
                          rules: [
                            { required: true, message: "请输入题目标题!" }
                          ],
                          initialValue: item.title
                        })(
                          <Input
                            placeholder="请输入题目标题,不超过20个"
                            style={{ width: "50%" }}
                          />
                        )}
                      </Form.Item>
                      <p>题目管理</p>
                      <Form.Item>
                        {getFieldDecorator("questions_stem", {
                          initialValue: item.questions_stem
                        })(
                          <Editor
                            style={{ height: "350px", width: "100%" }}
                            placeholder="bbb"
                            def={item.questions_stem}
                          />
                        )}
                      </Form.Item>
                    </div>
                    <div>
                      <p>请选择考试类型：</p>
                      <Form.Item>
                        {getFieldDecorator("exam_id", {
                          rules: [
                            { required: true, message: "请输入题目标题!" }
                          ],
                          initialValue: item.exam_name
                        })(
                          <Select style={{ width: 160 }}>
                            {props.examTypeData.map(item => {
                              return (
                                <Option value={item.exam_id} key={item.exam_id}>
                                  {" "}
                                  {item.exam_name}
                                </Option>
                              );
                            })}
                          </Select>
                        )}
                      </Form.Item>
                    </div>
                    <div>
                      <p>请选择课程类型：</p>
                      <Form.Item>
                        {getFieldDecorator("subject_id", {
                          rules: [
                            { required: true, message: "请输入题目标题!" }
                          ],
                          initialValue: item.subject_text
                        })(
                          <Select style={{ width: 160 }}>
                            {props.subjectTypeData.map(item => (
                              <Option
                                value={item.subject_id}
                                key={item.subject_id}
                              >
                                {item.subject_text}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    </div>
                    <div>
                      <p>请选择题目类型：</p>
                      <Form.Item>
                        {getFieldDecorator("questions_type_id", {
                          rules: [
                            { required: true, message: "请输入题目标题!" }
                          ],
                          initialValue: item.questions_type_text
                        })(
                          <Select style={{ width: 160 }}>
                            {props.questionsTypeData.map(item => (
                              <Option
                                value={item.questions_type_id}
                                key={item.questions_type_id}
                              >
                                {item.questions_type_text}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    </div>
                    <div className={styles.markcont}>
                      <h2 className={styles.daanTit}>答案信息</h2>
                      <Form.Item>
                        {getFieldDecorator("questions_answer", {
                          initialValue: item.questions_answer
                        })(
                          <Editor
                            style={{ height: "350px" }}
                            placeholder="nnn"
                          />
                        )}
                      </Form.Item>
                    </div>

                    <div>
                      <Button
                        type="primary"
                        onClick={showModal}
                      >
                        提交
                      </Button>

                      <Modal
                        title="编辑"
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                      <h2>{ModalText}</h2>
                      </Modal>
                    </div>
                  </Form>
                </div>
              </Content>
            </div>
          );
        })}
    </div>
  );
}

DetailCompile.propTypes = {};
const mapStateToProps = (state, ownProps) => {
  return {
    ...state.questionClass,
    ...state.user,
    ...state.lookCheck
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // 添加试题
    add(payload) {
      // console.log(payload)
      dispatch({
        type: "questionClass/add",
        payload
      });
    },
    // 获取考试类型
    examType() {
      dispatch({
        type: "questionClass/examType"
      });
    },
    // 获取课程类型
    subjectType() {
      dispatch({
        type: "questionClass/subjectType"
      });
    },
    // 获取题目类型
    questionsType() {
      dispatch({
        type: "questionClass/questionsType"
      });
    },
    userInfo() {
      dispatch({
        type: "user/userInfo"
      });
    },
    detailCon: payload => {
      dispatch({
        type: "lookCheck/detailCon",
        payload: payload
      });
    },
    detailConT: payload => {
      dispatch({
        type: "lookCheck/detailConTi",
        payload: payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(DetailCompile));
