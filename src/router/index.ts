import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import index from '../views/home/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    // meta: {
    //   keepAlive: true // 需要缓存
    // },
    component: index,
  },
  {
    path: '/home/Rankinglist',
    name: 'Rankinglist',
    component: () => import('../views/home/Rankinglist.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/indexView',
    name: 'indexView',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/indexView.vue'),
  },
  // 买卖
  {
    path: '/business',
    name: 'business-index',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/business/index.vue'),
  },
  {
    path: '/business/nftlistseriesdetail',
    name: 'business-nftlistseriesdetail',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/business/nftlistseriesdetail.vue'
      ),
  },
  {
    path: '/business/detail',
    name: 'business-detail',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/business/detail.vue'
      ),
  },
  {
    path: '/business/nftseriesdetail',
    name: 'business-nftseriesdetail',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/business/nftseriesdetail.vue'
      ),
  },
  {
    path: '/business/createpond',
    name: 'business-createpond',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/business/createpond.vue'
      ),
  },
  {
    path: '/business/create_new',
    name: 'create_new_v2',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/business/create_new_v2.vue'),
  },
  // 浏览
  {
    path: '/browse',
    name: 'browse-index',
    component: () => import('@/views/browse/index.vue'),
  },
  {
    path: '/browse/searchdetails',
    name: 'browse-Searchdetails',
    component: () => import('@/views/browse/searchdetails.vue'),
  },
  {
    path: '/browse/nftdetails',
    name: 'browse-nftdetails',
    component: () => import('@/components/nftdetails.vue'),
  },
  {
    path: '/browse/Purchasedetails',
    name: 'browse-Purchasedetails',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/browse/Purchasedetails.vue'
      ),
  },
  // 我的
  {
    path: '/me/info',
    name: 'Me-Info',
    component: () => import('@/views/my/index.vue'),
  },
  {
    path: '/me/updatemydetail',
    name: 'Me-Updatemydetail',
    component: () => import('@/views/my/updatemydetail.vue'),
  },
  {
    path: '/me/updateintroduction',
    name: 'Me-updateintroduction',
    component: () => import('@/views/my/updateintroduction.vue'),
  },
  {
    path: '/me/nftlist',
    name: 'Me-nftlist',
    component: () => import('@/components/mynftlist.vue'),
  },
  {
    path: '/me/myNFT',
    name: 'Me-myNFT',
    component: () => import('@/views/my/myNFT.vue'),
  },
  {
    path: '/me/updatelanguage',
    name: 'Me-updatelanguage',
    component: () => import('@/views/my/updatelanguage.vue'),
  },
  {
    path: '/home/more',
    name: 'Home-more',
    component: () => import('@/views/home/more.vue'),
  },
  //INO
  {
    path: '/ino/Establish',
    name: 'INO-Establish',
    component: () => import('@/views/INO/Establish.vue'),
  },
  {
    path: '/ino/LanchPad',
    name: 'INO-LanchPad',
    component: () => import('@/views/INO/LanchPad.vue'),
  },
  {
    path: '/ino/MintDetails',
    name: 'INO-MintDetails',
    component: () => import('@/views/INO/MintDetails.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
