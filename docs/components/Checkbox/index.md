# Checkbox 多选框

## 基础用法
单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。

:::demo 在`fl-checkbox`元素中定义`v-model`绑定变量，单一的`checkbox`中，默认绑定变量的值会是`Boolean`，选中为`true`。
  ```vue

<template>
  <!-- `checked` 为 true 或 false -->
  <fl-checkbox v-model="checked">备选项</fl-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked: true
      };
    }
  };
</script>
  ```
:::