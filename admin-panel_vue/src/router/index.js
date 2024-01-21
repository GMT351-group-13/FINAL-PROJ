import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import CafesView from '../views/cafes/ViewCafe.vue'
import CafesAddView from "../views/cafes/AddCafe.vue"
import CafesEditView from "../views/cafes/EditCafe.vue"

import UsersView from '../views/users/ViewUser.vue'
import UsersAddView from "../views/users/AddUser.vue"
import UsersEditView from "../views/users/EditUser.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    
    {
      path: '/cafes',
      name: 'cafes',
      component: CafesView
    },
    {
      path: '/cafes/add',
      name: 'cafesAdd',
      component: CafesAddView
    },
    
    {
      path: '/cafes/:id/edit',
      name: 'cafesEdit',
      component: CafesEditView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/users/add',
      name: 'usersAdd', 
      component: UsersAddView
    },
    
    {
      path: '/users/:id/edit',
      name: 'usersEdit',
      component: UsersEditView
    }
  ]

})

export default router;
