# Input 输入框

::: danger
Input 为受控组件，它总会显示 Vue 绑定值。

通常情况下，应当处理 input 事件，并更新组件的绑定值（或使用v-model）。否则，输入框内显示的值将不会改变。

不支持 v-model 修饰符。
:::

## 基础用法

:::demo 

```vue
<fl-input v-model="input" placeholder="请输入内容"></fl-input>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
```

:::

## 禁用状态

:::demo 通过 `disabled` 属性指定是否禁用 input 组件

```vue
<fl-input
  placeholder="请输入内容"
  v-model="input"
  :disabled="true">
</fl-input>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
```

:::

## 可清空

:::demo 使用`clearable`属性即可得到一个可清空的输入框

```vue
<fl-input
  placeholder="请输入内容"
  v-model="input"
  clearable>
</fl-input>

<script>
  export default {
    data() {
      return {
        input: ''
      }
    }
  }
</script>
```

:::

## 密码框

:::demo 使用`show-password`属性即可得到一个可切换显示隐藏的密码框

```vue
<fl-input placeholder="请输入密码" v-model="input" show-password></fl-input>

<script>
  export default {
    data() {
      return {
        input: ''
      }
    }
  }
</script>
```

:::

## 带 icon 的输入框

带有图标标记输入类型

:::demo 可以通过 `prefix-icon` 和 `suffix-icon` 属性在 `input` 组件首部和尾部增加显示图标，也可以通过 `slot` 来放置图标。

```vue
<div class="demo-input-suffix">
  属性方式：
  <fl-input
    placeholder="请选择日期"
    suffix-icon="fl-icon-date"
    v-model="input1">
  </fl-input>
  <fl-input
    placeholder="请输入内容"
    prefix-icon="fl-icon-search"
    v-model="input2">
  </fl-input>
</div>
<div class="demo-input-suffix">
  slot 方式：
  <fl-input
    placeholder="请选择日期"
    v-model="input3">
    <i slot="suffix" class="fl-input__icon fl-icon-date"></i>
  </fl-input>
  <fl-input
    placeholder="请输入内容"
    v-model="input4">
    <i slot="prefix" class="fl-input__icon fl-icon-search"></i>
  </fl-input>
</div>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    }
  }
}
</script>
```

:::
