# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法
包含标题，内容和操作。

:::demo 绑定`v-model`到一个`Boolean`类型的变量。可以使用`active-color`属性与`inactive-color`属性来设置开关的背景色。
  ```vue

 <fl-switch
  v-model="value"
  active-color="#13ce66"
  inactive-color="#ff4949">
 </fl-switch>

<script>
  export default {
    data() {
      return {
        value: true
      }
    }
  };
</script>
  ```
:::

## 文字描述

:::demo 使用`active-text`属性与`inactive-text`属性来设置开关的文字描述。
  ```vue

<fl-switch
  v-model="value1"
  active-text="按月付费"
  inactive-text="按年付费">
</fl-switch>
<fl-switch
  style="display: block"
  v-model="value2"
  active-color="#13ce66"
  inactive-color="#ff4949"
  active-text="按月付费"
  inactive-text="按年付费">
</fl-switch>

<script>
  export default {
    data() {
      return {
        value1: true,
        value2: true
      }
    }
  };
</script>
  ```
:::
