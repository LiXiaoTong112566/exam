import React, { useEffect } from 'react';
import { connect } from "dva";
import { Form, Input, Button, Select, InputNumber, DatePicker, message } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import styles from './AddExam.scss'

function AddExam(props) {

    useEffect(() => {
        //获取考试类型
        props.examType()
        //获取课程
        props.subjectType()

        if (props.examAddFlag === 1) {
            message.success('添加成功')
            props.examAddFlagFn()
            props.history.push('/home/exam/examEdit')
        } else if (props.examAddFlag === -1) {
            message.error('添加考试失败')
        }
    }, [props.examAddFlag])

    let handleSubmit = e => {
        props.form.validateFields((err, values) => {
            
            if (!err) {
                values.start_time = +values.start_time;
                values.end_time = +values.end_time
                values.number = values.number * 1
                props.examAdd(values)
            }
        })
    }

    const { Option } = Select;
    const { getFieldDecorator } = props.form

    return (
        <div className={styles['exam-wrap']}>
            <h1 className={styles['exam-tit']}>添加考试</h1>
            <div className={styles['exam-con']}>
                <Form className={styles['exam-form']} onSubmit={handleSubmit}>
                    <Form.Item label="试卷名称：">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入试卷名称!' }],
                        })(
                            <Input
                                style={{ width: '50%' }}
                                className='exam-title'
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="选择考试类型：">
                        {getFieldDecorator('exam_id', {
                            rules: [{ required: true, message: '请选择考试类型!' }],
                        })(
                            <Select style={{ width: 160 }}>
                                {
                                    
                                    props.examTypeData.map(item => (
                                        <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="选择课程：">
                        {getFieldDecorator('subject_id', {
                            rules: [{ required: true, message: '请选择课程!' }],
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
                    <Form.Item label="设置题量：">
                        {getFieldDecorator('number', {
                            rules: [{ required: true, message: '请设置题量!' }],
                            initialValue: '4'
                        })(
                            <InputNumber style={{ width: 150 }} />
                        )}
                    </Form.Item>
                    <Form.Item label="考试时间：">
                        <Form.Item style={{ display: 'inline-block' }} >
                            {getFieldDecorator('start_time', {
                                rules: [{ required: true, message: '请选择开始时间!' }],
                            })(
                                <DatePicker placeholder="开始时间"
                                    format="YYYY-MM-DD HH:mm"
                                    showTime={{ format: 'HH:mm' }}
                                    locale={locale}
                                />
                            )}
                        </Form.Item>
                        <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
                        <Form.Item style={{ display: 'inline-block' }}>
                            {getFieldDecorator('end_time', {
                                rules: [{ required: true, message: '请选择结束时间!' }],
                            })(
                                <DatePicker placeholder="结束时间"
                                    format="YYYY-MM-DD HH:mm"
                                    showTime={{ format: 'HH:mm' }}
                                    locale={locale}
                                />
                            )}
                        </Form.Item>
                    </Form.Item>
                    <Button type="primary" htmlType='submit' className={styles['createBtn']}>
                        创建试卷
                    </Button>
                </Form>

            </div>
        </div>
    )

}


const mapStateToProps = (state, ownProps) => {
    return {
        ...state.questionClass
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        //获取考试类型
        examType() {
            dispatch({
                type: 'questionClass/examType'
            })
        },
        subjectType() {
            dispatch({
                type: 'questionClass/subjectType'
            })
        },
        //添加考试
        examAdd(payload){
            dispatch({
                type:'questionClass/examAdd',
                payload
            })
        },
        //修改examAddFlag的状态
        examAddFlagFn(){
            dispatch({
                type:'questionClass/examFlagFn'
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddExam))