import Vue from 'vue';
import VueRouter from 'vue-router';
import ArticleList from '@/views/ArticleList.vue';
import ArticleForm from '@/views/ArticleForm.vue';
import ArticleDetail from '@/views/ArticleDetail.vue';
import Analytics from '@/views/Analytics.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: ArticleList },
  { path: '/article/create', component: ArticleForm },
  { path: '/article/:id', component: ArticleDetail },
  { path: '/article/:id/edit', component: ArticleForm },
  { path: '/analytic', component: Analytics },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;