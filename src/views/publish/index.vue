<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单组件  标题宽度设置于 el-form组件-->
    <el-form
      ref="myForm"
      :model="publishForm"
      :rules="publishRules"
      style="margin-left:50px"
      label-width="100px"
    >
      <el-form-item label="标题" prop="title">
        <!-- 输入框 -->
        <el-input v-model="publishForm.title" placeholder="请输入您的标题" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <!-- 多行输入 -->
        <quill-editor v-model="publishForm.content" style="height:200px"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="cover" style="margin-top:100px">
        <!-- 单选框组 -->
        <!-- 封面单选组 绑定的是 封面cover中的type -->
        <el-radio-group  v-model="publishForm.cover.type" @change="changeType">
          <!-- 需要给每个el-radio 加上 label属性 -->
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <cover-img @selectTwoImg="receiveImg" :list="publishForm.cover.images"></cover-img>
      <el-form-item label="频道" prop="channel_id">
        <!-- select选择器 -->
        <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
          <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- 放置两个按钮 -->
        <!-- true和false代表是不是草稿 -->
        <el-button @click="publish(false)" type="primary">发表</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道数据
      // 发布表单数据
      publishForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0,
          images: []
        },
        channel_id: null // 频道id
      },
      // 发布表单的校验规则
      publishRules: {
        title: [
          { required: true, message: '文章标题不能为空', trigger: 'blur' },
          {
            min: 5,
            max: 30,
            message: '标题应该在5-30字符之间',
            trigger: 'blur'
          }
        ],
        content: [
          { required: true, message: '文章内容不能为空', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '频道内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    $route: function (to, from) {
      if (to.params.articleId) {
        this.getArticleById(to.params.articleId)
      } else {
        this.publishForm = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0,
            images: []
          },
          channel_id: null // 频道id
        }
      }
    }
  },
  methods: {
    receiveImg (url, index) {
      this.publishForm.cover.images.splice(index, 1, url)
    },
    // 改变类型事件
    changeType () {
      //  我们应该根据type的值对 images进行控制
      if (this.publishForm.cover.type === 1) {
        // 单图模式
        this.publishForm.cover.images = [''] // 此时还没有选择图片 所以 给一个空字符
      } else if (this.publishForm.cover.type === 3) {
        this.publishForm.cover.images = ['', '', ''] // 此时还没有选择图片 所以 给3个空字符
      } else {
        this.publishForm.cover.images = [] // 无图或者自动时 给一个空数组
      }
    },
    // 获取文章数据
    getArticleById (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then(res => {
        this.publishForm = res.data
      })
    },
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels' // 获取频道数据
      }).then(result => {
        this.channels = result.data.channels // 将频道数据赋值给本地数据
      })
    },
    // 发布
    publish (draft) {
      this.$refs.myForm.validate().then(() => {
        const { articleId } = this.$route.params
        this.$axios({
          url: articleId ? `/articles/${articleId}` : '/articles',
          method: articleId ? 'put' : 'post',
          params: { draft },
          data: this.publishForm
        })
          .then(() => {
            this.$message.success('发布成功!')
            this.$router.push('/home/arctiles')
          })
          .catch(() => {
            this.$message.error('发布失败!')
          })
        // if (articleId) {
        //   this.$axios({
        //     url: `/articles/${articleId}`,
        //     method: 'put',
        //     params: { draft },
        //     data: this.publishForm
        //   }).then(() => {
        //     this.$message.success('发布成功!')
        //     this.$router.push('/home/arctiles')
        //   }).catch(() => {
        //     this.$message.error('发布失败!')
        //   })
        // } else {
        //   this.$axios({
        //     method: 'post',
        //     url: '/articles', // 请求地址
        //     params: { draft }, // query参数
        //     data: this.publishForm // 请求体body参数
        //   }).then(() => {
        //     this.$message.success('发布成功!')
        //     // 如果发布成功
        //     this.$router.push('/home/arctiles') // 跳到文章列表
        //   }).catch(() => {
        //     this.$message.error('发布失败!')
        //   })
        // }
      })
    }
  },
  created () {
    // 调用获取频道数据的方法
    this.getChannels()
    const { articleId } = this.$route.params
    if (articleId) {
      this.getArticleById(articleId)
    }
  }
}
</script>

<style>
</style>
