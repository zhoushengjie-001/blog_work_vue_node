<template>
  <div>
    <h2 class="border_left">修改资料</h2>
    <el-tabs v-model="activeName" type="card">
      <!-- 修改用户名 -->
      <el-tab-pane label="用户名" name="first">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
        >
          <el-form-item label="原用户名">{{ userInfo.userName }}</el-form-item>
          <el-form-item label="新用户名" prop="userName">
            <el-input
              type="text"
              v-model="ruleForm.userName"
              autocomplete="off"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              @click="handlerClick('ruleForm')"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 修改密码 -->
      <el-tab-pane label="修改密码" name="second">
        <el-form
          :model="ruleFormPass"
          :rules="rulesPass"
          ref="ruleFormPass"
          label-width="100px"
        >
          <el-form-item label="原密码" prop="originPass">
            <el-input
              :type="inputType"
              v-model="ruleFormPass.originPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPass">
            <el-input
              :type="inputType"
              v-model="ruleFormPass.newPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="resultPass">
            <el-input
              :type="inputType"
              v-model="ruleFormPass.resultPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleFormPass')"
              >提交</el-button
            >
            <el-button @click="inputType = 'text'">显示密码</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 更换头像 -->
      <el-tab-pane label="更换头像" name="third">
        <el-upload
          class="avatar-uploader"
          action="/blog/changeimg"
          :data="{'id':userInfo._id}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Information",
  data() {
    // 设置用户名
    let validateuserName = (rule, value, callback) => {
      let reg = /^[\u4e00-\u9fa5_\w]{3,14}$/;
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else if (!reg.test(value)) {
        callback(new Error("请求输入3-14个字符"));
      } else {
        callback();
      }
    };
    // 设置密码
    let validateoriginPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else if (value != this.userInfo.userPass) {
        callback(new Error("原密码错误"));
      } else {
        callback();
      }
    };
    let validatenewPass = (rule, value, callback) => {
      let reg = /^[\w_`~!@#$%^&*()+=-\\\]\]\{\}:;'\,.<>/?]{6,15}$/;
      if (value == "") return callback(new Error("密码不能为空！"));
      if (!reg.test(value))
        return callback(new Error("输入6~15个字符，不能是中文"));
      callback();
    };
    let resultPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value != this.ruleFormPass.newPass) {
        callback(new Error("与之前密码不相符合"));
      } else {
        callback();
      }
    };
    return {
      activeName: "third",
      imageUrl: "",
      inputType: "password",
      ruleForm: {
        userName: "",
      },
      ruleFormPass: {
        originPass: "",
        newPass: "",
        resultPass: "",
      },
      rules: {
        userName: [{ validator: validateuserName, trigger: "blur" }],
      },
      rulesPass: {
        originPass: [{ validator: validateoriginPass, trigger: "blur" }],
        newPass: [{ validator: validatenewPass, trigger: "blur" }],
        resultPass: [{ validator: resultPass, trigger: "blur" }],
      },
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    ...mapMutations({ changeInfo: "CHNAGEUSERINFO" }),
    // 修改用户名
    handlerClick(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        if (this.userInfo.userName == this.ruleForm.userName) return;
        const { data: res } = await this.$http.post("/blog/changeuser", {
          userName: this.ruleForm.userName,
          id: this.userInfo._id,
        });
        if (res.code !== 200) return this.$message.error("修改失败！");
        this.changeInfo(res.data);
        this.$message.success(res.value);
        this.$refs.ruleForm.resetFields();
      });
    },
    // 修改密码
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("/blog/changepass", {
          userPass: this.ruleFormPass.resultPass,
          id: this.userInfo._id,
        });
        if (res.code !== 200) return this.$message.error("修改失败！");
        this.changeInfo(res.data);
        this.$message.success(res.value);
        this.$refs.ruleFormPass.resetFields();
      });
    },
    // 修改头像
    handleAvatarSuccess(res, file) {    // 上传成功之后触发
      this.imageUrl = URL.createObjectURL(file.raw);
      this.changeInfo(res.data)
      this.$message.success("修改成功")
    },
    beforeAvatarUpload(file) {   // 上传之前触发
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>