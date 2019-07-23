//试题管理

import dynamic from 'dva/dynamic'

//试题管理
const AddItem = dynamic({
    component: () => import('@/pages/Home/qusetion/AddItem/AddItem'),
  });

  const CheckItem = dynamic({
    component: () => import('@/pages/Home/qusetion/CheckItem/CheckItem'),
  });

  const QuestionClassify = dynamic({
    component: () => import('@/pages/Home/qusetion/QuestionClass/QuestionClass'),
  });


  //用户管理

  const AddUser = dynamic({
    component: () => import('@/pages/Home/users/AddUser/AddUser'),
  });
  const ShowUser = dynamic({
    component: () => import('@/pages/Home/users/ShowUser/ShowUser'),
  });
  //考试管理
  const AddExam = dynamic({
    component: () => import('@/pages/Home/exam/AddExam/AddExam'),
  });
  const ExamList = dynamic({
    component: () => import('@/pages/Home/exam/ExamList/ExamList'),
  });
  const ExamEdit = dynamic({
    component: () => import('@/pages/Home/exam/ExamEdit/ExamEdit'),
  });

  //班级管理
  const ClassManage = dynamic({
    component: () => import('@/pages/Home/grade/ClassManage/ClassManage'),
  });
  const GradeManage = dynamic({
    component: () => import('@/pages/Home/grade/GrandeManage/GradeManage'),
  });

  const StudentManage = dynamic({
    component: () => import('@/pages/Home/grade/SturentManage/StudentManage'),
  });

  //阅卷管理
  const AwaitClass = dynamic({
    component: () => import('@/pages/Home/Marking/AwaitClass/AwaitClass.js'),
  });
  const TestClass = dynamic({
    component: () => import('@/pages/Home/Marking/testClass/testClass.js'),
  });
  const ReadExam = dynamic({
    component: () => import('@/pages/Home/Marking/readExam/readExam.js'),
  });

  //试题详情
  const Detail = dynamic({
    component: () => import('@/pages/Home/qusetion/CheckItem/detail'),
  });
  ////编辑试题
  const DetailCompile = dynamic({
    component: () => import('@/pages/Home/qusetion/CheckItem/detailCompile'),
  });
  //考试管理
  const ExamListDetail = dynamic({
    component: () => import('@/pages/Home/exam/ExamList/detailX/ExamListDetail'),
  });




export default{
    routes:[
        {
            name:"router.questions",
            path:"",
            children:[
                {
                    name:"router.questions.add",
                    path:"/home/addItem",
                    view_id:"main-addQuestions",
                    components:AddItem
                },{
                    name:"router.questions.type",
                    path:"/home/classifyItem",
                    view_id:"main-questionsType",
                    components:QuestionClassify
                    
                },
                {
                    name:"router.questions.view",
                    path:"/home/checkItem",
                    view_id:"main-watchQuestions",
                    components:CheckItem
                }, {
                    name:"",
                    path:"/home/detailCompile/:id",
                    view_id:"main-editQuestions",
                    components:DetailCompile
                },{

                    name:"",
                    path:"/home/detail/:id",
                    view_id:"main-questionsDetail",
                    components:Detail

                }
            ]
        },{
            name:"router.management",
            path:"",
            children:[
                {
                    name:"router.management.add",
                    path:"/home/addUser",
                    view_id:"main-addUser",
                    components:AddUser
                },{
                    name:"router.management.view",
                    path:"/home/showUser",
                    view_id:"main-showUser",
                    components:ShowUser
                    
                }
            ]

        },{
            name:"router.examination",
            path:"",
            children:[
                {
                    name:"router.examination.add",
                    path:"/home/addExam",
                    view_id:"main-addExam",
                    components:AddExam
                },{
                    name:"router.examination.list",
                    path:"/home/examList",
                    view_id:"main-examList",
                    components:ExamList
                    
                },{
                    name:"",
                    path:"/home/ExamListDetail/:id",
                    view_id:"main-examDetail",
                    components:ExamListDetail

                },{
                    name:"",
                    path:"/home/exam/examEdit",
                    view_id:"main-examEdit",
                    components:ExamEdit

                }
            ]

        },{

            name:"router.classManagement",
            path:"",
            children:[
                {
                    name:"router.classManagement",
                    path:"/home/gradeManage",
                    view_id:"main-grade",
                    components:GradeManage
                },{
                    name:"router.classRoomManagement",
                    path:"/home/classManage",
                    view_id:"main-room",
                    components:ClassManage
                    
                },{
                    name:"router.Stylexamination",
                    path:"/home/studentManage",
                    view_id:"main-student",
                    components:StudentManage

                },
            ]

        },
        {

            name:"router.Marking",
            path:"",
            children:[
                {
                    name:"router.AwaitingApproval",
                    path:"/home/awaitClass",
                    view_id:"main-examPaperClassList",
                    components:AwaitClass,
                   
                },
                {
                    name:"",
                    path:"/home/readExam/:id",
                    view_id:"main-examinationPapers",
                    components:ReadExam,
                   
                },
                {
                    name:"",
                    path:"/home/testClass/:id",
                    view_id:"main-examPaperClassmate",
                    components:TestClass,
                   
                },
            ]

        },
    ]
}