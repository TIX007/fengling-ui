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

:::demo 只要在`fl-radio`元素中设置`disabled`属性即可，它接受一个`Boolean`，`true`为禁用。
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

## 单选框组
适用于在多个互斥的选项中选择的场景

:::demo 结合`fl-radio-group`元素和子元素`fl-radio`可以实现单选组，在`fl-radio-group`中绑定`v-model`，在`fl-radio`中设置好`label`即可，无需再给每一个`fl-radio`绑定变量，另外，还提供了`change`事件来响应变化，它会传入一个参数`value`。
  ```vue

<template>
  <fl-radio-group v-model="radio">
    <fl-radio :label="3">备选项</fl-radio>
    <fl-radio :label="6">备选项</fl-radio>
    <fl-radio :label="9">备选项</fl-radio>
  </fl-radio-group>
</template>

<script>
  export default {
    data () {
      return {
        radio: 3
      };
    }
  }
</script>
  ```
:::

## 按钮样式
按钮样式的单选组合。

:::demo 只需要把`fl-radio`元素换成`fl-radio-button`元素即可，此外，`FengLing` 还提供了`size`属性。
  ```vue

<template>
  <div>
    <fl-radio-group v-model="radio1">
      <fl-radio-button label="上海"></fl-radio-button>
      <fl-radio-button label="北京"></fl-radio-button>
      <fl-radio-button label="广州"></fl-radio-button>
      <fl-radio-button label="深圳"></fl-radio-button>
    </fl-radio-group>
  </div>
  <div style="margin-top: 20px">
    <fl-radio-group v-model="radio2" size="medium">
      <fl-radio-button label="上海" ></fl-radio-button>
      <fl-radio-button label="北京"></fl-radio-button>
      <fl-radio-button label="广州"></fl-radio-button>
      <fl-radio-button label="深圳"></fl-radio-button>
    </fl-radio-group>
  </div>
  <div style="margin-top: 20px">
    <fl-radio-group v-model="radio3" size="small">
      <fl-radio-button label="上海"></fl-radio-button>
      <fl-radio-button label="北京" disabled ></fl-radio-button>
      <fl-radio-button label="广州"></fl-radio-button>
      <fl-radio-button label="深圳"></fl-radio-button>
    </fl-radio-group>
  </div>
  <div style="margin-top: 20px">
    <fl-radio-group v-model="radio4" disabled size="mini">
      <fl-radio-button label="上海"></fl-radio-button>
      <fl-radio-button label="北京"></fl-radio-button>
      <fl-radio-button label="广州"></fl-radio-button>
      <fl-radio-button label="深圳"></fl-radio-button>
    </fl-radio-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio1: '上海',
        radio2: '上海',
        radio3: '上海',
        radio4: '上海'
      };
    }
  }
</script>
  ```
:::

## 带有边框

:::demo 设置`border`属性可以渲染为带有边框的单选框。
  ```vue

<template>
  <div>
    <fl-radio v-model="radio1" label="1" border>备选项1</fl-radio>
    <fl-radio v-model="radio1" label="2" border>备选项2</fl-radio>
  </div>
  <div style="margin-top: 20px">
    <fl-radio v-model="radio2" label="1" border size="medium">备选项1</fl-radio>
    <fl-radio v-model="radio2" label="2" border size="medium">备选项2</fl-radio>
  </div>
  <div style="margin-top: 20px">
    <fl-radio-group v-model="radio3" size="small">
      <fl-radio label="1" border>备选项1</fl-radio>
      <fl-radio label="2" border disabled>备选项2</fl-radio>
    </fl-radio-group>
  </div>
  <div style="margin-top: 20px">
    <fl-radio-group v-model="radio4" size="mini" disabled>
      <fl-radio label="1" border>备选项1</fl-radio>
      <fl-radio label="2" border>备选项2</fl-radio>
    </fl-radio-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio1: '1',
        radio2: '1',
        radio3: '1',
        radio4: '1'
      };
    }
  }
</script>
  ```
:::