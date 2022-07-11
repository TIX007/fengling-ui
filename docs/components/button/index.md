# Button 按钮

## 基础用法
基础的按钮用法

:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。
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
    <fl-button type="flow" plain>流光按钮</fl-button>
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
    <fl-button type="danger" icon="fl-icon-delete" circle></fl-button>
    <fl-button type="flow" icon="fl-icon-delete" circle></fl-button>
</fl-row>
  ```
:::

## 自定义颜色属性
改变Button颜色

:::demo 你可以使用`color`属性来改变按钮颜色，除此之外还可以用`enterColor`改变鼠标滑入时颜色，`border`改变边框样式不传默认为按钮背景颜色，`enterTextColor`改变鼠标滑入时字体颜色，当然如果没有`enterTextColor`它会默认`color`属性为滑入颜色。
  ```vue
<fl-row>
  <fl-button color="red" enterColor="#409EFF" >按钮</fl-button>
  <fl-button color="rgb(76, 208, 231)" enterColor="#409EFF" border="#24F165" enterTextColor="#fff" >按钮</fl-button>
  <fl-button color="rgb(76, 208, 231)" enterColor="#409EFF" border="2px solid #24F165" enterTextColor="#fff" >按钮</fl-button>
  <fl-button color="rgba(76, 208, 231, 0.2)" enterColor="#409EFF" enterTextColor="#fff" >按钮</fl-button>
</fl-row>
  ```
:::

## 禁用状态
按钮不可用状态

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

## 文字按钮
没有边框和背景色的按钮

:::demo 使用`size`属性来定义 Button 的大小。


  ```vue
  <template>
    <fl-button type="text">文字按钮</fl-button>
    <fl-button type="text" disabled>文字按钮</fl-button>
  </template>
  ```
:::

## 图标按钮
带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

:::demo 设置`icon`属性即可，icon 的列表可以参考 flement 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标。

  ```vue
  <template>
    <fl-button type="primary" icon="fl-icon-edit"></fl-button>
    <fl-button type="primary" icon="fl-icon-share"></fl-button>
    <fl-button type="primary" icon="fl-icon-delete"></fl-button>
    <fl-button type="primary" icon="fl-icon-search">搜索</fl-button>
    <fl-button type="primary">上传<i class="fl-icon-upload fl-icon--right"></i></fl-button>
  </template>
  ```
:::

## 按钮组
以按钮组的方式出现，常用于多项类似操作。

:::demo 使用`<fl-button-group>`标签来嵌套你的按钮。

  ```vue
  <template>
    <fl-button-group>
        <fl-button type="primary" icon="fl-icon-arrow-left">上一页</fl-button>
        <fl-button type="primary">下一页<i class="fl-icon-arrow-right fl-icon--right"></i></fl-button>
    </fl-button-group>
    <fl-button-group>
        <fl-button type="primary" icon="fl-icon-edit"></fl-button>
        <fl-button type="primary" icon="fl-icon-share"></fl-button>
        <fl-button type="primary" icon="fl-icon-delete"></fl-button>
    </fl-button-group>
  </template>
  ```
:::

## 加载中
点击按钮后进行数据加载操作，在按钮上显示加载状态。

:::demo 要设置为`loading`状态，只要设置`loading`属性为`true`即可。

  ```vue
  <template>
    <fl-button type="primary" :loading="true">加载中</fl-button>
  </template>
  ```
:::

## 不同尺寸
Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。

  ```vue
<fl-row>
  <fl-button>默认按钮</fl-button>
  <fl-button size="medium">中等按钮</fl-button>
  <fl-button size="small">小型按钮</fl-button>
  <fl-button size="mini">超小按钮</fl-button>
</fl-row>
<fl-row>
  <fl-button round>默认按钮</fl-button>
  <fl-button size="medium" round>中等按钮</fl-button>
  <fl-button size="small" round>小型按钮</fl-button>
  <fl-button size="mini" round>超小按钮</fl-button>
</fl-row>
<fl-row>
  <fl-button style="font-size: 14px; padding:10px 60px;" >按钮</fl-button>
</fl-row>
  ```
:::

## Props

<!-- @vuese:FlButton:props:start -->
|名字|描述|类型|可选值|默认值|
|---|---|---|---|---|
|type|类型|`String`|`primary/success/info/warning/danger/flow`|default|
|size|尺寸|`String`|`medium / small / mini`|
|icon|图标类名|`String`|-|-|
|nativeType|原生 type 属性|`String`|`button / submit / reset`|button|
|color|颜色|`String`|-|-|
|textColor|字体颜色|`String`|-|-|
|border|边框|`String`|-|-|
|enterTextColor|鼠标移入字体颜色|`String`|-|-|
|enterColor|鼠标移入按钮颜色|`String`|-|-|
|loading|是否加载中状态|`Boolean`|-|false|
|disabled|是否禁用状态|`Boolean`|-|false|
|plain|是否朴素按钮|`Boolean`|-|false|
|autofocus|是否默认聚焦|`Boolean`|-|false|
|round|是否圆角按钮|`Boolean`|-|false|
|circle|是否圆形按钮|`Boolean`|-|false|

<!-- @vuese:FlButton:props:end -->


## 事件

<!-- @vuese:FlButton:events:start -->
|事件名称|描述|参数|
|---|---|---|
|click|-|-|

<!-- @vuese:FlButton:events:end -->


## Slots

<!-- @vuese:FlButton:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|

<!-- @vuese:FlButton:slots:end -->