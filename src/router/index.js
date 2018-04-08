import Vue from 'vue'
import Router from 'vue-router'
import NPuzzle from '../components/NPuzzle/NPuzzle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NPuzzle',
      component: NPuzzle
    }
  ]
})
