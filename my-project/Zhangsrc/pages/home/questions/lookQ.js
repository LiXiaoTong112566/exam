import React from 'react';
import { connect } from 'dva';

function LookQ(){
    return(
        <div>
           查看试题
        </div>
    )
}


LookQ.propTypes = {
};


export default connect()(LookQ);
