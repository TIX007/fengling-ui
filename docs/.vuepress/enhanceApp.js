import FlButtonGroup from '../../packages/Button-group.vue'
import FLButton from '../../packages/Button.vue'
import FLRadio from '../../packages/Radio.vue'
import FLRadioGroup from '../../packages/Radio-group.vue'
import FLRadioButton from '../../packages/Radio-button.vue'
import FLCheckbox from '../../packages/Checkbox.vue'
import FLCheckboxGroup from '../../packages/Checkbox-group.vue'
import FLInput from '../../packages/Input'
import FLRow from '../../packages/Row'
import FlIcon from '../../packages/icon.vue'
import './styles/index.styl'
import '../../packages/fonts/flement-icons.ttf'
import '../../packages/fonts/flement-icons.woff'
export default  ({ Vue}) => {
        Vue.mixin({
            mounted() {
                    Vue.component(FLButton.name, FLButton);
                    Vue.component(FLRadio.name, FLRadio);
                    Vue.component(FLRadioGroup.name, FLRadioGroup);
                    Vue.component(FLRadioButton.name, FLRadioButton);
                    Vue.component(FLCheckbox.name, FLCheckbox);
                    Vue.component(FLCheckboxGroup.name, FLCheckboxGroup);
                    Vue.component(FLInput.name, FLInput);
                    Vue.component(FLRow.name, FLRow);
                    Vue.component(FlIcon.name, FlIcon);
                    Vue.component(FlButtonGroup.name, FlButtonGroup);
            }
        })
}