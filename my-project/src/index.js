import dva from 'dva';
import createLoading from "dva-loading";  
import './index.css';
import 'antd/dist/antd.css';
// 1. Initialize
const app = dva();
app.use(createLoading())

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/login.module').default);
app.model(require('./models/questionClass.module').default);
app.model(require('./models/userManage.module').default);
app.model(require("./models/addUser/userAllData.module").default)
app.model(require('./models/GradeManage.module').default);
app.model(require('./models/ClassManage.module').default);
app.model(require('./models/ExamList.module').default);
app.model(require('./models/global').default);
app.model(require('./models/lookCheck.module').default);
app.model(require('./models/manageStudent.model').default);
app.model(require('./models/AwaitClass.module').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
