<template>
  <div class="adminLinkBase">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="130">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px; fontsize: 13px">{{
            scope.row.blogDate.slice(0, 10)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="博客名" width="70">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.blogName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="博客地址" width="180">
        <template slot-scope="scope">
          <p class="blogLink">{{ scope.row.blogOrigin }}</p>
        </template>
      </el-table-column>
      <el-table-column label="博客logo" width="180">
        <template slot-scope="scope">
          <p class="blogLink">{{ scope.row.blogLogo }}</p>
        </template>
      </el-table-column>
      <el-table-column label="博客描述" width="180">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.blogMessage }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否推荐" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.blogLinkHot"
            active-color="#13ce66"
            @change="changeState(scope.$index, scope.row)"
          >
          </el-switch>
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
  </div>
</template>

<script>
export default {
  name: "AdminLinkBase",
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    // 删除友链
    async handleDelete(index, row) {
        const {data:res} = await this.$http.post('/user/deletelink',{id:row._id})
        if(!res.code)return this.$message.error(res.value)
        this.$message.success(res.value)
        this.getFriendLink()
    },
    // 获取友链
    async getFriendLink() {
      const { data: res } = await this.$http.get("/user/getlinks");
      if (res.code !== 200) return;
      this.tableData = res.data;
    },
    // 是否推荐
    async changeState(index, row) {
      const { data: res } = await this.$http.post(
        "/user/changeLinkState",
        {
          id: row._id,
          blogLinkHot: row.blogLinkHot,
        }
      );
      this.$message.success(res.value);
    },
  },
  created() {
    this.getFriendLink();
  },
};
</script>

<style lang="less" scoped>
.adminLinkBase {
  .blogLink {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: keep-all;
    color: #409eff;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    background-color: #ecf5ff;
    border-color: #d9ecff;
    font-size: 12px;
  }
}
.el-table th.el-table__cell>.cell{
    text-align: center;
}
</style>