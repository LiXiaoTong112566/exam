(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{650:function(e,t,n){"use strict";n.d(t,"g",function(){return a}),n.d(t,"j",function(){return u}),n.d(t,"h",function(){return c}),n.d(t,"a",function(){return o}),n.d(t,"c",function(){return d}),n.d(t,"f",function(){return i}),n.d(t,"b",function(){return s}),n.d(t,"d",function(){return f}),n.d(t,"i",function(){return m}),n.d(t,"k",function(){return p}),n.d(t,"e",function(){return b});var r=n(9),a=function(){return Object(r.a)("/manger/grade")},u=function(){return Object(r.a)("/manger/grade/new")},c=function(){return Object(r.a)("/manger/room")},o=function(e){return Object(r.a)("/manger/grade",{method:"POST",body:e})},d=function(e){return Object(r.a)("/manger/grade/delete",{method:"DELETE",body:e})},i=function(e){return Object(r.a)("/manger/grade/update",{method:"PUT",body:e})},s=function(e){return Object(r.a)("/manger/room",{method:"POST",body:e})},f=function(e){return Object(r.a)("/manger/room/delete",{method:"DELETE",body:e})},m=function(){return Object(r.a)("/manger/student")},p=function(){return Object(r.a)("/manger/student/new")},b=function(e){var t=e.student_id;return Object(r.a)("/manger/student/".concat(t),{method:"DELETE"})}},663:function(e,t,n){"use strict";n.d(t,"e",function(){return a}),n.d(t,"b",function(){return u}),n.d(t,"g",function(){return c}),n.d(t,"d",function(){return o}),n.d(t,"c",function(){return d}),n.d(t,"f",function(){return i}),n.d(t,"a",function(){return s});var r=n(9);function a(e){var t=e.grade_id;return console.log(t),Object(r.a)("/exam/student?grade_id="+t)}function u(e){return Object(r.a)("/exam/exam",{method:"POST",body:e})}function c(e){var t=e.id,n=e.question_ids;return Object(r.a)("/exam/exam/"+t,{method:"PUT",body:{question_ids:n}})}function o(e){return Object(r.a)("/exam/exam",{method:"GET"})}function d(e){return Object(r.a)("/exam/exam/"+e,{method:"GET"})}function i(e){return Object(r.a)("/exam/student/"+e,{method:"GET"})}function s(e){var t=e.paper_id,n=e.score;return Object(r.a)("/exam/student/"+t,{method:"PUT",body:{score:n}})}},871:function(e,t,n){"use strict";n.r(t);var r=n(93),a=n.n(r),u=n(15),c=n(663),o=n(650),d=function(){return Promise.all([Object(o.g)()])};t.default={namespace:"examValueate",state:{paper_detal:{},gradeList:[],valueateList:[]},reducers:{changeState:function(e,t){return Object(u.a)({},e,t)}},effects:{studentPaper:a.a.mark(function e(t,n){var r,u,o,d;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.paper_id,u=n.call,o=n.put,e.next=4,u(c.f,r);case 4:return d=e.sent,e.next=7,o({type:"changeState",paper_detal:d.data});case 7:case"end":return e.stop()}},e,this)}),correction:a.a.mark(function e(t,n){var r,u,o,d;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.paper_id,u=t.score,o=n.call,e.next=4,o(c.a,{paper_id:r,score:u});case 4:return d=e.sent,e.abrupt("return",Promise.resolve(d));case 6:case"end":return e.stop()}},e,this)}),requestData:a.a.mark(function e(t,n){var r,c,o,i,s;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.call,c=n.put,e.next=3,r(d);case 3:return o=e.sent,i=["gradeList"],s={},o.forEach(function(e,t){e&&(s[i[t]]=e.data)}),e.next=9,c(Object(u.a)({type:"changeState"},s));case 9:case"end":return e.stop()}},e,this)}),evalueate:a.a.mark(function e(t,n){var r,u,o,d;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.gradeId,u=n.call,o=n.put,e.next=4,u(c.e,{grade_id:r});case 4:return d=e.sent,e.next=7,o({type:"changeState",valueateList:d.exam});case 7:case"end":return e.stop()}},e,this)})}}}}]);
//# sourceMappingURL=7.c3f94708.chunk.js.map