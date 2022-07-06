# Button 按钮

:::demo 使用`type`属性来定义 Button 的样式。
  ```vue

<fl-row>
    <fl-button>默认按钮</fl-button>
    <fl-button type="primary">主要按钮</fl-button>
    <fl-button type="success">成功按钮</fl-button>
    <fl-button type="info">信息按钮</fl-button>
    <fl-button type="warning">警告按钮</fl-button>
    <fl-button type="danger">危险按钮</fl-button>
    <fl-button type="flow">流光按钮</fl-button>
</fl-row>

<fl-row>
    <fl-button plain>朴素按钮</fl-button>
    <fl-button type="primary" plain>主要按钮</fl-button>
    <fl-button type="success" plain>成功按钮</fl-button>
    <fl-button type="info" plain>信息按钮</fl-button>
    <fl-button type="warning" plain>警告按钮</fl-button>
    <fl-button type="danger" plain>危险按钮</fl-button>
</fl-row>

<fl-row>
    <fl-button round>圆角按钮</fl-button>
    <fl-button type="primary" round>主要按钮</fl-button>
    <fl-button type="success" round>成功按钮</fl-button>
    <fl-button type="info" round>信息按钮</fl-button>
    <fl-button type="warning" round>警告按钮</fl-button>
    <fl-button type="danger" round>危险按钮</fl-button>
</fl-row>

<fl-row>
    <fl-button icon="fl-icon-search" circle></fl-button>
    <fl-button type="primary" icon="fl-icon-edit" circle></fl-button>
    <fl-button type="success" icon="fl-icon-check" circle></fl-button>
    <fl-button type="info" icon="fl-icon-message" circle></fl-button>
    <fl-button type="warning" icon="fl-icon-star-off" circle></fl-button>
    <fl-button type="danger" icon="fl-icon-dflete" circle></fl-button>
</fl-row>
  ```
:::

:::demo 你可以使用`disabled`属性来定义按钮是否可用，它接受一个Boolean值。
  ```vue
<fl-row>
  <fl-button disabled>默认按钮</fl-button>
  <fl-button type="primary" disabled>主要按钮</fl-button>
  <fl-button type="success" disabled>成功按钮</fl-button>
  <fl-button type="info" disabled>信息按钮</fl-button>
  <fl-button type="warning" disabled>警告按钮</fl-button>
  <fl-button type="danger" disabled>危险按钮</fl-button>
</fl-row>

<fl-row>
  <fl-button plain disabled>朴素按钮</fl-button>
  <fl-button type="primary" plain disabled>主要按钮</fl-button>
  <fl-button type="success" plain disabled>成功按钮</fl-button>
  <fl-button type="info" plain disabled>信息按钮</fl-button>
  <fl-button type="warning" plain disabled>警告按钮</fl-button>
  <fl-button type="danger" plain disabled>危险按钮</fl-button>
</fl-row>
  ```
:::

:::demo 使用`disabled`属性来禁用 Button。

  ```vue
<template>
  <fl-button disabled>默认按钮</fl-button>
  <fl-button type="primary" disabled>主要按钮</fl-button>
  <fl-button type="success" disabled>成功按钮</fl-button>
  <fl-button type="info" disabled>信息按钮</fl-button>
  <fl-button type="warning" disabled>警告按钮</fl-button>
  <fl-button type="danger" disabled>危险按钮</fl-button>
</template>
  ```
:::

:::demo 使用`size`属性来定义 Button 的大小。


  ```vue
  <template>
    <fl-button type="text">文字按钮</fl-button>
    <fl-button type="text" disabled>文字按钮</fl-button>
  </template>
  ```
:::

:::demo 使用`block`属性来定义 Button 的样式。

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
