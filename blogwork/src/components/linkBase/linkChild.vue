<template>
  <div class="link_flex">
          <a :href="item.blogOrigin" v-for="(item,index) in links" :key="index">
            <img class="link_logo" :src="item.blogLogo" alt="" />
            <div class="link_content">
              <p>{{item.blogName}}</p>
              <p>{{item.blogMessage}}</p>
            </div>
          </a>
        </div>
</template>

<script>
export default {
    name:"linkChild",
    data() {
        return {
            
        }
    },
    props:["links"]
}
</script>

<style lang="less" scoped>
.link_flex {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    a {
      padding: 10px 5px;
      width: 48%;
      border: 1px solid #eee;
      margin-bottom: 10px;
      border-radius: 10px;
      display: flex;

      .link_logo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .link_content {
        padding: 0 10px;
        p {
          text-align: left;
        }
      }
    }
  }
</style>