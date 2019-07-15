import React, { useEffect } from 'react';
import { connect } from "dva";
import { Form, Input, Button, Select, InputNumber, DatePicker, message } from 'antd'
// import locale from 'antd/lib/date-picker/locale/zh_CN';
import styles from './ExamDetail.scss'


function ExamDetail(){
  return (
    <div>
      
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

export default connect(mapStateToProps, mapDispatchToProps)(ExamDetail)