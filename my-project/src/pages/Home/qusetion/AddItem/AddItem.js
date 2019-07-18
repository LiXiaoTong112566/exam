import React, { useEffect } from 'react';
import { connect } from "dva";
import styles from './AddItem.scss';
import { Layout, Form, Button, Input, Select, message } from 'antd';
import Editor from 'for-editor'
import {injectIntl} from 'react-intl';
function AddItem(props) {
    useEffect(() => {
        // 获取用户信息
        props.userInfo();
        //获取考试类型
        props.examType()
        //获取课程类型
        props.subjectType()
        //获取题目类型
        props.questionsType()
        if (props.addQuestionsFlag === 1) {
            //添加成功
            message.success('添加成功')
        } else if (props.addQuestionsFlag === -1) {
            //添加失败
            message.error('添加失败！')
        }
    }, [props.addQuestionsFlag]);

    //提交添加试题
    let handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                let params = values;
                params.user_id = props.userInfoData.user_id;
                props.add(params)
            }
        });
    }

    const { getFieldDecorator } = props.form;
    const { Option } = Select;
    const { Header, Content } = Layout;
    return (
        <div className={styles['wrap']}>
            {/* <Header style={{ background: '#f0f2f5', padding: 0 ,height:70}}> */}
                <h1 className={styles.conhead}>{props.intl.formatMessage({id: 'questions.type.title'})}</h1>
            {/* </Header> */}
            <Content style={{ margin: '0 16px' }} className={styles.con}>
                <div style={{ padding: 24, background: '#fff', height: '100%' }}>
                    <Form className="login-form" onSubmit={handleSubmit}>
                        <div className={styles.markcont}>
                            <p>{props.intl.formatMessage({id: 'questions.titleInformation'})}</p>
                            <Form.Item>
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: '请输入题目标题!' }],
                                })(
                                    <Input placeholder="请输入题目标题,不超过20个" style={{ width: '50%' }} />
                                )}
                            </Form.Item>
                            <p>{props.intl.formatMessage({id: 'questions.Subjectmanagement'})}</p>
                            <Form.Item>
                                {getFieldDecorator('questions_stem')(
                                    <Editor style={{ height: '350px', width: '100%' }} placeholder='请输入内容...' />
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            <p>{props.intl.formatMessage({id: 'questions.type.test'})}</p>
                            <Form.Item>
                                {getFieldDecorator('exam_id', {
                                    rules: [{ required: true, message: '请输入题目标题!' }],
                                    initialValue: '请选择考试类型'
                                })(
                                    <Select style={{ width: 160 }}>
                                        {
                                            props.examTypeData.map(item => {
                                                return < Option value={item.exam_id} key={item.exam_id} > {item.exam_name}</Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                        </div>
                        <div>
                            <p>{props.intl.formatMessage({id: 'questions.type.course'})}</p>
                            <Form.Item>
                                {getFieldDecorator('subject_id', {
                                    rules: [{ required: true, message: '请输入题目标题!' }],
                                    initialValue: '请选择课程类型'
                                })(
                                    <Select style={{ width: 160 }}>
                                        {
                                            props.subjectTypeData.map(item => (
                                                <Option value={item.subject_id} key={item.subject_id}>{item.subject_text}</Option>
                                            ))
                                        }
                                    </Select>
                                )}
                            </Form.Item>

                        </div>
                        <div>
                            <p>{props.intl.formatMessage({id: 'questions.type.topic'})}</p>
                            <Form.Item>
                                {getFieldDecorator('questions_type_id', {
                                    rules: [{ required: true, message: '请输入题目标题!' }],
                                    initialValue: '请选择题目类型'
                                })(
                                    <Select style={{ width: 160 }}>
                                        {
                                            props.questionsTypeData.map(item => (
                                                <Option value={item.questions_type_id} key={item.questions_type_id}>{item.questions_type_text}</Option>
                                            ))
                                        }
                                    </Select>
                                )}
                            </Form.Item>

                        </div>
                        <div className={styles.markcont}>
                            <h2 className={styles.daanTit}>{props.intl.formatMessage({id: 'questions.answer'})}</h2>
                            <Form.Item >
                                {getFieldDecorator('questions_answer', {
                                    initialValue: ''
                                })(
                                    <Editor style={{ height: '350px' }} placeholder='请输入内容...' />
                                )}
                            </Form.Item>
                        </div>
                        <Button type="primary" htmlType="submit" className={styles.submit_btn} >{props.intl.formatMessage({id: 'questions.submit'})}</Button>
                    </Form>
                </div>
            </Content>
        </div>
    )

}

AddItem.propTypes = {

}
const mapStateToProps = (state, ownProps) => {
    return {
        ...state.questionClass,
        ...state.userData
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // 添加试题
        add(payload) {
            // console.log(payload)
            dispatch({
                type: "questionClass/add",
                payload
            })
        },
        // 获取考试类型
        examType() {
            dispatch({
                type: "questionClass/examType"
            })
        },
        // 获取课程类型
        subjectType() {
            dispatch({
                type: "questionClass/subjectType"
            })
        },
        // 获取题目类型
        questionsType() {
            dispatch({
                type: "questionClass/questionsType"
            })
        },
        userInfo() {
            dispatch({
                type: 'userData/userInfo'
            })
        }
    }
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddItem)))
