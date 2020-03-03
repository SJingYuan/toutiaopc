<template>
  <div class="second-home">
      <el-carousel :interval="4000" type="card" height="500px">
      <el-carousel-item v-for="item in list" :key="item">
         <img :src="item" alt="" style="width:100%; height:100%" >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'http://img.tukexw.com/img/2ed7b80a87ec4135.jpg',
        'http://pic1.zhimg.com/50/v2-942ae8e242b2291e3af1f9665a4629b3_hd.jpg',
        '../../assets/img/joke.jpg'
      ]
    }
  }
}
</script>

<style>
.second-home{
  height: calc(100vh - 60px);
  background-size: cover;
  background-image: url("../../assets/img/joke.jpg");
}
</style>
