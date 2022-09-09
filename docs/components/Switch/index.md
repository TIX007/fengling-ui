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
