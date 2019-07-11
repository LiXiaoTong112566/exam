import React from 'react';
import {connect} from "dva";
function AddExam(){
    return (
        <div>添加考试</div>
    )

}

AddExam.propTypes={

}

export default connect()(AddExam)