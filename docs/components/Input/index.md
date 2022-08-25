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

## 文本域

用于输入多行文本信息，通过将 `type` 属性的值指定为 `textarea`。

:::demo 文本域高度可通过 `rows` 属性控制

```vue
<fl-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="textarea">
</fl-input>

<script>
export default {
  data() {
    return {
      textarea: ''
    }
  }
}
</script>
```

:::

## 可自适应文本高度的文本域

通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。

:::demo 

```vue
<fl-input
  type="textarea"
  autosize
  placeholder="请输入内容"
  v-model="textarea1">
</fl-input>
<div style="margin: 20px 0;"></div>
<fl-input
  type="textarea"
  :autosize="{ minRows: 2, maxRows: 4}"
  placeholder="请输入内容"
  v-model="textarea2">
</fl-input>

<script>
export default {
  data() {
    return {
      textarea1: '',
      textarea2: ''
    }
  }
}
</script>
```

:::

## 复合型输入框

可前置或后置元素，一般为标签或按钮

:::demo 可通过 `slot` 来指定在 `input` 中前置或者后置内容。

```vue
<div>
  <fl-input placeholder="请输入内容" v-model="input1">
    <template slot="prepend">Http://</template>
  </fl-input>
</div>
<div style="margin-top: 15px;">
  <fl-input placeholder="请输入内容" v-model="input2">
    <template slot="append">.com</template>
  </fl-input>
</div>
<div style="margin-top: 15px;">
  <fl-input placeholder="请输入内容" v-model="input3" class="input-with-select">
    <fl-select v-model="select" slot="prepend" placeholder="请选择">
      <fl-option label="餐厅名" value="1"></fl-option>
      <fl-option label="订单号" value="2"></fl-option>
      <fl-option label="用户电话" value="3"></fl-option>
    </fl-select>
    <fl-button slot="append" icon="fl-icon-search"></fl-button>
  </fl-input>
</div>
<style>
  .fl-select .fl-input {
    width: 130px;
  }
  .input-with-select .fl-input-group__prepend {
    background-color: #fff;
  }
</style>
<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      select: ''
    }
  }
}
</script>
```

:::


## 尺寸

:::demo 可通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 `large`、`small` 和 `mini` 三种尺寸。

```vue
<div class="demo-input-size">
  <fl-input
    placeholder="请输入内容"
    suffix-icon="fl-icon-date"
    v-model="input1">
  </fl-input>
  <fl-input
    size="medium"
    placeholder="请输入内容"
    suffix-icon="fl-icon-date"
    v-model="input2">
  </fl-input>
  <fl-input
    size="small"
    placeholder="请输入内容"
    suffix-icon="fl-icon-date"
    v-model="input3">
  </fl-input>
  <fl-input
    size="mini"
    placeholder="请输入内容"
    suffix-icon="fl-icon-date"
    v-model="input4">
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

## 带输入建议

根据输入内容提供对应的输入建议

:::demo `autocomplete` 是一个可带输入建议的输入框组件，`fetch-suggestions` 是一个返回输入建议的方法属性，如 `querySearch(queryString, cb)`，在该方法中你可以在你的输入建议数据准备好时通过 `cb(data)` 返回到 `autocomplete` 组件中。

```vue
<fl-input
  type="textarea"
  autosize
  placeholder="请输入内容"
  v-model="textarea1">
</fl-input>
<div style="margin: 20px 0;"></div>
<fl-input
  type="textarea"
  :autosize="{ minRows: 2, maxRows: 4}"
  placeholder="请输入内容"
  v-model="textarea2">
</fl-input>

<script>
export default {
  data() {
    return {
      textarea1: '',
      textarea2: ''
    }
  }
}
</script>
```

:::