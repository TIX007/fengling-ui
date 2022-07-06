# 安装
## npm 安装
推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

``` bash
npm i liuying-ui -S
```

## 引入 LiuYing
你可以引入整个 LiuYing，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 LiuYing。

完整引入
在 main.js 中写入以下内容：

``` js
import Vue from 'vue';
import LiuYingUI from 'LiuYing-ui';
import 'LiuYing-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(LiuYingUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

以上代码便完成了 LiuYing 的引入。需要注意的是，样式文件需要单独引入。