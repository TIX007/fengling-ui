/**
 * Generated by "@vuepress/internal-routes"
 */

import { injectComponentOption, ensureAsyncComponentsLoaded } from '@app/util'
import rootMixins from '@internal/root-mixins'
import GlobalLayout from "D:\\3三阶段\\项目实战\\vue项目\\UI库\\模板\\fengling-ui\\node_modules\\@vuepress\\core\\lib\\client\\components\\GlobalLayout.vue"

injectComponentOption(GlobalLayout, 'mixins', rootMixins)
export const routes = [
  {
    name: "v-6c6c724c",
    path: "/components/Input/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-6c6c724c").then(next)
    },
  },
  {
    path: "/components/Input/index.html",
    redirect: "/components/Input/"
  },
  {
    name: "v-e82b9064",
    path: "/components/Button/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-e82b9064").then(next)
    },
  },
  {
    path: "/components/Button/index.html",
    redirect: "/components/Button/"
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
    name: "v-64c477ee",
    path: "/components/Checkbox/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-64c477ee").then(next)
    },
  },
  {
    path: "/components/Checkbox/index.html",
    redirect: "/components/Checkbox/"
  },
  {
    path: '*',
    component: GlobalLayout
  }
]