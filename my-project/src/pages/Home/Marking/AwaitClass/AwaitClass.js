import React from "react";
import { connect } from "dva";

import AwaitClassCom from "@/components/AwaitClassCom";
import AwaitClassCss from "./AwaitClass.scss";
function AwaitClass(props) {
  return (
    <div className={AwaitClassCss.AwaitClassPage}>
      <h1>待批班级</h1>
      <div className={AwaitClassCss.AwaitClassBox}>
        <AwaitClassCom {...props}/>
      </div>
    </div>
  );
}

AwaitClass.propTypes = {};

export default connect()(AwaitClass);
