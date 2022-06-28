<template>
  <div class="article">
    <h3 class="message_leave"><i class="el-icon-collection"></i>文章</h3>
    <el-divider content-position="left">我的文章</el-divider>
    <div class="article_content" v-for="item in blogArr" :key="item._id">
      <img class="article_content_img" :src="item.articleImg" alt="" />
      <div class="article_content_detail">
        <div class="article_detail_more">
          <p>{{item.articleName}}</p>
          <p>{{item.articleMessage}}</p>
        </div>
        <p class="article_time">发表时间：{{item.articleDate.slice(0,10)}}</p>
      </div>
      <el-button type="text" class="button" @click="handlerArticle(item.articleOrigin)">查看全文</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      blogArr:[],//存取博客信息
    };
  },
  methods: {
    // 查看全文
    handlerArticle(link){
      this.$router.push({name:'ArticleBase',query:{link}})
    },
    // 获取博客信息
    async getAllBlog(){
      const {data:res} = await this.$http.get('/user/getallblog')
      if(res.code!==200)return
      this.blogArr = res.data
    }
  },
  created() {
    this.getAllBlog()
  },
};
</script>

<style lang="less" scoped>
.article {
  width: 100%;
  .message_leave {
    height: 100px;
    line-height: 100px;
    background: rgba(78, 78, 78, 0.3);
    border-radius: 12px;
    padding-left: 10px;
    font-size: 25px;
    text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
    font-weight: 400;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .article_content {
    box-shadow: 0 2px 2px #eee;
    margin: 10px 0 10px 0;
    padding: 10px 5px 10px 0;
    width: 100%;
    display: flex;
    .article_content_img {
      width: 60px;
      height: 60px;
      border-radius: 10px;
    }
    .article_content_detail {
      flex: auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .article_detail_more{
        p:nth-child(1){
          color: red;
          font-weight: bolder;
        }
        p{
          font-size: 14px;
          padding: 5px 0;
          text-align: left;
        }
      }
      .article_time{
        line-height: 60px;
        font-size: 14px;
      }
    }
    .button {
      text-align: center;
    }
  }
}
</style>