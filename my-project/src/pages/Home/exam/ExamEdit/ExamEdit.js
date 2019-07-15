import React, { useEffect } from 'react';
import { connect } from "dva";
import { Form, Input, Button, Select, InputNumber, DatePicker, message } from 'antd'
// import locale from 'antd/lib/date-picker/locale/zh_CN';
import styles from './ExamEdit.scss'


function ExamEdit() {
  return (
    <div className={styles.exam_wrap}>
      <h2 className='user-title'>创建试卷</h2>
      <div className={styles.exam_mian}>
        <Button >添加新题</Button>
        
      </div>
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