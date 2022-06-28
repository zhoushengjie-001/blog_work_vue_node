<template>
  <div class="article_edit">
    <mavonEditor
      v-model="articleContent"
      :boxShadow="false"
      :subfield="false"
      defaultOpen="preview"
      :toolbarsFlag="false"
      :editable="false"
    />
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "ArticleBase",
  components: {
    mavonEditor,
  },
  data() {
    return {
      articleContent: "",
    };
  },
  methods: {
    async getArticle(link) {
      const { data: res } = await this.$http.get(`${link}`);
      this.articleContent = res;
    },
  },
  created() {
    this.getArticle(this.$route.query.link);
  },
};
</script>

<style lang="less" scoped>
.article_edit{
  max-width: 968px;
}
</style>