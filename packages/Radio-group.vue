<template>
  <div :is="_flTag" class="fl-radio-group" role="radiogroup">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name:"FlRadioGroup",
  provide () {
    return {
      RadioGroup: this
    }
  },
  inject: {
    elFormItem: {
      default: ''
    }
  },
  props: {
    // 组件接收到了value值，我们需要触发这个组件的input事件
    // provide 与 inject  用来做祖孙之间得组件通讯
    value: {},
    size: String,
    fill: String,
    textColor: String,
    disabled: Boolean
  },
  componentName: 'FlRadioGroup',
  computed: {
    _flFormItemSize() {
      return (this.flFormItem || {}).flFormItemSize;
    },
    _flTag() {
      let tag = (this.$vnode.data || {}).tag;
      if (!tag || tag === 'component') tag = 'div';
      return tag;
    },
    radioGroupSize() {
      return this.size || this._flFormItemSize || (this.$ELEMENT || {}).size;
    }
  }
}
</script>

<style scoped>

.fl-radio-group {
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  font-size: 0
}
</style>
