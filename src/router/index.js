import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import NotesView from '@/views/NotesView.vue';
import CategoriesView from '@/views/CategoriesView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: { name: 'notes' },
  },
  {
    path: '/notes',
    name: 'notes',
    component: NotesView,
    meta: {
      title: 'Notes',
    },
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoriesView,
    meta: {
      title: 'Categories',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta?.title || store.state.appConfig.title;
  next();
});

export default router;
