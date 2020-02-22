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
    key: 'author',
    name: 'author',
    content: 'Lucien Bénié',
  })

  head.meta.push({
    key: 'og:title',
    name: 'og:title',
    content: 'Lucien Bénié',
  })

  head.meta.push({
    key: 'og:url',
    name: 'og:url',
    content: 'https://lbenie.xyz',
  })

  head.meta.push({
    key: 'og:image',
    name: 'og:image',
    content:
      'https://lbenie.xyz/assets/static/avatar.d64be67.11e288e1028f311e40457eae7279989b.png',
  })

  head.meta.push({
    key: 'og:type',
    name: 'og:type',
    content: 'website',
  })

  head.meta.push({
    key: 'keywords',
    name: 'keywords',
    content:
      'Vue,Portfolio,Lucien,Bénié,Gridsome,Vue.js,Lucien Bénié,lbenie,Lucien,Bénié,benie,VueJS,lbenie,React,react,React.js,react.js,Angular,angular,angular.js',
  })

  head.meta.push({
    key: 'description',
    name: 'description',
    content: 'My personal website',
  })

  head.meta.push({
    name: 'google-site-verification',
    content: 'OZmBZ8h0VeLU5_J3TYM3t6yfEqA9_lVuFn2hyq_Q974',
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

  head.htmlAttrs = { lang: 'en_CA' }
}
