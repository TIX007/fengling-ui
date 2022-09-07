# Card 卡片

将信息聚合在卡片容器中展示。

## 基础用法
包含标题，内容和操作。

:::demo `Card` 组件包括`header`和`body`部分，`header`部分需要有显式具名 `slot` 分发，同时也是可选的。
  ```vue

  <fl-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
      <fl-button style="float: right; padding: 3px 0" type="text">操作按钮</fl-button>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
  </fl-card>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
  ```
:::
