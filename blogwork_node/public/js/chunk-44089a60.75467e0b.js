(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-44089a60"],{"308b":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"box"},[n("mavonEditor",{attrs:{boxShadow:!1},on:{save:t.saveMd},model:{value:t.articleContent,callback:function(e){t.articleContent=e},expression:"articleContent"}}),n("div",{staticClass:"icon-post",on:{click:function(e){return t.$router.back()}}},[n("i",{staticClass:"el-icon-back"})])],1)},a=[],c=n("1da1"),o=(n("96cf"),n("b2d8")),i=(n("64e1"),{name:"EditMd",components:{mavonEditor:o["mavonEditor"]},data:function(){return{articleContent:""}},methods:{saveMd:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.post("/root/savemd",{id:t.$route.query.id,articleContent:t.articleContent});case 2:n=e.sent,r=n.data,t.$message.success(r.value);case 5:case"end":return e.stop()}}),e)})))()},getMark:function(t){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$http.get("".concat(t.articleOrigin));case 2:if(r=n.sent,a=r.data,a){n.next=6;break}return n.abrupt("return");case 6:e.articleContent=a;case 7:case"end":return n.stop()}}),n)})))()}},created:function(){this.$store.commit("CHNAGESHOW",!1),this.getMark(this.$route.query)},beforeRouteLeave:function(t,e,n){this.$store.commit("CHNAGESHOW",!1),n()}}),s=i,u=(n("f9cd"),n("2877")),d=Object(u["a"])(s,r,a,!1,null,"21b07340",null);e["default"]=d.exports},b4cc:function(t,e,n){},f9cd:function(t,e,n){"use strict";n("b4cc")}}]);
//# sourceMappingURL=chunk-44089a60.75467e0b.js.map