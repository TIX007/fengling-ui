# Radio 单选框

## 基础用法
由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

:::demo 要使用 Radio 组件，只需要设置`v-model`绑定变量，选中意味着变量的值为相应 Radio `label`属性的值，`label`可以是`String`、`Number`或`Boolean`。
  ```vue

<template>
  <fl-radio v-model="radio" label="1">备选项</fl-radio>
  <fl-radio v-model="radio" label="2">备选项</fl-radio>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>
  ```
:::

## 禁用状态
单选框不可用的状态。

:::demo 只要在`el-radio`元素中设置`disabled`属性即可，它接受一个`Boolean`，`true`为禁用。
  ```vue

<template>
  <fl-radio disabled v-model="radio" label="禁用">备选项</fl-radio>
  <fl-radio disabled v-model="radio" label="选中且禁用">备选项</fl-radio>
</template>

<script>
  export default {
    data () {
      return {
        radio: '选中且禁用'
      };
    }
  }
</script>
  ```
:::