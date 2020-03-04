<template>
  <el-row align="middle" type="flex" class="right-header">
    <!-- 左侧 -->
    <el-col class="left" :span="12">
      <i class="el-icon-s-fold"></i>
      <span>传智播客</span>
    </el-col>
    <!-- 右侧 -->
    <el-col class="right" :span="12">
      <el-row type="flex" justify="end" align="middle" v-bind="user">
        <img :src="user.photo" alt />
        <!-- 下拉菜单 -->
        <el-dropdown trigger="click" @command="quit">
          <span>{{user.name}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="one">个人信息</el-dropdown-item>
            <el-dropdown-item command="two">git地址</el-dropdown-item>
            <el-dropdown-item command="three">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  // 个人信息
  data () {
    return {
      user: {}
    }
  },
  methods: {
    quit (command) {
      if (command === 'one') {

      } else if (command === 'two') {
        window.location.href = 'https://github.com/SJingYuan/toutiaopc'
      } else {
        // 退出删除缓存
        localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.$axios({
      url: '/user/profile' // 请求地址
    }).then(res => {
      this.user = res.data
    })
  }
}
</script>

<style lang='less' scoped>
.right-header {
  height: 70px;
  .left {
    i {
      font-size: 22px;
    }
  }
  .right {
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
