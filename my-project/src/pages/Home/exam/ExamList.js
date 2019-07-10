import React from 'react';
import {connect} from "dva";
function ExamList(){
    return (
        <div>试卷列表</div>
    )

}

ExamList.propTypes={

}

export default connect()(ExamList)