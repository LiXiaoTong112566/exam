(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{565:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"c",function(){return c}),n.d(t,"d",function(){return u}),n.d(t,"a",function(){return s}),n.d(t,"e",function(){return o}),n.d(t,"f",function(){return i});var a=n(9);function r(){return Object(a.a)("/exam/examType")}function c(){return Object(a.a)("/exam/getQuestionsType")}function u(){return Object(a.a)("/exam/subject")}function s(e){return Object(a.a)("/exam/questions",{method:"POST",body:e})}function o(e){var t=[];for(var n in e)e[n]&&t.push("".concat(n,"=").concat(e[n]));var r="?"+t.join("&");return console.log(r),Object(a.a)("/exam/questions/condition".concat(r))}function i(e){return Object(a.a)("/exam/questions/update",{method:"PUT",body:e})}},854:function(e,t,n){"use strict";n.r(t);var a=n(93),r=n.n(a),c=n(15),u=n(565);t.default={namespace:"watchQuestions",state:{questions:[],subject:[],questionsType:[],examType:[]},reducers:{changeState:function(e,t){return Object(c.a)({},e,t)}},effects:{getQuestions:r.a.mark(function e(t,n){var a,c,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.call,c=n.put,e.next=3,a(u.e,t.filter);case 3:if(1!==(s=e.sent).code){e.next=7;break}return e.next=7,c({type:"changeState",questions:s.data});case 7:case"end":return e.stop()}},e,this)}),getAllSubject:r.a.mark(function e(t,n){var a,c,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.call,c=n.put,e.next=3,a(u.d);case 3:if(1!==(s=e.sent).code){e.next=7;break}return e.next=7,c({type:"changeState",subject:s.data});case 7:case"end":return e.stop()}},e,this)}),getQuestionsType:r.a.mark(function e(t,n){var a,c,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.call,c=n.put,e.next=3,a(u.c);case 3:if(1!==(s=e.sent).code){e.next=7;break}return e.next=7,c({type:"changeState",questionsType:s.data});case 7:case"end":return e.stop()}},e,this)}),getAllExamType:r.a.mark(function e(t,n){var a,c,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.call,c=n.put,e.next=3,a(u.b);case 3:if(1!==(s=e.sent).code){e.next=7;break}return e.next=7,c({type:"changeState",examType:s.data});case 7:case"end":return e.stop()}},e,this)})}}}}]);
//# sourceMappingURL=5.aed23b58.chunk.js.map