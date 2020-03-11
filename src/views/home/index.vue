<template>
  <!-- 容器 -->
  <el-container>
    <!-- 侧边容器 -->
    <el-aside :style="{width:collapse?'64px':'240px'}" style="width:240px; background-color:#2e2f32">
      <left-aside :collapse="collapse"></left-aside>
    </el-aside>
    <!-- 右侧容器 -->
    <el-container>
      <!-- 右侧顶部 -->
      <el-header>
       <right-header></right-header>
      </el-header>
      <!-- 右侧内容区域 -->
      <el-main style="padding:0">
        <!-- 二级容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventButs from '@/utils/eventButs'
export default {
  data () {
    return {
      collapse: false
    }
  },
  created () {
    eventButs.$on('changeCollapse', () => {
      this.collapse = !this.collapse // 取反
    })
  }
}
</script>

<style>
</style>
