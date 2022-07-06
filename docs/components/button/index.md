# Button 按钮

:::demo 使用`type`属性来定义 Button 的样式。
  ```vue
<!-- <div>
  <fl-button type="primary">primary</fl-button>
  <fl-button type="secondary">secondary</fl-button>
  <fl-button type="text">text</fl-button>
</div> -->


  <template>
    <fl-button type="primary">primary</fl-button>
    <fl-button type="secondary">secondary</fl-button>
    <fl-button type="text">text</fl-button>
  </template>
  ```
:::

:::details 使用`disabled`属性来禁用 Button。
<div>
  <fl-button disabled >large</fl-button>
  <fl-button type="primary" disabled>large</fl-button>
  <fl-button size="small" disabled>large</fl-button>
</div>

  ```vue
  <template>
    <fl-button disabled >large</fl-button>
    <fl-button type="primary" disabled>large</fl-button>
    <fl-button size="small" disabled>large</fl-button>
  </template>
  ```
:::

:::details 使用`size`属性来定义 Button 的大小。
<div>
  <fl-button size="large">large</fl-button>
  <fl-button size="medium">medium</fl-button>
  <fl-button size="small">small</fl-button>
</div>

  ```vue
  <template>
    <fl-button size="large">large</fl-button>
    <fl-button size="medium">medium</fl-button>
    <fl-button size="small">small</fl-button>
  </template>
  ```
:::

:::details 使用`block`属性来定义 Button 的样式。
<div>
  <fl-button size="large" block >large</fl-button>
  <fl-button type="primary" block >large</fl-button>
</div>

  ```vue
  <template>
    <fl-button size="large" block >large</fl-button>
    <fl-button type="primary" block >large</fl-button>
  </template>
  ```
:::

## Attributes

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|size|尺寸|`String`|`medium` / `small` / `mini`|-|
|type|类型|`String`|`primary` / `secondary` / `text`|-|
|disabled|是否禁用状态|`boolean`|-|`false`|
|block|是否独占一行|`boolean`|-|`false`|
