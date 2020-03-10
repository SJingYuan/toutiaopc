<template>
  <div class="cover-img">
    <div @click="Opens(index)" class="cover-img-item" v-for="(item,index) in list" :key="index">
      <img :src="item?item:defaulImg" alt />
    </div>
    <!-- 弹层 -->
    <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
      <select-img @selectOneImg="receiveImg"></select-img>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaulImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      selectIndex: -1
    }
  },
  methods: {
    Opens (index) {
      this.dialogVisible = true
      this.selectIndex = index
    },
    receiveImg (url) {
      this.$emit('selectTwoImg', url, this.selectIndex)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scped>
.cover-img {
  display: flex;
  margin: 20px 10px;
  .cover-img-item {
    border: 1px solid #ccc;
    width: 250px;
    height: 250px;
    padding: 20px;
    img {
      width: 100%;
    }
  }
}
</style>
