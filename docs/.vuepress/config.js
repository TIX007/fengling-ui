
module.exports = {
    title: '多聊天长知识',
    description: 'collected by gmchen',
    // base: '/',
    // port: 4001,
    plugins: ['demo-container-v2'],
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
                { title: "大前端", path: '/components/button/' }
            ],
        }
    ],
    '/teacher/' :  [
        {
            title: '综合素质',
            path: '/teacher/ke1/',
            collapsable: true,
            children: [
                { title: "大前端", link: "/components/button/" },
                { title: "大前端", link: "/components/from/" }
            ],
        }
    ],
    '/':[
        {
            title: '组件啊',
            path: '/components/',
        },
        {
            title: '教师证',
            path: '/teacher/',
        },
    ],
},
      nav: [
        { text: "大前端", link: "/components/" },
        { text: "教师证", link: "/teacher/" },
        {
            text: "外链",
            items: [
                { text: "网道", link: "https://wangdoc.com/" },
                { text: "VUE", link: "https://cn.vuejs.org/v2/guide/" }
            ]
        }
      ],
      smoothScroll: true,
    },
  };