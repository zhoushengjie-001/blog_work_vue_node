<template>
  <transition
    name="animate__animated animate__bounce"
    enter-active-class="animate__lightSpeedInRight"
    leave-active-class="animate__lightSpeedOutRight"
  >
    <div class="backControlEnter" v-if="bol">
      <p class="hidden" @click="closePop">×</p>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="40px"
      >
        <el-form-item label="账号" prop="rootName">
          <el-input
            type="text"
            v-model="ruleForm.rootName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="rootPass">
          <el-input
            type="password"
            v-model="ruleForm.rootPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Login",
  props: ["bol"],
  data() {
    let checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        rootName: "",
        rootPass: "",
      },
      rules: {
        rootName: [{ validator: checkAge, trigger: "blur" }],
        rootPass: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    //  提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let {data:res} = await this.$http.post("/root/rootlogin",{
              rootName: this.ruleForm.rootName,
              rootPass: this.ruleForm.rootPass,
          })
          
          if(!res.code) return this.$message.error(res.value);
            // this.$refs[formName].resetFields()
          this.$store.commit("CHNAGEROOT",res.data.rootName)
          this.$store.commit("CHNAGESHOW",false)
          // this.$emit("handlerRootLogin")
          this.$router.push("/admin")
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    async resetForm(formName) {
      this.$refs[formName].resetFields();
      await this.$http.get('/root')
    },
    // 关闭窗口
    closePop() {
      this.$emit("hideClick");
    },
  },
};
</script>

<style lang="less" scoped>
.backControlEnter {
  // background: url(../../assets/bk.png) no-repeat center/cover;
  border-radius: 5px;
  padding: 50px 50px 0 50px;
  position: fixed;
  right: 8%;
  top: 35%;
  width: 450px;
  height: 250px;
  background: #f8f8f8;
  z-index: 100;
  .submit {
    display: flex;
  }
  .hidden {
    user-select: none;
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px 10px 10px 10px;
    font-size: 26px;
    color: #ccc;
    cursor: pointer;
    &:hover {
      color: rgb(168, 160, 160);
    }
  }
}
</style>