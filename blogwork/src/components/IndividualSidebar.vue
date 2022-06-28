<template>
  <div>
    <div class="sideber">
      <div class="touxiang">
        <img class="touxiang_bg" src="@/assets/comImg/touxiang.png" alt="" />
      </div>
      <div class="font_show" @click="changeTransition">
        不求与人相比，但求超越自己
      </div>
      <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__backInLeft"
        leave-active-class="animate__backOutLeft"
      >
        <div v-if="bol" class="box_tran">{{ text_box }}</div>
      </transition>
      <!-- 文章 -->
      <div class="article_text">
        <h3 class="border_left">热门文章</h3>
        <ul>
          <li
            class="article_text_list"
            v-for="(item, index) in article_Arr"
            :key="index"
          >
            <div class="article_bg">
              <img :src="item.imgSrc" alt="" draggable="false" />
            </div>
            <span>{{ item.HotTitle }}</span>
          </li>
        </ul>
      </div>
      <!-- 博客信息 -->
      <div class="blog_message">
        <h3 class="border_left">博客信息</h3>
        <ul>
          <li
            class="blog_type_detail"
            v-for="(item, index) in blogText"
            :key="index"
          >
            <div>
              <i :class="item.iconClass"></i>
              <span>{{ item.titleText }}</span>
            </div>
            <span>{{ item.changeNumber }}</span>
          </li>
        </ul>
      </div>
      <div class="settings" @click="backShow=!backShow">
        <h3><i class="el-icon-s-tools"></i></h3>
      </div>
    </div>
    <Login :bol="backShow" @hideClick="hideClick"/>
  </div>
</template>

<script>
import Login from './BackControl/Login.vue'
export default {
  name: "IndividualSidebar",
  components:{Login},
  data() {
    return {
      backShow:false,
      bol: false,
      textArr: [
        "我可不会碰你,除非忍不住🤪🤪🤪🤪🤪",
        "该睡觉了😪😪😪",
        "早上好,新的一天⏰⏰⏰",
        "下午好,努力吧少年💦💦💦",
        "晚上好,开始学习了嘛📚︎📚︎📚︎",
      ],
      text_box: "我可不会碰你,除非忍不住🤪🤪🤪🤪🤪",
      article_Arr: [
        {
          imgSrc: require("@/assets/comImg/hot1.png"),
          HotTitle: "一个可以绑定多个天翼云网盘的目录列表程序",
        },
        {
          imgSrc: require("@/assets/comImg/hot2.png"),
          HotTitle:
            "cpulimit 是一个限制进程的 CPU 使用率的工具（以百分比表示，而不是 CPU 时间）。当您不希望批处理作业占用太多 CPU 周期时，控制批处理作业很有用",
        },
        {
          imgSrc: require("@/assets/comImg/hot3.png"),
          HotTitle:
            "查找适合自己当前网络环境的优选Cloudflare Anycast IP，具体这玩意儿有啥用？可以",
        },
        {
          imgSrc: require("@/assets/comImg/hot4.png"),
          HotTitle:
            "Deluge是一款免费的 BT 传输软件，相比于其他同类产品，Deluge完美支持各大主流操作系统( Windows 、 Linux 、 Mac OS )，软件体积小巧、绿色安全，",
        },
        {
          imgSrc: require("@/assets/comImg/hot5.png"),
          HotTitle:
            "很多时候，我们监控程序都使用supervisor，但是在一些小场景中，没必要安装额外的软件，并且supervisor对新手不太友好，需要根据他的语法格式进行撰写",
        },
      ],
      blogText: [
        {
          iconClass: "el-icon-notebook-1",
          titleText: "文章",
          changeNumber: "1",
        },
        {
          iconClass: "el-icon-chat-dot-square",
          titleText: "评论数量",
          changeNumber: "2",
        },
        {
          iconClass: "el-icon-loading",
          titleText: "运行天数",
          changeNumber: "3",
        },
        {
          iconClass: "el-icon-edit",
          titleText: "最后活动",
          changeNumber: "4",
        },
      ],
    };
  },
  methods: {
    changeTransition() {
      this.bol = true;
      let date = new Date().toTimeString().split(":")[0];
      switch (true) {
        case date >= 0 && date < 6:
          this.text_box = this.textArr[1];
          break;
        case date >= 6 && date < 10:
          this.text_box = this.textArr[2];
          break;
        case date >= 13 && date < 17:
          this.text_box = this.textArr[3];
          break;
        case date >= 19 && date < 23:
          this.text_box = this.textArr[4];
          break;
        default:
          this.text_box = this.textArr[0];
      }
      setTimeout(() => {
        this.bol = false;
      }, 3000);
    },
    hideClick(){
      this.backShow = false
    }
  },
};
</script>

<style lang="less" scoped>
.sideber {
  width: 200px;
  height: 100vh;
  box-shadow: 0 0 5px 2px #ccc;
  padding: 10px;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  // position: fixed;
  overflow: scroll;
  .touxiang {
    width: 150px;
    height: 150px;
    margin: 0 auto;
    .touxiang_bg {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .font_show {
    font-size: 14px;
    position: relative;
    cursor: pointer;

    &:after {
      position: absolute;
      right: -20px;
      bottom: -2px;
      content: " ";
      width: 0px;
      height: 0px;
      border: 6px solid black;
      border-color: rgba(0, 0, 0, 0.5) transparent transparent transparent;
    }
  }
  .box_tran {
    position: absolute;
  }

  //   热门文章
  .article_text {
    margin-top: 30px;

    .article_text_list {
      height: 60px;
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        // 谷歌
        display: -webkit-box;
        // 行数
        -webkit-line-clamp: 3;
        // 从上到下垂直排列子元素
        -webkit-box-orient: vertical;
      }
      .article_bg {
        margin-right: 10px;
      }
    }
  }
  .blog_message {
    margin-top: 10px;
    .blog_type_detail {
      padding: 8px 8px 0 0;
      display: flex;
      justify-content: space-between;
    }
  }
  .settings {
    cursor: pointer;
    background-color: #eee;
    margin: 20px 0 10px 0;
    border-radius: 5px;
    padding: 3px 0;
    &:hover {
      background-color: #c4c17b;
    }
    h3 {
      text-align: center;
    }
  }
}
img {
  width: 50px;
  height: 50px;
  border-radius: 15px;
}
</style>