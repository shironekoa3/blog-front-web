import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
    // createWebHistory 路由模式路径不带#号(生产环境下不能直接访问项目，需要 nginx 转发)
    // createWebHashHistory 路由模式路径带#号
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../views/front/Home.vue'),
            children: [
                {
                    path: '/',
                    name: 'HomeMainArticleList',
                    component: () => import('../views/front/contents/HomeMainArticleList.vue')
                },
                {
                    path: '/article/:id',
                    name: 'ArticleDetail',
                    component: () => import('../views/front/contents/HomeMainArticleDetail.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '/manager',
            name: 'mgrmain',
            component: () => import('../views/manager/MgrMain.vue'),
            redirect: '/manager/dashboard',
            children: [{
                path: '/manager/dashboard',
                name: 'dashboard',
                component: () => import('../views/manager/contents/Dashboard.vue'),
            }, {
                path: '/manager/article/edit/:id',
                name: 'ArticleEdit',
                component: () => import('../views/manager/contents/ArticleEdit.vue'),
            }, {
                path: '/manager/article/list',
                name: 'ArticleList',
                component: () => import('../views/manager/contents/ArticleList.vue'),
            }, {
                path: '/manager/tag',
                name: 'TagManage',
                component: () => import('../views/manager/contents/TagManage.vue'),
            }, {
                path: '/manager/category',
                name: 'CategoryManage',
                component: () => import('../views/manager/contents/CategoryManage.vue'),
            }, {
                path: '/manager/comment',
                name: 'CommentManage',
                component: () => import('../views/manager/contents/CommentManage.vue'),
            }, {
                path: '/manager/setting',
                name: 'Setting',
                component: () => import('../views/manager/contents/Setting.vue'),
            }]
        },
    ]
})

// 解决 vue 中路由跳转时，总是从新页面中间开始显示
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0)
})

export default router