<template>
  <div class="about">
    <div class="about_bg"></div>
    <!-- 自述 -->
    <div class="self_detail">
      <h3 class="border_left">自述</h3>
      <p>
        没啥好介绍的,出没各大论坛:知乎-掘金-csdn等...,研究一些稀奇古怪的内容:进行线上线下搬砖
      </p>
    </div>
    <!-- 技能 -->
    <div class="skill">
      <h3 class="border_left">技能</h3>
      <ul>
        <li v-for="(item, index) of skillArr" :key="index">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <!-- 联系 -->
    <div class="phone">
      <h3 class="border_left">联系 : 3177162043</h3>
      <p>有任何需求或招聘联系我,收到消息之后会回复你的</p>
    </div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px">
      <el-form-item label="贵姓" prop="userName">
        <el-input
          type="text"
          v-model.trim="ruleForm.userName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="你的邮箱" prop="email">
        <el-input
          type="text"
          v-model="ruleForm.email"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱主题" prop="theme">
        <el-input type="text" v-model.trim="ruleForm.theme"></el-input>
      </el-form-item>
      <el-form-item label="邮箱留言" prop="emailInfo">
        <el-input type="text" v-model.trim="ruleForm.emailInfo"></el-input>
      </el-form-item>
      <el-form-item class="tc_line">
          <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    let validateUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("贵姓不能为空"));
      }
      callback();
    };
    let validateEmail = (rule, value, callback) => {
      // 邮件正则
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!value) {
        return callback(new Error("邮件不能为空"));
      } else if (!reg.test(value)) {
        return callback(new Error("邮箱地址错误"));
      }
      callback();
    };
    let validateTheme = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("主题不能为空"));
      }
      callback();
    };
    let validateEmailInfo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("留言不能为空"));
      }
      callback();
    };
    return {
      skillArr: [
        {
          name: "JavaScript",
        },
        {
          name: "ES6",
        },
        {
          name: "JQuery",
        },
        {
          name: "Node-Express-Koa",
        },
        {
          name: "Vue2.0-Vue3.0",
        },
        {
          name: "微信小程序",
        },
        {
          name: "Wabpack-Github",
        },
        {
          name: "Element-Bootstrap-Vant",
        },
      ],
      ruleForm: {
        userName: "",
        email: "",
        theme: "",
        emailInfo: "",
      },
      rules: {
        userName: [{ validator: validateUserName, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        theme: [{ validator: validateTheme, trigger: "blur" }],
        emailInfo: [{ validator: validateEmailInfo, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 提交表单
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(async (valid) => {
        if (valid) {
          let { data: res } = await this.$http.post("/blog/setEmail", {
            ruleForm: this.ruleForm,
          });
          if(res.code==200){
            this.$refs[ruleForm].resetFields()
            return this.$message.success("已发送~")
          }
          this.$message.error("发送失败")
        } else {
          this.$message.error("验证不通过！");
        }
      });
    },
    // 重置表单
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
.about {
  background-color: #fff;
  .about_bg {
    width: 100%;
    height: 300px;
    border-radius: 8px;
    background: url("/vueImg/about_bg.jpg") no-repeat center / cover;
  }
  .self_detail {
    margin-top: 20px;
    p {
      padding: 5px 0;
    }
  }
  .skill {
    margin-top: 20px;
    li {
      padding: 5px 0;
    }
  }
  .phone {
    margin-top: 20px;
    p {
      padding: 5px 0;
    }
  }
 
}
</style>
