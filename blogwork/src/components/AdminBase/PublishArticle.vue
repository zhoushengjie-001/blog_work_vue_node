<template>
  <div>
    <el-form ref="ruleForm" label-width="80px">
      <el-form-item label="标题">
        <el-input
          v-model="ruleForm.name"
          size="small"
          placeholder="输入标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          v-model="ruleForm.desc"
          size="small"
          placeholder="描述文章信息"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传文档">
        <el-upload
          class="upload-demo"
          drag
          ref="uploadMd"
          action="/root/articlemd"
          :limit="1"
          :on-change="uploadMdChange"
          :on-success="uploadSuccess"
          :on-remove="uploadRemove"
          :auto-upload="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传md文档</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传封面">
        <el-upload
          class="avatar-uploader"
          action="/root/uploadImg"
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-remove="uploadRemoveImg"
          :limit="1"
          ref="uploadImg"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">点击提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "PublishArticle",
  data() {
    return {
      ruleForm: {
        name: "",
        desc: "",
      },
      imageUrl: "",
      imgName: "",
      mdName: "",
    };
  },
  methods: {
    // 上传文档发生变化时触发
    uploadMdChange(file, fileList) {
      if (file.name.endsWith(".md")) {
        this.$refs.uploadMd.submit();
      }
    },
    // 文档上传成功
    uploadSuccess(response, file, fileList) {
      if (response.code !== 200) {
        this.$message.error(response.value);
      }
      this.mdName = response.data;
      this.$message.success(response.value);
    },
    // 删除已上传的文档
    async uploadRemove() {
      const { data: res } = await this.$http.post("/root/deleteMd", {
        filName: this.mdName,
      });
      if (res.code !== 200) return;
      this.$message.success(res.value);
    },
    // 删除已上传的封面
    async uploadRemoveImg() {
      const { data: res } = await this.$http.post("/root/deleteMd", {
        filName: this.imgName,
      });
      if (res.code !== 200) return;
      this.$message.success(res.value);
    },
    // 封面上传成功时触发
    handleAvatarSuccess(res, file) {
      this.imgName = res.data;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 上传封面前进行判断
    beforeAvatarUpload(file) {
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
    // 提交表单
    async onSubmit() {
      if (
        !this.mdName &&
        !this.imgName &&
        !this.ruleForm.name &&
        !this.ruleForm.desc
      )
        return this.$message.error("请把信息填写完整~");
        const {data:res} = await this.$http.post('/root/storebloginfo',{
          ruleForm:this.ruleForm,
          imgName:this.imgName,
          mdName:this.mdName
        })
        if(res.code!==200)return this.$message.error(res.value)
        this.$message.success(res.value)
        this.clearForm()
    },
    clearForm(){
      this.ruleForm = {}
      this.imgName = ''
      this.mdName = ''
      this.$refs.uploadMd.clearFiles()
      this.$refs.uploadImg.clearFiles()
    }
  },
  beforeDestroy() {
    if(this.mdName){
      this.uploadRemove()
    }
    if(this.imgName){
      this.uploadRemoveImg()
    }
    this.clearForm()
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
.el-upload{
  border: 1px solid #eee;
}
</style>