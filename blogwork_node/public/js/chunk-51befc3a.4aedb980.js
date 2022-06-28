(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51befc3a"],{"1f3b":function(e,r,t){},5798:function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("h2",{staticClass:"border_left"},[e._v("修改资料")]),t("el-tabs",{attrs:{type:"card"},model:{value:e.activeName,callback:function(r){e.activeName=r},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"用户名",name:"first"}},[t("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"80px"}},[t("el-form-item",{attrs:{label:"原用户名"}},[e._v(e._s(e.userInfo.userName))]),t("el-form-item",{attrs:{label:"新用户名",prop:"userName"}},[t("el-input",{attrs:{type:"text",autocomplete:"off",size:"small"},model:{value:e.ruleForm.userName,callback:function(r){e.$set(e.ruleForm,"userName",r)},expression:"ruleForm.userName"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(r){return e.handlerClick("ruleForm")}}},[e._v("提交")])],1)],1)],1),t("el-tab-pane",{attrs:{label:"修改密码",name:"second"}},[t("el-form",{ref:"ruleFormPass",attrs:{model:e.ruleFormPass,rules:e.rulesPass,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"原密码",prop:"originPass"}},[t("el-input",{attrs:{type:e.inputType,autocomplete:"off"},model:{value:e.ruleFormPass.originPass,callback:function(r){e.$set(e.ruleFormPass,"originPass",r)},expression:"ruleFormPass.originPass"}})],1),t("el-form-item",{attrs:{label:"新密码",prop:"newPass"}},[t("el-input",{attrs:{type:e.inputType,autocomplete:"off"},model:{value:e.ruleFormPass.newPass,callback:function(r){e.$set(e.ruleFormPass,"newPass",r)},expression:"ruleFormPass.newPass"}})],1),t("el-form-item",{attrs:{label:"确认密码",prop:"resultPass"}},[t("el-input",{attrs:{type:e.inputType,autocomplete:"off"},model:{value:e.ruleFormPass.resultPass,callback:function(r){e.$set(e.ruleFormPass,"resultPass",r)},expression:"ruleFormPass.resultPass"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleFormPass")}}},[e._v("提交")]),t("el-button",{on:{click:function(r){e.inputType="text"}}},[e._v("显示密码")])],1)],1)],1),t("el-tab-pane",{attrs:{label:"更换头像",name:"third"}},[t("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/blog/changeimg",data:{id:e.userInfo._id},"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?t("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1)],1)},s=[],n=t("1da1"),u=t("5530"),o=(t("96cf"),t("d9e2"),t("ac1f"),t("00b4"),t("d3b7"),t("3ca3"),t("ddb0"),t("2b3d"),t("9861"),t("2f62")),l={name:"Information",data:function(){var e=this,r=function(e,r,t){var a=/^[\u4e00-\u9fa5_\w]{3,14}$/;if(!r)return t(new Error("用户名不能为空"));a.test(r)?t():t(new Error("请求输入3-14个字符"))},t=function(r,t,a){if(!t)return a(new Error("用户名不能为空"));t!=e.userInfo.userPass?a(new Error("原密码错误")):a()},a=function(e,r,t){var a=/^[\w_`~!@#$%^&*()+=-\\\]\]\{\}:;'\,.<>/?]{6,15}$/;return""==r?t(new Error("密码不能为空！")):a.test(r)?void t():t(new Error("输入6~15个字符，不能是中文"))},s=function(r,t,a){""===t?a(new Error("请输入密码")):t!=e.ruleFormPass.newPass?a(new Error("与之前密码不相符合")):a()};return{activeName:"third",imageUrl:"",inputType:"password",ruleForm:{userName:""},ruleFormPass:{originPass:"",newPass:"",resultPass:""},rules:{userName:[{validator:r,trigger:"blur"}]},rulesPass:{originPass:[{validator:t,trigger:"blur"}],newPass:[{validator:a,trigger:"blur"}],resultPass:[{validator:s,trigger:"blur"}]}}},computed:{userInfo:function(){return this.$store.state.userInfo}},methods:Object(u["a"])(Object(u["a"])({},Object(o["b"])({changeInfo:"CHNAGEUSERINFO"})),{},{handlerClick:function(e){var r=this;this.$refs[e].validate(function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:if(r.userInfo.userName!=r.ruleForm.userName){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,r.$http.post("/blog/changeuser",{userName:r.ruleForm.userName,id:r.userInfo._id});case 6:if(a=e.sent,s=a.data,200===s.code){e.next=10;break}return e.abrupt("return",r.$message.error("修改失败！"));case 10:r.changeInfo(s.data),r.$message.success(s.value),r.$refs.ruleForm.resetFields();case 13:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}())},submitForm:function(e){var r=this;this.$refs[e].validate(function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,r.$http.post("/blog/changepass",{userPass:r.ruleFormPass.resultPass,id:r.userInfo._id});case 4:if(a=e.sent,s=a.data,200===s.code){e.next=8;break}return e.abrupt("return",r.$message.error("修改失败！"));case 8:r.changeInfo(s.data),r.$message.success(s.value),r.$refs.ruleFormPass.resetFields();case 11:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}())},handleAvatarSuccess:function(e,r){this.imageUrl=URL.createObjectURL(r.raw),this.changeInfo(e.data),this.$message.success("修改成功")},beforeAvatarUpload:function(e){var r="image/jpeg"===e.type,t=e.size/1024/1024<2;return r||this.$message.error("上传头像图片只能是 JPG 格式!"),t||this.$message.error("上传头像图片大小不能超过 2MB!"),r&&t}})},i=l,c=(t("5e24"),t("2877")),m=Object(c["a"])(i,a,s,!1,null,"0cef378a",null);r["default"]=m.exports},"5e24":function(e,r,t){"use strict";t("1f3b")}}]);
//# sourceMappingURL=chunk-51befc3a.4aedb980.js.map