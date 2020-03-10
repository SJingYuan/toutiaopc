
import LeftAside from './home/left-aside'
import RightHeader from './home/right-header'
import Breadcrumb from './common/bread-crumb'
import VueQuillEditor from 'vue-quill-editor'
import CoverImg from './publish/cover-img'
import SelectImg from './publish/select-img'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install: function (Vue) {
    Vue.component('left-aside', LeftAside)
    Vue.component('right-header', RightHeader)
    Vue.component('bread-crumb', Breadcrumb)
    // 注册 富文本编辑器
    Vue.use(VueQuillEditor)
    Vue.component('cover-img', CoverImg)
    Vue.component('select-img', SelectImg)
  }
}
