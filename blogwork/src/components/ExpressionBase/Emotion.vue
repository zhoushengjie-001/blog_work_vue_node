<template>
  <div>
      <b v-for="(item,index) in emoji" :key="index" class="font_style">{{item}}</b>
  </div>
</template>

<script>
export default {
    name:"Emotion",
    props:["emoji"],
    data() {
        return {
            
        }
    },
}
</script>

<style lang="less" scoped>
    .font_style{
        user-select: none;
        margin: 2px;
    }
</style>