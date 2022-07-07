# 安装
## npm 安装
推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

``` bash
npm i fengling-ui -S
```

## 引入 FengLing
你可以引入整个 FengLing，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 FengLing。

完整引入
在 main.js 中写入以下内容：

``` js
import Vue from 'vue';
import FengLingUI form 'fengling-ui' 
import 'fengling-ui/lib/fengling.css'
import App from './App.vue';

Vue.use(FengLingUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

以上代码便完成了 FengLing 的引入。需要注意的是，样式文件需要单独引入。