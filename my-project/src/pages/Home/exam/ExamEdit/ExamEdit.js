import React, { useEffect } from 'react';
import { connect } from "dva";
import ReactMarkdown from 'react-markdown';
import { Form, Input, Button, Select, InputNumber, DatePicker, message, Drawer } from 'antd'
// import locale from 'antd/lib/date-picker/locale/zh_CN';
import style from './ExamEdit.scss'


function ExamEdit(props) {
  return (
    <div className={style.exam_wrapper}>
      <h2 className='user-title'>创建试卷</h2>
      <div className={style.exam_main}>
        <Button >添加新题</Button>
        <div className={style.exam_content}>
         
          <h2>这里是死的</h2>
          <p>考试时间：1小时30分钟  监考人：刘于  开始考试时间：2018.9.10  10:00  阅卷人：刘于</p>
          {/* <div className={style.exam_question_box}>
            {
              props.createpaperList.questions.map((item, index) => (
                <div className={style.exam_item} key={index}>
                  <h4>
                    <p>{index + 1}: {item.title}</p>
                    <Button type="link" >删除</Button>
                  </h4>
                  <div>2
                    <ReactMarkdown source={item.questions_stem} />
                  </div>
                </div>
              ))
            }
          </div> */}
          <Button type="primary">创建试卷</Button>
        </div>
      </div>
      <Drawer
        title="所有题目"
        placement="right"
        closable={false}
        width="520"
        // onClose={() => showDrawer(false)}
        // visible={visible}
        style={{ padding: 0 }}
      >
        {
          // props.getQuestionsData.length ? <TableView props={props.getQuestionsData} /> : null
        }
      </Drawer>
    </div>
  )

}




const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamEdit)