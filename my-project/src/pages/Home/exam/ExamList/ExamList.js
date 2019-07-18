import React , {useState,useEffect} from 'react';
import {connect} from "dva";
import styles from './ExamList.scss'
import { Tag, Button, Select, Form , Radio , Table , Divider} from 'antd';
import moment from 'moment'
function ExamList(props){
    const { getFieldDecorator } = props.form;
    const { Option } = Select;
    const { Column, ColumnGroup } = Table;
    useEffect(() => {
        props.subjectDa()//获取所有课程数据
        props.examTypeDa()//获取考试类型
        props.examListDa()  //获取试卷列表
      }, [])
      console.log(props.examListData)
        //点击
        let [flag , changeBtn] = useState('all')
        let handleBtnChange = (e) => {
            changeBtn(e.target.value)
            if(flag === 'all') {
                console.log(2)                
            } else if(flag === 'underway') {
                console.log(2)
            } else if(flag === 'stop') {
                console.log(3)
            }  
        }
                // //处理表单提交
        let handleSubmit = () => {
            props.form.validateFields((err, values) => {
                if (!err) {
                    props.examListDa({}) 
                }
            });
        };
           //点击跳考试详情
        let ToQuestionDetail = (item) => {
            console.log(item)
            props.history.push({ 
                pathname: `/home/ExamListDetail/?id=${item.exam_exam_id}`
        })
        }

    return (
        <div className={styles.ExamList_wrap}>
        <h1>考试列表</h1>
        <div className={styles.ExamList_type}>
        <div className={styles.ExamList_form}>
        <Form layout="inline" onSubmit={handleSubmit}>
            <Form.Item label='考试类型' style={{ marginLeft:50 }}>
                {getFieldDecorator('exam_id', {
                      initialValue: ""
                })(
                <Select style={{ width: 300 }}>
                {
                   props.examTypeData&&props.examTypeData.map((item, index) => {
                       
                       return <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>
                    })
                }
                </Select>,
                )}
            </Form.Item>
            <Form.Item label='课程' style={{ marginLeft:50 }}>
                {getFieldDecorator('subject_id', {
                    initialValue: ""
                })(
                    <Select style={{ width: 300 }}>
                    {
                        props.subjectData && props.subjectData.map((item, index) => {
                        return <Option value={item.subject_id} key={item.subject_id}>{item.subject_text}</Option>
                        })
                    }
                    </Select>,
                )}
            </Form.Item>
            <Form.Item>
                <Button
                type="primary"
                icon="search"
                htmlType="submit"
                style={{ width: 150 ,marginLeft:50}}
                    >
                    查询
                </Button>
            </Form.Item>
          </Form>
        </div>
        </div>
        <div className={styles.ExamList_list}>
            <div className={styles.ExamList_list_title}>
                <h3>试卷列表</h3>
                <Radio.Group value={flag} onChange={handleBtnChange}>
                    <Radio.Button value="all">全部</Radio.Button>
                    <Radio.Button value="underway">进行中</Radio.Button>
                    <Radio.Button value="stop">已结束</Radio.Button>
                </Radio.Group>
            </div>
            <div className={styles.ExamList_list_list}>
                <Table dataSource={props.examListData} rowKey="exam_id">
                    <Column title="试卷信息" dataIndex='title' rowKey="title" />
                    <Column title="班级" dataIndex="room_text" rowKey="room_text" />
                    <Column title="创建人" dataIndex="user_name" rowKey="user_name" />
                    <Column 
                        title="开始时间"
                        key="start_time"
                        render={(text, record) => (
                            <span>
                                {moment(text.start_time*1).format('YYYY-MM-DD HH:mm:ss')}
                            </span>
                        )}
                    />
                     <Column 
                        title="开始时间"
                        key="end_time"
                        render={(text, record) => (
                            <span>
                                {moment(text.start_time*1).format('YYYY-MM-DD HH:mm:ss')}
                            </span>
                        )}
                    />
                    <Column 
                        title="操作"
                        key="action"
                        render={(text, record) => (
                            <span>
                            <a href="javascript:;" onClick={() => { ToQuestionDetail(record) }}>详情</a>
                            <Divider type="详情" />
                            </span>
                        )}
                    />
                </Table> 
            </div>
        </div>
    </div>
    )

}

ExamList.propTypes={}
const mapToProps = state => {
    return {...state.examListS}
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      //获取所有课程
      subjectDa: () => {
        dispatch({
          type: "examListS/subject"
        })
      },
       //获取考试类型
       examTypeDa: () => {
        dispatch({
          type: "examListS/examType"
        })
      },
       //获取试卷列表
       examListDa: () => {
        dispatch({
          type: "examListS/examList"
        })
      },
    }
  }

export default connect(mapToProps,mapDispatchToProps)(Form.create()(ExamList));
