# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法
适用广泛的基础单选

:::demo `v-model`的值为当前被选中的`fl-option`的 `value` 属性值
  ```vue

<template>
  <fl-select v-model="value" placeholder="请选择">
    <fl-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </fl-option>
  </fl-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    }
  }
</script>
  ```
:::
