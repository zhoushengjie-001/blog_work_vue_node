<template>
  <div class="home">
    <div class="home_pg">
      <h3>一个人的目的地永远不是坐标 而是用新的视角看待人间</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  position: relative;
  .home_pg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 105px;
    background: url("../assets/comImg/home_bg.png") no-repeat center / cover;
    h3{
      text-align: center;
      padding-top: 50px;
    }
  }
}
</style>