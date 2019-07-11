import React from 'react';
import { connect } from 'dva';

function UserShow(){
    return(
        <div>
           用户展示
        </div>
    )
}


UserShow.propTypes = {
};


export default connect()(UserShow);
