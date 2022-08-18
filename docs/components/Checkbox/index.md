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

## 禁用状态
多选框不可用状态。

:::demo 设置`disabled`属性即可。
  ```vue

<template>
  <fl-checkbox v-model="checked1" disabled>备选项1</fl-checkbox>
  <fl-checkbox v-model="checked2" disabled>备选项</fl-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked1: false,
        checked2: true
      };
    }
  };
</script>
  ```
:::


## 多选框组
适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

:::demo `checkbox-group`元素能把多个 `checkbox` 管理为一组，只需要在 `Group` 中使用`v-model`绑定`Array`类型的变量即可。 `fl-checkbox` 的 `label`属性是该 `checkbox` 对应的值，若该标签中无内容，则该属性也充当 `checkbox` 按钮后的介绍。`label`与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。
  ```vue

<template>
  <fl-checkbox-group v-model="checkList">
    <fl-checkbox label="复选框 A"></fl-checkbox>
    <fl-checkbox label="复选框 B"></fl-checkbox>
    <fl-checkbox label="复选框 C"></fl-checkbox>
    <fl-checkbox label="禁用" disabled></fl-checkbox>
    <fl-checkbox label="选中且禁用" disabled></fl-checkbox>
  </fl-checkbox-group>
</template>

<script>
  export default {
    data () {
      return {
        checkList: ['选中且禁用','复选框 A']
      };
    }
  };
</script>
  ```
:::


## indeterminate 状态
`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

:::demo 
  ```vue

<template>
  <fl-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</fl-checkbox>
  <div style="margin: 15px 0;"></div>
  <fl-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <fl-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</fl-checkbox>
  </fl-checkbox-group>
</template>
<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data() {
      return {
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true
      };
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    }
  };
</script>
  ```
:::