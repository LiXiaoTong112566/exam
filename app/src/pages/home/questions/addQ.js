import React from 'react';
import { connect } from 'dva';

function AddQ(){
    return(
        <div>
            添加试题
        </div>
    )
}


AddQ.propTypes = {
};


export default connect()(AddQ);
