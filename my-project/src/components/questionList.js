import React from 'react'
import { List, Button } from 'antd'
import { connect } from 'dva'
import './a.scss'



function QuestionList(props) {

  let addQuestion = (item) => {
    props.addQuestionFn(item)
  }
  return (
    <div>
      <List
        className='demo-loading-list'
        itemLayout='horizontal'
        dataSource={props.props && props.props}
        style={{ padding: 20 }}
        pagination={{ pageSize: 6 }}
        renderItem={item => (
          <List.Item action={[<Button type='primary' onClick={() => addQuestion(item)}>添加</Button>]} style={{ display: 'flex', justifyContent: 'space-between' }} className="table-list">
            <div>
              <p>{item.title}</p>
              <div className='color'>
                <p className="content_every_cont_left_left_y">{item.questions_type_text}</p>
                <p className="content_every_cont_left_center_y">{item.subject_text}</p>
                <p className="content_every_cont_left_right_y">{item.exam_name}</p>
              </div>
            </div>
          </List.Item>
        )}
      >
      </List>
    </div>
  )
}


const mapStateToProps = (state, ownProps) => {
  return state
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addQuestionFn(item){
      dispatch({
        type: 'questionClass/addQuestionFn',
        item
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)