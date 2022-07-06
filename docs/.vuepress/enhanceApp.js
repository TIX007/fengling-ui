import FLButton from '../../packages/Button.vue'
export default  ({ Vue}) => {
        Vue.mixin({
            mounted() {
                    Vue.component(FLButton.name, FLButton);
            }
        })
}