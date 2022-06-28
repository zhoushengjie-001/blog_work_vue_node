<template>
  <div id="app">
    <MaskCanvas />
    <HeaderNav />
    <div class="center_wrap">
      <div class="box_left" v-if="$store.state.showbol">
        <IndividualSidebar />
      </div>
      <div class="center_right">
        <router-view></router-view>
      </div>
    </div>
    <div class="footer_wrap">
      <div class="footer_wrap_box">
        <div class="study_type">
          <a target="_blank" href="https://leetcode-cn.com/">力扣</a>
          <a target="_blank" href="https://juejin.cn/">掘金</a>
          <a target="_blank" href="https://www.topgoer.cn/">地鼠文档</a>
          <a target="_blank" href="https://www.luogu.com.cn/">洛谷</a>
        </div>
        <el-divider></el-divider>
        <p style="font-size: 14px; padding: 5px 0 10px 0; color: rgb(14, 8, 8)">
          版权所有 © zsj
        </p>
        <p>
          <a
            href="https://beian.miit.gov.cn"
            style="font-size: 14px; color: rgb(14, 8, 8)"
            >豫ICP备2022004811号-1</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav.vue";
import MaskCanvas from "./components/MaskCanvas.vue";
import IndividualSidebar from "./components/IndividualSidebar.vue";
export default {
  name: "App",
  components: { HeaderNav, MaskCanvas, IndividualSidebar },
};
</script>

<style lang="less">
.footer_wrap_box p {
  text-align: center;
}
.study_type a {
  font-size: 14px;
  flex: 1;
  text-align: center;
  color: rgb(14, 8, 8);
}
.study_type a:hover {
  color: rgb(14, 8, 8);
}
.study_type {
  display: flex;
}
.footer_wrap_box {
  margin: 20px auto;
  padding: 15px;
  width: 70%;
}
#nprogress .bar {
  background: rgb(245, 222, 155) !important; //自定义颜色
}
* {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
  color: black;
}
.border_left {
  border-left: 5px solid #409eff;
  padding-left: 15px;
}
#app {
  .center_wrap {
    display: flex;
    margin: 65px auto 0;
    justify-content: space-between;
    max-width: 1200px;
    min-width: 375px;
    .box_left {
      background-color: #fff;
      width: 220px;
      min-height: 100vh;
    }
    .center_right {
      background-color: #fff;
      flex: auto;

      min-height: 100vh;
      padding: 15px;
      box-shadow: 0 0 5px 2px #ccc;
      z-index: 1;
    }
  }
}
</style>
