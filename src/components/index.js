
import LeftAside from './home/left-aside'
import RightHeader from './home/right-header'
export default {
  install: function (Vue) {
    Vue.component('left-aside', LeftAside)
    Vue.component('right-header', RightHeader)
  }
}
