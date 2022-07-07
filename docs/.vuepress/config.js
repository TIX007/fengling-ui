
module.exports = {
    base: '/Vue2-FengLing-UI/',
    // port: 4001,
    plugins: ['demo-container-v2'],
    // 语言设置
    locales: {
    '/': {
      lang: 'zh-CN',
      title: 'FengLingUI',
      description: '基于Vue2的UI组件库'
    }
  },
    themeConfig : {
      search: true,
      sidebar : {
    '/components/' :  [
        {
            title: '开始',
            collapsable: true,
            children: [
                ''
            ],
        },
        {
            title: '组件',
            collapsable: true,
            children: [
                { title: "Button 按钮", path: '/components/button/' }
            ],
        }
    ],
    '/teacher/' :  [
        {
            title: '更新',
            path: '/teacher/ke1/',
            collapsable: true,
            children: [
                { title: "大前端", link: "/components/button/" }
            ],
        }
    ],
    '/':[
        {
            title: '组件',
            path: '/components/',
        },
        {
            title: '教师证',
            path: '/teacher/',
        },
    ],
},
      nav: [
        { text: "组件", link: "/components/" },
        { text: "更新中", link: "/teacher/" },
        {
            text: "外链",
            items: [
                { text: "项目地址", link: "https://github.com/TIX007/fengling-ui" },
                { text: "Vue3组件库", link: "https://tix007.github.io/vue3-liuying-ui/" }
            ]
        }
      ],
      smoothScroll: true,
    },
  };