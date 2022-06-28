<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="修改密码" name="first">
      <div class="admin_pass">
        <p>密码:</p>
        <el-input
        type="password"
          size="small"
          placeholder="修改密码填写"
          v-model="inputPass"
        ></el-input>
      </div>
      <el-button @click="handlerpass" size="small" type="primary"
        >确认修改</el-button
      >
    </el-tab-pane>
    <el-tab-pane label="友链管理" name="second">
      <AdminLinkBase/>
    </el-tab-pane>
    <el-tab-pane label="发表文章" name="third">
        <PublishArticle/>
    </el-tab-pane>
    <el-tab-pane label="文章管理" name="fourth">
        <ArticleManage/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AdminLinkBase from '../components/AdminBase/AdminLinkBase.vue'
import PublishArticle from '../components/AdminBase/PublishArticle.vue'
import ArticleManage from '../components/AdminBase/ArticleManage.vue'
export default {
  name: "Admin",
  components:{AdminLinkBase,PublishArticle,ArticleManage},
  data() {
    return {
      activeName: "second",
      inputPass: "",
    };
  },
  methods: {
      // 修改密码
      async handlerpass(){
        let {data:res} = await this.$http.post("/root/changepass",{
          inputPass:this.inputPass
        })
        if(res.code!==200)return this.$message.success(res.value)
        this.$message.success(res.value)
        this.inputPass = ''
      },
  },
  beforeRouteLeave(to, from, next) {
      this.$store.commit("CHNAGESHOW",true)
      next()
      
  }
};
</script>

<style lang="less" scoped>
.admin_pass{
    display: flex;
    margin: 10px 0;
    p{
        width: 50px;
    }
}
</style>