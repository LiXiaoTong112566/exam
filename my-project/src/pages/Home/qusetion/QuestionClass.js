import React from 'react';
import {connect} from "dva";
function QuestionClass(){
    return (
        <div>试题分类</div>
    )

}

QuestionClass.propTypes={

}

export default connect()(QuestionClass)