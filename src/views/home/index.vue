<template>
  <!-- 容器 -->
  <el-container>
    <!-- 侧边容器 -->
    <el-aside style="width:240px">
      <left-aside></left-aside>
    </el-aside>
    <!-- 右侧容器 -->
    <el-container>
      <!-- 右侧顶部 -->
      <el-header>
       <right-header></right-header>
      </el-header>
      <!-- 右侧内容区域 -->
      <el-main>
        <h1>右侧内容</h1>
        <!-- 二级容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {

}
</script>

<style>
</style>
