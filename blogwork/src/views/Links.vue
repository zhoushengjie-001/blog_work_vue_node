<template>
  <div class="link_wrap">
    <h2 class="friend_link_top"><i class="el-icon-link">友情链接</i></h2>
    <el-tabs v-model="activeName">
      <el-tab-pane label="申请友链" name="first">
        <p style="text-align: center; margin-bottom: 20px">
          友链申请-请符合规范😊
        </p>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="博客名称" prop="blogName">
            <el-input
              type="text"
              v-model="ruleForm.blogName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="博客地址" prop="blogOrigin">
            <el-input
              type="text"
              v-model="ruleForm.blogOrigin"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="logo地址" prop="blogLogo">
            <el-input
              type="text"
              v-model="ruleForm.blogLogo"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="博客描述" prop="blogMessage">
            <el-input
              type="text"
              v-model="ruleForm.blogMessage"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="友链展示" name="second">
        <Link :links="links"/>
      </el-tab-pane>
      <el-tab-pane label="推荐友链" name="third">
        <Link :links="hotLinks"/>
      </el-tab-pane>
      <el-tab-pane label="个人友链" name="fourth">
        <p style="text-align:center">
          <el-button type="primary" @click="activeName = 'first'">点击进入</el-button>
        </p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Link from '../components/linkBase/linkChild.vue'
export default {
  name: "Links",
  components:{Link},
  data() {
    let blogNameRule = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空！"));
      } else {
        callback();
      }
    };
    let blogOriginRule = (rule, value, callback) => {
      if (value.trim() == "") {
        return callback(new Error("不能为空！"));
      } else if (!value.startsWith("http")) {
        return callback(new Error("格式输入不正确！"));
      } else {
        callback();
      }
    };
    return {
      activeName: "first",
      links: [],
      hotLinks: [],
      ruleForm: {
        blogName: "",
        blogOrigin: "",
        blogLogo: "",
        blogMessage: "",
      },
      rules: {
        blogName: [{ validator: blogNameRule, trigger: "blur" }],
        blogOrigin: [{ validator: blogOriginRule, trigger: "blur" }],
        blogLogo: [{ validator: blogOriginRule, trigger: "blur" }],
        blogMessage: [{ validator: blogNameRule, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 提交表单
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(async (valid) => {
        if (!valid) return;
        if (!this.$store.state.userInfo._id)
          return this.$message.error("请登录");
        const { data: res } = await this.$http.post("/user/userLink", {
          ruleForm: this.ruleForm,
        });
        this.$message.success(res.value);
        this.links.unshift(res.data);
      });
    },
    // 重置表单
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
    // 获取link数据
    async getLinks() {
      const { data: res } = await this.$http.get("/user/getlinks");
      if(res.code!==200) return
      this.links = res.data;
      this.hotLinks = res.data.filter((item) => item.blogLinkHot);
      this.$refs.ruleForm.resetFields()
    },
  },
  created() {
    this.getLinks()
  },
};
</script>

<style lang="less" scoped>
.link_wrap {
  .friend_link_top {
    background-color: #eee;
    padding: 30px;
    border-radius: 10px;
  }
  
}
</style>