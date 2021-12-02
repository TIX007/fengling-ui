<template>
  <div class="fl-form-item">
    <label :style="labelStyle" class="fl-form-item_label">{{label}}</label>
    <div class="fl-form-item_content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FlFormItem',
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  inject: ['Form'],
  computed: {
    labelStyle () {
      return {
        width: this.Form.labelWidth
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .fl-form-item{
    margin-bottom: 25px;
    .fl-form-item_label{
      text-align: right;
      vertical-align: middle;
      float: left;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding: 0 12px 0 0;
      box-sizing: border-box;
    }
    .fl-form-item_content{
      line-height: 40px;
      position: relative;
      font-size: 14px;
      overflow: hidde;
    }
  }
</style>