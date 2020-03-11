<template>
  <el-card>
    <bread-crumb slot="header">
    <template slot="title">
      账户信息
    </template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form :model="formData" :rules="rules" ref="myForm" label-width="100px">
      <el-form-item prop="name" label="用户名">
        <el-input v-model="formData.name" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="formData.intro"  style="width:30%"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="formData.email"  style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="手机号" >
        <el-input v-model="formData.mobile"  disabled style="width:30%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </el-form-item>
    </el-form>
    <el-upload action="" :http-request="uploadImg" :show-file-list="false">
    <img class="headers" :src="formData.photo?formData.photo:defaultImg" alt="">
    </el-upload>
  </el-card>
</template>

<script>
import eventButs from '@/utils/eventButs'
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [{ require: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 7, message: '用户名的长度为1~7位' }],
        email: [{ require: true, message: '用户名不能为空', trigger: 'blur' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确', trigger: 'blur' }]
      },
      defaultImg: require('../../assets/img/img123.jpg')
    }
  },
  methods: {
    uploadImg (params) {
      const data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        this.formData.photo = result.data.photo
        eventButs.$emit('updateUser')
      })
    },
    saveUser () {
      this.$refs.myForm.validate().then(() => {
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(() => {
          this.$message.success('保存成功')
          eventButs.$emit('updateUser')
        }).catch(() => {
          this.$message.error('保存失败')
        })
      })
    },
    getUser () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUser()
  }
}
</script>

<style lang="less" scoped>
.headers{
  position: absolute;
  right: 300px;
  top: 150px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
