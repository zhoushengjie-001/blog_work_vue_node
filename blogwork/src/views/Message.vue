<template>
  <div class="message">
    <h2 class="friend_link_top"><i class="el-icon-reading">留言</i></h2>
    <el-divider content-position="left">留言区</el-divider>
    <div class="wrap">
      <h3 class="title">评论区留言板</h3>
      <div class="center">
        <div class="infinite-list-wrapper" style="overflow: auto">
          <ul
            class="list"
            v-infinite-scroll="load"
            :infinite-scroll-disabled="disabled"
          >
            <li v-for="i in commonList" :key="i._id" class="list-item">
              <img class="award" :src="i.about.userIcon" alt="" />
              <div class="soc_content">
                <p>{{ i.about.userName }} {{ i.messageDate }}</p>
                <p>{{ i.messageInfo }}</p>
              </div>
            </li>
          </ul>
          <p class="p_style" v-if="loading">加载中...</p>
          <p class="p_style" v-if="noMore">
            <el-divider>我是有底线的</el-divider>
          </p>
        </div>
      </div>

      <!-- 底部提交留言区域 -->
      <div class="sumbit_area">
        <i class="el-icon-microphone"></i>
        <input
          type="text"
          placeholder="请输入留言~"
          ref="inputbox"
          v-model="inputMessage"
          @keyup.enter="submit"
        />
        <el-popover placement="bottom" width="200" trigger="click">
          <el-button slot="reference"><b>😀</b></el-button>
          <el-tabs v-model="activeName" style="cursor: pointer">
            <el-tab-pane label="😀" name="first">
              <Emotion :emoji="emoji" @mouseup.native="outInput" />
            </el-tab-pane>
            <el-tab-pane label="⚽️" name="second">
              <Emotion :emoji="movement" @mouseup.native="outInput" />
            </el-tab-pane>
            <el-tab-pane label="🐶" name="third">
              <Emotion :emoji="animal" @mouseup.native="outInput" />
            </el-tab-pane>
            <el-tab-pane label="🍏" name="fourth">
              <Emotion :emoji="eat" @mouseup.native="outInput" />
            </el-tab-pane>
            <el-tab-pane label="🚗" name="fifth">
              <Emotion :emoji="traffic" @mouseup.native="outInput" />
            </el-tab-pane>
          </el-tabs>
        </el-popover>

        <span @click="submit">发送</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Emotion from "../components/ExpressionBase/Emotion.vue";
export default {
  name: "Message",
  components: { Emotion },
  data() {
    return {
      inputMessage: "",
      activeName: "first",
      count: 10,
      loading: false,
      commonList: [], //留言列表
    };
  },
  computed: {
    ...mapState(["emoji", "movement", "animal", "eat", "traffic", "userInfo"]),
    // 没有更多了
    noMore() {
      return this.count > this.commonList.length;
    },
    // 是否加载
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.getCommon(this.count);
        this.count += 10;
        this.loading = false;
      }, 2000);
    },
    // 点击表情触发
    outInput(e) {
      let emo = e.target.innerText;
      let addr = this.$refs.inputbox.selectionStart;
      this.inputMessage =
        this.inputMessage.substring(0, addr) +
        emo +
        this.inputMessage.substring(addr);
    },
    // 提交留言
    async submit() {
      if (this.inputMessage.trim() == "") return;
      if (!this.userInfo._id) return this.$message.error("请先登录~");
      const { data: res } = await this.$http.post("/user/setmessage", {
        inputMessage: this.inputMessage,
        id: this.userInfo._id,
      });
      if (res.code !== 200) return;
      this.inputMessage = "";
      this.commonList.unshift(res.data);
      this.$message.success(res.value);
    },
    // 获取留言
    async getCommon(val = 0) {
      const { data: res } = await this.$http.post("/user/getcommon", {
        skip: val,
      });
      if (res.code !== 200) return;
      this.commonList.push(...res.data);
    },
  },
  created() {
    this.getCommon();
  },
};
</script>

<style lang="less" scoped>
.message {
  .friend_link_top {
    background-color: #eee;
    padding: 30px;
    border-radius: 10px;
  }
  .wrap {
    width: 100%;
    .title {
      text-align: center;
      background-color: #eee;
      border-radius: 8px;
      padding: 20px;
    }
    .center {
      height: 500px;
      overflow-y: scroll;
      // 定义滚动条高度
      &::-webkit-scrollbar {
        width: 5px;
        height: 0;
      }
      // 定义滑块
      &::-webkit-scrollbar-thumb {
        height: 20px;
        border-radius: 20px;
        background-color: #0b75b7;
      }
      .p_style {
        text-align: center;
        padding: 5px;
      }
      .infinite-list-wrapper {
        height: auto;
        
        .list-item {
          display: flex;
          margin: 10px 0;
          .award {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 10px;
          }
          .soc_content {
            p:nth-child(1) {
              color: #5d4f4f;
              font-size: 12px;
            }
            p:nth-child(2) {
              background-color: #eee;
              border-radius: 10px;
              padding: 10px;
              color: #6c5151;
            }
          }
        }
      }
    }
    .sumbit_area {
      display: flex;
      .el-icon-microphone {
        font-size: 20px;
      }
      i,
      b,
      span {
        width: 30px;
        height: 30px;
        line-height: 28px;
        text-align: center;
      }
      b,
      span {
        cursor: pointer;
      }
      span {
        border-left: 1px solid #eee;
        width: 50px;
      }
      input {
        outline: none;
        border: 2px solid #eee;
        text-indent: 4px;
        flex: auto;
      }
      .el-button {
        padding: 1px 15px !important;
        border: none;
      }
    }
  }
}
</style>