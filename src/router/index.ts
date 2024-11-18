import { createRouter, createWebHistory } from 'vue-router';
import MedalTable from '../views/MedalTable.vue';
import CountryDetail from '../views/CountryDetail.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MedalTable,
      meta: { 
        title: 'Olympic Medal Table'
      }
    },
    {
      path: '/country/:id',
      name: 'country',
      component: CountryDetail,
      meta: {
        title: 'Country Details'
      },
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string || 'Olympic Medals';
  next();
});

export default router; 