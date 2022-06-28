<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="140">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.articleDate.slice(0, 10)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.articleName" :disabled="bol"> </el-input>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.articleMessage" :disabled="bol">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{
            bol ? "编辑" : "取消"
          }}</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleSubmit(scope.$index, scope.row)"
            >提交</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="封面" width="180">
        <template slot-scope="scope">
          <el-image :src="scope.row.articleImg" fit="fill"></el-image>
          <el-upload
            class="upload-demo"
            action="/root/editimg"
            :limit="1"
            :data="{ id: scope.row._id, articleImg: scope.row.articleImg }"
            :on-success="
              function (res) {
                handleSuccess(res, scope.$index);
              }
            "
            :show-file-list="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column label="修改文档" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleRouter(scope.row)"
            >修改文档</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="2"
      :total="total"
      @current-change="pageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "ArticleManage",
  data() {
    return {
      tableData: [],
      bol: true,
      total: 0,
    };
  },
  methods: {
    //点击编辑修改标题和描述
    async handleSubmit(index, row) {
      const { data: res } = await this.$http.post("/root/handleredit", {
        id: row._id,
        articleName: row.articleName,
        articleMessage: row.articleMessage,
      });
      if (res.code !== 200) return;
      this.$message.success(res.value);
      this.bol = true;
    },
    handleEdit() {
      this.bol = !this.bol;
    },
    // 删除博客
    async handleDelete(index, row) {
      const { data: res } = await this.$http.post("/root/deleteblog", {
        id: row._id,
      });
      if (res.code !== 200) return;
      this.$message.success(res.value);
      this.tableData.splice(index, 1);
    },
    //   获取博客数据
    async getBlogInfo() {
      const { data: res } = await this.$http.get("/root/getbloginfo");
      if (res.code !== 200) return;
      this.tableData = res.data;
      this.total = res.len;
    },
    // 页数变化获取博客信息
    async getChangeBlog(skip){
        const {data:res} = await this.$http.post('/root/getchangeblog',{
            skip
        })
        if(res.code!==200)return
        this.tableData = res.data
    },
    // 当前页数发生变化时
    pageChange(index){
       let skip = (index-1) * 2
       this.getChangeBlog(skip)
    },
    handleSuccess(res, index) {
      this.$message.success(res.value);
      this.tableData[index].articleImg = res.data;
    },
    // 修改文档
    handleRouter(val) {
      this.$router.push({
        name: "EditMd",
        query: { id: val._id, articleOrigin: val.articleOrigin },
      });
    },
  },
  created() {
    this.getBlogInfo();
  },
};
</script>

<style lang="less" scoped>
.el-table td.el-table__cell div,.el-table td.el-table__cell div {
  text-align: center;
}

.el-pagination {
  text-align: center;
  margin-top: 20px;
}
.el-table th.el-table__cell>.cell{
    text-align: center;
}
</style>