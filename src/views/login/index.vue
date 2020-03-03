<template>
  <div class="login">
    <!-- 表单 -->
    <el-card class="login-card">
      <!-- 表单内容 -->
      <!-- 头部logo部分 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单 -->
      <el-form ref="formLogin" :model="formLogin" :rules="loginRules" style="margin-top:20px">
        <!-- 表单容器 、-->
        <el-form-item prop="mobile">
          <!-- 表单域  v-model双向绑定 -->
          <el-input v-model="formLogin.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input v-model="formLogin.code" style="width:60%" placeholder="请输入验证码"></el-input>
          <!-- 放置一个按钮 -->
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <!-- 表单域 -->
        <el-form-item prop="checked">
          <el-checkbox v-model="formLogin.checked">我已阅读同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button @click="login" style="width:100%" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的数据
      formLogin: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否同意用户协议
      },
      // 定义表单的验证规则
      loginRules: {
        // required 如果为true表示该字段必填
        mobile: [
          { required: true, message: '您的手机号不能为空' },
          {
            pattern: /^1[3-9]\d{9}$/, // 正则表达式
            message: '您的手机号格式不正确'
          }
        ],
        code: [
          { required: true, message: '您的验证码不能为空' },
          {
            pattern: /^\d{6}$/, // 要求6个数字
            message: '验证码应该是6位数字'
          }
        ],
        checked: [
          {
            validator: function (rule, value, callback) {
              // rule是当前的校验规则
              value
                ? callback()
                : callback(new Error('您必须同意用户协议'))
            }
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.formLogin.validate().then(() => {
        this.$axios({
          url: '/authorizations',
          data: { ...this.formLogin, checked: null },
          method: 'post'
        })
          .then(res => {
            window.localStorage.setItem('user-token', res.data.data.token)
            this.$router.push('/home')
          })
          .catch(() => {
            // 提示消息
            // 第一种用法
            // this.$message({ message: '用户名或者密码错误', type: 'error' })
            this.$message.error('用户名或者密码错误')
          })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {

  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: "123";
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: url("../../assets/img/login_bg.jpg");
    filter: blur(5px);
    background-size: cover;
  }
  .login-card {
    background: #fff;
    z-index: 2;
    width: 440px;
    height: 340px;
    .title {
      text-align: center;
      img {
        height: 40px;
      }
    }
  }
}
</style>
