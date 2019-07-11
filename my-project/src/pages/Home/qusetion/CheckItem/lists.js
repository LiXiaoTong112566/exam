import React from 'react';
import { connect} from 'dva';
import { withRouter } from 'dva/router';
import { Input, Col, Row, Select, Button } from "antd";
function Lists(props){
 let routerTo=(item)=>{
     console.log(item);
        props.history.push({
            pathname:`/home/detail/?id=${item.questions_id}`,
            state:{data:item}
        })
    }
    return(
        <dl onClick={()=>routerTo(props.item)}>
            <dt>
                <p className="p_t">{props.item.title}</p>
                <Button type="primary">{props.item.questions_type_text}</Button>
                <Button type="primary">{props.item.subject_text}</Button>
                <Button type="primary">{props.item.exam_name}</Button>
                <p>{props.item.user_name}</p>
            </dt>
            <dd>编辑</dd>
        </dl>
    )
}


Lists.propTypes = {
};


export default connect()(withRouter(Lists));
