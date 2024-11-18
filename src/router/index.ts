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
    },
    {
      path: '/country/:id',
      name: 'country',
      component: CountryDetail,
    },
  ],
});

export default router; 