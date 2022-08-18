<template>
  <div class="fl-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
<script>
import Emitter from '../src/mixins/emitter';
export default {
  name: 'FlCheckboxGroup',
  componentName: 'FlCheckboxGroup',
  mixins: [Emitter],
  // provide () {
  //   return {
  //     CheckboxGroup: this
  //   }
  // },
  inject: {
    flFormItem: {
      default: ''
    }
  },
  props: {
      value: {},
      disabled: Boolean,
      min: Number,
      max: Number,
      size: String,
      fill: String,
      textColor: String
  },
  computed: {
    _flFormItemSize() {
      return (this.flFormItem || {}).flFormItemSize;
    },
    checkboxGroupSize() {
      return this.size || this._flFormItemSize || (this.$ELEMENT || {}).size;
    }
  },
  mounted() {

  },
  watch: {
    value(value) {
      this.dispatch('FlFormItem', 'fl.form.change', [value]);
    }
  }
}
</script>