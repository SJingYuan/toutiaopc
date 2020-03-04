
import LeftAside from './home/left-aside'
import RightHeader from './home/right-header'
import Breadcrumb from './common/bread-crumb'
export default {
  install: function (Vue) {
    Vue.component('left-aside', LeftAside)
    Vue.component('right-header', RightHeader)
    Vue.component('bread-crumb', Breadcrumb)
  }
}
