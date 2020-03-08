<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <el-form style="padding-left:50px">
      <el-form-item label="文章状态：">
        <!-- 单选组 -->
        <!-- <el-radio-group v-model="searchForm.status" @change="changeCondition"> -->
        <el-radio-group v-model="searchForm.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 下拉框 -->
      <el-form-item label="频道类别：">
        <!-- <el-select @change="changeCondition" placeholder="请选择频道" v-model="searchForm.channel_id"> -->
        <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 时间 -->
      <el-form-item label="日期范围：">
        <el-date-picker value-format="yyyy-MM-dd" v-model="searchForm.value1" type="daterange"></el-date-picker>
        <!-- <el-date-picker @change="changeCondition" value-format="yyyy-MM-dd" v-model="searchForm.value1" type="daterange"></el-date-picker> -->
      </el-form-item>
    </el-form>
    <!-- 主体 -->
    <el-row type="flex" align="middle" class="total">
      <span>一共找到100条符合条件的内容</span>
    </el-row>
    <!-- 列表 -->
    <div class="article-item" v-for="item in list" :key="item.id.toString()">
      <!-- 左 -->
      <div class="item-left">
        <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt />
        <div class="info">
          <span>{{item.title}}</span>
          <!-- <span >草稿</span> -->
          <el-tag :type="item.status | filterType" class="tag">{{item.status | filterStatus}}</el-tag>
          <span class="date">{{item.pudate}}</span>
        </div>
      </div>
      <!-- 右 -->
      <div class="item-right">
        <!-- 事件绑定 -->
        <!-- <span @click="toPublish"> -->
        <!-- 事件跟逻辑 -->
        <span @click="$router.push(`/home/publish/${item.id.toString()}`)">
          <i class="el-icon-edit"></i> 修改
        </span>
        <span @click="delSucai(item.id.toString())">
          <i class="el-icon-delete"></i> 删除
        </span>
      </div>
    </div>
    <!-- 分页 -->
    <el-row type="flex" justify="center" style="height:80px" align="middle">
      <el-pagination
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        @current-change="changePage"
        background
        layout="prev,pager,next"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      searchForm: {
        status: 5, // 默认值（全部）
        channel_id: null,
        value1: []
      },
      channels: [],
      list: [],
      defaultImg: require('../../assets/img/kb.jpeg')
    }
  },
  // 第二种监听
  watch: {
    searchForm: {
      deep: true,
      handler () {
        this.page.currentPage = 1
        this.changeCondition()
      }
    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    }
  },
  methods: {
    // 修改
    toPublish () {
      this.$router.push('/home/publish')
    },
    // 删除
    delSucai (id) {
      this.$confirm('您是否删除该数据嘛', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id}`
        })
          .then(() => {
            this.changeCondition()
          })
          .catch(() => {
            this.$message.error('删除失败')
          })
      })
    },
    // 分页
    changePage (newPage) {
      this.page.currentPage = newPage
      this.changeCondition()
    },
    // 筛选
    changeCondition () {
      const params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate:
          this.searchForm.value1 && this.searchForm.value1.length
            ? this.searchForm.value1[0]
            : null,
        end_pubdate:
          this.searchForm.value1 && this.searchForm.value1.length
            ? this.searchForm.value1[1]
            : null
      }
      this.getArticles(params)
    },
    // 获取类别
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 获取文章列表
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params // 请求地址
      }).then(result => {
        this.list = result.data.results // 获取文章列表
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script>

 <style lang="less" scoped>
.total {
  height: 60px;
  border-bottom: 1px dashed #ccc;
}
.article-item {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
  .item-left {
    display: flex;
    justify-content: space-between;
    img {
      width: 180px;
      height: 120px;
      border-radius: 5px;
    }
    .info {
      display: flex;
      flex-direction: column;
      height: 120px;
      justify-content: space-around;
      margin-left: 20px;
      .date {
        color: #999;
        font-size: 13px;
      }
      .tag {
        width: 60px;
        text-align: center;
      }
    }
  }
  .item-right {
    span {
      font-size: 13px;
      margin-right: 7px;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>>
