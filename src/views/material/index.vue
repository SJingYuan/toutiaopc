<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 上传组件 -->
    <el-row type="flex" justify="end">
      <el-upload action :http-request="uploadImg" :show-file-list="false">
        <el-button type="primary">上传素材</el-button>
      </el-upload>
    </el-row>
    <!-- 素材 -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <div class="imgList">
          <el-card class="imgCrad" v-for="(item,index) in list" :key="item.id">
            <img :src="item.url" alt @click="selectImg(index)" />
            <el-row class="yang" type="flex" justify="space-around" align="middle">
              <i
                class="el-icon-star-on"
                @click="collectOrCancel(item)"
                :style="{color:item.is_collected?'red':'black'}"
              ></i>
              <i @click="deleteImg(item)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="imgList">
          <el-card class="imgCrad" v-for="(item,index) in list" :key="item.id">
            <img :src="item.url" alt @click="selectImg(index)" />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页 -->
    <el-row type="flex" justify="center" style="height:80px" align="middle">
      <el-pagination
        background
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        layout="prev,pager,next"
        @current-change="changeCurrent"
      ></el-pagination>
    </el-row>
    <el-dialog @opened="openEnd" :visible="dialogVisible" @close="dialogVisible=false">
      <el-carousel ref="myCarousel" indicator-position="outside" height="400px">
        <el-carousel-item v-for="item in list" :key="item.id">
          <img style="width:100%; height:100%" :src="item.url" alt />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 8
      },
      dialogVisible: false,
      clickIndex: -1
    }
  },
  methods: {
    openEnd () {
      this.$refs.myCarousel.setActiveItem(this.clickIndex)
    },
    // 点击图片时调用
    selectImg (index) {
      this.clickIndex = index
      this.dialogVisible = true
    },
    async  collectOrCancel (row) {
      try {
        await this.$axios({
          method: 'put',
          url: `/user/images/${row.id}`,
          data: {
            collect: !row.is_collected
          }
        })
        this.getData()
      } catch (error) {
        this.$message.error('收藏失败')
      }
    },
    deleteImg (row) {
      this.$confirm('确定要删除嘛', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${row.id}`
        }).then(() => {
          this.getData()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
    uploadImg (params) {
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      })
        .then(() => {
          this.getData()
        })
        .catch(() => {
          this.$message.error('上传失败')
        })
    },
    changeCurrent (newPage) {
      this.page.currentPage = newPage
      this.getData()
    },
    getData () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        },
        data: {}
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    changeTab () {
      this.page.currentPage = 1
      this.getData()
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang='less' scoped>
.imgList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .imgCrad {
    width: 230px;
    height: 250px;
    margin: 20px 30px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .yang {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      background: #f4f5f6;
      i {
        font-size: 23px;
      }
    }
  }
}
</style>
