
<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">评论管理</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column width="600px" label="标题" prop="title"></el-table-column>
      <el-table-column :formatter="formatterBool" label="评论状态" prop="comment_status"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="操作" prop>
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button
            @click="openOrclose(obj.row)"
            type="text"
          >{{ obj.row.comment_status ? "关闭" : "打开" }}评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="height:80px" type="flex" align="middle" justify="center">
      <el-pagination
        background
        layout="prev,pager,next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        total: 0, // 总数
        currentPage: 1, // 默认页是第一页
        pageSize: 10 // 每页显示的数据
      },
      list: [],
      loading: false
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getData()
    },
    // 获取数据
    getData () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    },
    formatterBool (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    openOrclose (row) {
      const str = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${str}评论嘛`, '提示！！').then(res => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status
          }
        })
          .then(() => {
            this.$message.success(`${str}评论成功`)
            this.formatterBool()
          })
          .catch(() => {
            this.$message.error(`${str}评论失败`)
          })
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style></style>
