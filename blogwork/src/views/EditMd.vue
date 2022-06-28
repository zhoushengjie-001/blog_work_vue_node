<template>
  <div class="box">
    <mavonEditor v-model="articleContent" :boxShadow="false" @save="saveMd"/>
    <div class="icon-post" @click="$router.back()">
      <i class="el-icon-back"></i>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "EditMd",
  components: { mavonEditor },
  data() {
    return {
      articleContent: "",
    };
  },
  methods: {
    // 编辑文档
    async saveMd(){
        const {data:res} = await this.$http.post('/root/savemd',{
            id:this.$route.query.id,articleContent:this.articleContent
        })
        this.$message.success(res.value)
    },
    async getMark(val){
        const {data:res} = await this.$http.get(`${val.articleOrigin}`)
        if(!res)return
        this.articleContent = res
    }
  },
  created() {
    this.$store.commit("CHNAGESHOW", false);
    this.getMark(this.$route.query)
  },
  beforeRouteLeave(to, from, next) {
      this.$store.commit("CHNAGESHOW",false)
      next()
    }
};
</script>

<style lang="less" scoped>
.box{
    position: relative;
    max-width: 968px;
    .icon-post{
    position: absolute;
    left: -67px;
    top: -15px;
    width:50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 30px;
    background: #fff;
}
}
</style>