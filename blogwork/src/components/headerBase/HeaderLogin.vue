<template>
  <div class="key_login">
    <i class="el-icon-key" @click="handlerClick"></i>
    <div class="form_login" v-if="formBol">
      <div v-if="!userInfo.userName">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
        >
          <el-form-item label="账号" prop="userName">
            <el-input
              type="text"
              v-model="ruleForm.userName"
              autocomplete="off"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" class="icon_height" prop="userPass">
            <el-input
              type="password"
              v-model="ruleForm.userPass"
              autocomplete="off"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" class="icon_web" prop="userCaptcha">
            <el-input
              v-model="ruleForm.userCaptcha"
              size="mini"
              class="input_width_set"
            ></el-input>
            <div ref="svg" @click="getSvg">
              <img class="logo" src="@/assets/logo_name.png" alt="" />
            </div>
          </el-form-item>
          <el-form-item label-width="30px">
            <el-button
              type="primary"
              class="sumbit_click_logon"
              @click="submitForm('ruleForm')"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <div class="login">
          <p class="login_bg">
            <img :src="userInfo.userIcon" alt="" />
          </p>
          <p>名称：{{ userInfo.userName }}</p>
          <p>上线时间：{{ userDate }}</p>
        </div>
        <div class="edit_message">
          <router-link to="/info"
            ><el-button type="primary" size="mini"
              >修改资料</el-button
            ></router-link
          >
        </div>
        <div>
          <el-button type="primary" size="mini" @click="handlerDestory"
            >退出登录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "HeaderLogin",
  data() {
    let validateName = (rule, value, callback) => {
      // 正则匹配  /中文,字母 数字/  3到14个之间
      let reg = /^[\u4e00-\u9fa5_\w]{3,14}$/;
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else if (!reg.test(value)) {
        callback(new Error("请求输入3-14个字符"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      //  匹配密码  字母 数字 特殊符号6-15字符
      let reg = /^[\w_`~!@#$%^&*()+=-\\\]\]\{\}:;'\,.<>/?]{6,15}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("输入6-15个字符,不能是中文"));
      } else {
        callback();
      }
    };
    let validateCaptcha = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else if (value.toLowerCase() != this.svgBol) {
        callback(new Error("验证错误"));
      } else {
        callback();
      }
    };
    return {
      formBol: false,
      svgBol: "",
      ruleForm: {
        userName: "",
        userPass: "",
        userCaptcha: "",
      },
      rules: {
        userName: [{ validator: validateName, trigger: "blur" }],
        userPass: [{ validator: validatePass, trigger: "blur" }],
        userCaptcha: [{ validator: validateCaptcha, trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    userDate() {
      const date = new Date(parseInt(this.userInfo.userDate));
      const Y = date.getFullYear();
      const M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return `${Y}-${M}-${D}`;
    },
  },
  methods: {
    // 引入vuex里面的Mutations方法
    ...mapMutations({ changeInfo: "CHNAGEUSERINFO" }),
    // 退出登录
    async handlerDestory() {
      const { data: res } = await this.$http.post("/blog/logout");
      if (res.code == 200) {
        this.$message.success(res.title);
        this.changeInfo(res.data);
        this.getSvg();
        setTimeout(() => {
          this.formBol = false;
        }, 2000);
      }
    },
    //  点击登录注册按钮
    handlerClick() {
      this.formBol = !this.formBol;
      this.getSvg();
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let { data: res } = await this.$http.post("/blog/userInfo", {
            ruleForm: this.ruleForm,
          });
          if (res.code == 200) {
            this.changeInfo(res.data);
            this.$refs[formName].resetFields();
            setTimeout(() => {
              this.formBol = false;
            }, 2000);
            return this.$message.success(res.value);
          }
        } else {
          return this.$message.error("登录失败");
        }
      });
    },
    // 获取验证码
    async getSvg() {
      if (!this.formBol) return;
      if (this.userInfo.userName) return;
      let { data: res } = await this.$http.get("/blog/getsvg");
      this.$refs.svg.innerHTML = res.data;
      this.svgBol = res.text.toLowerCase();
    },
  },
};
</script>

<style lang="less" scoped>
// 设置登录注册
.key_login {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  position: relative;
  z-index: 99;
  user-select: none;
  &:hover {
    background: #eee;
  }
  .form_login {
    position: absolute;
    right: 0;
    top: 52px;
    width: 300px;
    height: auto;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0 0 5px 1px #eee;
    .icon_height {
      margin-bottom: 15px;
    }
    .input_width_set {
      width: 60%;
      margin-right: 15px;
      vertical-align: 9px;
    }
    /deep/ .el-form-item__content {
      display: flex;
    }
    /deep/ .icon_web .el-form-item__label {
      line-height: 40px;
    }

    /deep/ .sumbit_click_logon {
      width: 100%;
    }
    .login {
      box-shadow: -10px 10px 7px #eee;
      p {
        text-align: left;
      }
      .login_bg {
        float: left;
        width: 100px;
        height: 100px;
        background: url("../../assets/comImg/headdant.png") no-repeat center /
          cover;
        margin-right: 20px;
        img {
          width: 78px;
          height: 62px;
          border-radius: 50%;
          transform: translate(10px, 25px);
        }
      }
    }
    .edit_message {
      margin-top: 20px;
    }
  }
  /deep/ .el-button {
    width: 100%;
  }
}
.logo {
  width: 100px;
  height: 40px;
}
</style>
