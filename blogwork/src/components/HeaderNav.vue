<template>
  <div class="mask_wrap">
    <el-backtop>
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
            border-radius: 15px;
          }
        "
      >
        <i class="el-icon-arrow-up"></i>
        up
      </div>
    </el-backtop>
    <div class="wrap_center">
      <div class="logo">
        <img
          class="logo_Img"
          src="@/assets/logo_name.png"
          draggable="false"
          alt=""
        />
      </div>
      <ul class="nav_list_center">
        <li v-for="(item, index) in navListArr" :key="index">
          <router-link :to="item.path">{{ item.title }}</router-link>
        </li>
      </ul>
      <!-- 音乐播放器 -->
      <HeaderMusic />
      <!-- 登录注册 -->
      <HeaderLogin />
    </div>
  </div>
</template>

<script>
import HeaderMusic from "./headerBase/HeaderMusic";
import HeaderLogin from "./headerBase/HeaderLogin.vue";
import { mapMutations } from "vuex";
export default {
  name: "HeaderNav",
  components: { HeaderMusic, HeaderLogin },
  data() {
    return {
      navListArr: [
        {
          path: "/",
          title: "首页",
        },
        {
          path: "/article",
          title: "文章",
        },
        {
          path: "/message",
          title: "留言",
        },
        {
          path: "/links",
          title: "友链",
        },
        {
          path: "/about",
          title: "关于",
        },
      ],
    };
  },
  methods: {
    ...mapMutations({ changeInfo: "CHNAGEUSERINFO" }),
    // 获取session
    async getSession() {
      const { data: res } = await this.$http.get("/blog/getcookie");
      if (res.code !== 200) return;
      this.changeInfo(res.data);
    },
  },
  mounted() {
    this.getSession();
  },
};
</script>

<style lang="less" scoped>
.mask_wrap {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background: #fff;
  box-shadow: 0 0 5px 1px #eee;
  z-index: 99;
  .wrap_center {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    min-width: 375px;
    height: 50px;
    margin: 0 auto;
    // background: red;
    // 设置logo
    .logo {
      user-select: none;
      .logo_Img {
        height: 50px;
      }
    }
    // 设置导航
    .nav_list_center {
      display: flex;
      height: 50px;
      margin-left: 10px;
      line-height: 50px;
      user-select: none;
      flex-grow: 1;

      li {
        padding: 0 10px;
      }
    }
    // 播放器
    .muics {
      height: 50px;
      width: 200px;
      background: red;
    }
  }
}
</style>