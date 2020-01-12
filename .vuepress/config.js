const { remove: removeDiacritics } = require('diacritics')

module.exports = context => ({
  title: 'Koishi',
  head: [
    ['link', { rel: 'icon', href: `/koishi.png` }],
    // ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#5546a3' }],
    // ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    // ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    // ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#5546a3' }],
    // ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    // ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  plugins: [
    [require('./markdown/highlight')],
    [require('./markdown/link')],
    ['container', {
      type: 'user-message',
      defaultTitle: '',
      before: '<ChatMessage right>',
      after: '</ChatMessage>'
    }],
    ['container', {
      type: 'bot-message',
      defaultTitle: '',
      before: '<ChatMessage>',
      after: '</ChatMessage>'
    }],
    ['@vuepress/back-to-top'],
    ['@vuepress/medium-zoom'],
    ['@vuepress/register-components', {
      componentDir: 'components',
    }],
  ],
  markdown: {
    slugify (str) {
      const rControl = /[\u0000-\u001f]/g
      const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g
      return removeDiacritics(str)
        .replace(rControl, '')
        .replace(/\(.+/, '')
        .replace(rSpecial, '-')
        .replace(/\-{2,}/g, '-')
        .replace(/^\-+|\-+$/g, '')
        .replace(/^(\d)/, '_$1')
        .toLowerCase()
    },
  },
  themeConfig: {
    logo: '/koishi.png',
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/guide/getting-started.html' },
      { text: 'API', link: '/api/' },
      { text: '官方插件', link: '/plugins/common.html' },
      { text: 'GitHub', link: 'https://github.com/koishijs/koishi' },
    ],
    sidebar: {
      '/api': [{
        title: '核心 API',
        collapsable: false,
        children: [
          '/api/',
          '/api/context',
          '/api/app',
          '/api/receiver',
          '/api/sender',
          '/api/command',
          '/api/database',
        ],
      }, {
        title: '其他官方包',
        collapsable: false,
        children: [
          '/api/utils',
          '/api/test-utils',
        ],
      }],
      '/guide/': [{
        title: '指南',
        collapsable: false,
        children: [
          '/guide/about-koishi',
          '/guide/getting-started',
          '/guide/config-file',
          '/guide/faq',
        ],
      }, {
        title: '深入',
        collapsable: false,
        children: [
          '/guide/receive-and-send',
          '/guide/plugin-and-context',
          '/guide/command-system',
          '/guide/using-database',
          '/guide/authorization',
          '/guide/multiple-bots',
          '/guide/unit-tests',
          '/guide/changelog',
        ],
      }, {
        title: '扩展',
        collapsable: false,
        children: [
          '/guide/extensions/message',
          '/guide/extensions/help',
          '/guide/extensions/request-handler',
          '/guide/extensions/schedule',
        ],
      }],
      '/plugins/': [{
        title: '核心插件',
        collapsable: false,
        children: [
          '/plugins/common',
          '/plugins/teach',
          '/plugins/schedule',
        ],
      }, {
        title: '其他官方插件',
        collapsable: false,
        children: [
          '/plugins/tools',
          '/plugins/monitor',
          '/plugins/webhook',
          '/plugins/image-search',
        ],
      }],
    },
    lastUpdated: '上次更新',
    docsRepo: 'koishijs/koishijs.github.io',
    docsBranch: 'docs',
    editLinks: true,
    editLinkText: '帮助我们改善此页面',
  },

  evergreen: () => !context.isProd,
})
