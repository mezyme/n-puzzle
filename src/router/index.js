import Vue from 'vue'
import Router from 'vue-router'
import NPuzzle from '../components/NPuzzle/NPuzzle'
import Demo from '../components/Demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NPuzzle',
      component: NPuzzle
    }, {
      path: '/demo',
      name: 'Demo',
      component: Demo
    }
  ]
})
