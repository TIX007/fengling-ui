<template>
  <div class="fl-checkbox-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'FlCheckboxGroup',
  provide () {
    return {
      CheckboxGroup: this
    }
  },
  props: {
    value: {
      type: Array
    }
  }
}
</script>