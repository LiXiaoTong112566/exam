import React from "react";
import { connect } from "dva";

import TestClassCom from "@/components/testClassCom";
import testClassCss from "./testClass.scss";
function testClass() {
  return (
    <div className={testClassCss.testClassPage}>
      <h3>试卷列表</h3>
      <div className={testClassCss.testClassBox}>
        <TestClassCom />
      </div>
    </div>
  );
}
testClass.propTypes = {};

export default connect()(testClass);
