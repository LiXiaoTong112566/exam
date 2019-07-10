import React from 'react';
import { connect } from 'dva';

function questionsL(){
    return(
        <div>
             试题分类
        </div>
    )
}


questionsL.propTypes = {
};


export default connect()(questionsL);
