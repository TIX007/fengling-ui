import FLButton from '../../packages/Button.vue'
import FLRow from '../../packages/Row'
import './styles/index.styl'
import '../../packages'
export default  ({ Vue}) => {
        Vue.mixin({
            mounted() {
                    Vue.component(FLButton.name, FLButton);
                    Vue.component(FLRow.name, FLRow);
            }
        })
}