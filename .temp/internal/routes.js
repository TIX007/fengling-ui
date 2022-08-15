/**
 * Generated by "@vuepress/internal-routes"
 */

import { injectComponentOption, ensureAsyncComponentsLoaded } from '@app/util'
import rootMixins from '@internal/root-mixins'
import GlobalLayout from "D:\\3三阶段\\项目实战\\vue项目\\UI库\\模板\\fengling-ui\\node_modules\\@vuepress\\core\\lib\\client\\components\\GlobalLayout.vue"

injectComponentOption(GlobalLayout, 'mixins', rootMixins)
export const routes = [
  {
    name: "v-ee012d2c",
    path: "/components/Radio/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-ee012d2c").then(next)
    },
  },
  {
    path: "/components/Radio/index.html",
    redirect: "/components/Radio/"
  },
  {
    name: "v-77eae9ce",
    path: "/components/form/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-77eae9ce").then(next)
    },
  },
  {
    path: "/components/form/index.html",
    redirect: "/components/form/"
  },
  {
    name: "v-0661f6d5",
    path: "/components/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-0661f6d5").then(next)
    },
  },
  {
    path: "/components/index.html",
    redirect: "/components/"
  },
  {
    name: "v-06cc56e8",
    path: "/components/loading/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-06cc56e8").then(next)
    },
  },
  {
    path: "/components/loading/index.html",
    redirect: "/components/loading/"
  },
  {
    name: "v-66abb864",
    path: "/components/button/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-66abb864").then(next)
    },
  },
  {
    path: "/components/button/index.html",
    redirect: "/components/button/"
  },
  {
    name: "v-6abbedae",
    path: "/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-6abbedae").then(next)
    },
  },
  {
    path: "/index.html",
    redirect: "/"
  },
  {
    path: '*',
    component: GlobalLayout
  }
]