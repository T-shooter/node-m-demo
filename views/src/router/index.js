import Vue from 'vue'
import Router from 'vue-router'

import App from '../App'
const TasksList = () => import('../pages/tasksList/tasksList.vue')
// const SystemSetting = () => import('../pages/setting/systemSetting.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      component: App,
      children: [
        {
          path: '/',
          meta: {
            title: '任务系统'
          },
          component: TasksList
        },
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
