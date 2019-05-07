import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import KlTable from '@/components/kl-table/src/main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
		  {
		  path: '/klTable',
		  name: 'klTable',	
			component:KlTable
		  // component: () => import('@components/kl-table/src/main.vue')
		}
  ]
})
