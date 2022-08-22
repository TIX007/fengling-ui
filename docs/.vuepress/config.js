
module.exports = {
    base: '/Vue2-FengLing-UI/',
    // port: 4001,theme-default-content custom content__default default
    plugins: ['demo-container-v2'],
    // 语言设置
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'FengLingUI',
            description: '基于Vue2的UI组件库'
        }
    },
    head:[
            ['link', {rel:'icon', href:'./img/logo.png'} ]
        ],
    themeConfig: {
        lastUpdated: '最后一次更新',
        repo: 'TIX007/fengling-ui',
        editLinks: true,
        docsDir: 'docs',
        editLinkText: '在 GitHub 上编辑此页',
        repoLabel: '查看源码',
        search: true,
        searchMaxSuggestions: 10,
        
        sidebar: {
            '/components/': [
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
                        { title: "Button 按钮", path: '/components/Button/' },
                        { title: "Radio 单选框", path: '/components/Radio/' },
                        { title: "Checkbox 多选框", path: '/components/Checkbox/' },
                        { title: "Input 输入框", path: '/components/Input/' },
                        { title: "持续更新中……", path: '/components/loading/' },
                    ],
                }
            ],
            // '/teacher/' :  [
            //     {
            //         title: '更新',
            //         path: '/teacher/ke1/',
            //         collapsable: true,
            //         children: [
            //             { title: "大前端", link: "/components/button/" }
            //         ],
            //     }
            // ],
            '/': [
                {
                    title: '组件',
                    path: '/components/',
                }
            ],
        },
        nav: [
            { text: "首页", link: "/" },
            { text: "组件", link: "/components/" },
            {
                text: "外链",
                items: [
                    { text: "文档地址", link: "https://github.com/TIX007/Vue2-FengLing-UI" },
                    { text: "Vue3组件库", link: "https://tix007.github.io/vue3-liuying-ui/" }
                ]
            }
        ],
        smoothScroll: true,
    },
};