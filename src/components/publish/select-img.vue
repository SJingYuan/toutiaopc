<template>
<el-tabs v-model="activeName">
  <el-tab-pane label="素材库" name="material">
    <div class="selectImg">
      <el-card class="selectImg-item" v-for="item in list" :key="item.id">
        <img @click="clickImg(item.url)" :src="item.url" alt="">
      </el-card>
    </div>
    <!-- 分页 -->
    <el-row type="flex" justify="center" style="height:80px" align="middle">
      <el-pagination
       background
       layout="prev,pager,next"
       :total="page.total"
       :current-page="page.currentPage"
       :page-size="page.pageSize"
       @current-change="changePage"></el-pagination>
    </el-row>
  </el-tab-pane>
  <el-tab-pane label="上传图片" name="uplpad">
    <el-upload class="uploadImg" action="" :http-request="uploadImg">
      <i class="el-icon-plus"></i>
    </el-upload>
  </el-tab-pane>
</el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [],
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    uploadImg (params) {
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      })
        .then(res => {
          this.$emit('selectOneImg', res.data.url)
        })
        .catch(() => {
          this.$message.error('上传失败')
        })
    },
    // 点击图片
    clickImg (url) {
      this.$emit('selectOneImg', url)
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getImg()
    },
    getImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results // 获取全部素材的数据
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getImg()
  }
}
</script>

<style lang="less" scoped>
.selectImg{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .selectImg-item{
    width: 150px;
    height: 150px;
    margin: 20px 0;
    img{
      width: 100%;
    }
  }
}
.uploadImg{
  display: flex;
  justify-content: center;
  i{
    font-size: 20px;
    padding: 50px;
    border: 2px dashed #ccc;
    border-radius: 5px;
  }
}
</style>
