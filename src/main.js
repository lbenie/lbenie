// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import VueCompositionApi from '@vue/composition-api'
import 'gridsome-plugin-remark-prismjs-all/themes/night-owl.css'
import 'prismjs/plugins/command-line/prism-command-line.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import VueDisqus from 'vue-disqus'
import VueSmoothScroll from 'vue-smooth-scroll'
import DefaultLayout from '~/layouts/Default.vue'
import './css/main.css'
import './styl/main.styl'
import './styl/markdown.styl'

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.use(VueCompositionApi)
  Vue.use(VueSmoothScroll)
  Vue.use(VueDisqus)

  head.meta.push({
    name: 'author',
    content: 'Lucien Bénié',
  })

  head.meta.push({
    name: 'keywords',
    content: 'Vue,Portfolio,Lucien,Bénié,Gridsome,Vue.js,Lucien Bénié,VueJS',
  })

  head.meta.push({
    name: 'description',
    content: 'My personal website written with Gridsome',
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto',
  })

  head.script.push({
    async: true,
    src: '//cdn.embedly.com/widgets/platform.js',
    charset: 'UTF-8',
  })

  head.htmlAttrs = { lang: 'en' }
}
