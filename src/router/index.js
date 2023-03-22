import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
    // createWebHistory 路由模式路径不带#号(生产环境下不能直接访问项目，需要 nginx 转发)
    // createWebHashHistory 路由模式路径带#号

    history: createWebHistory(),
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
                meta: {
                    requireAuth: true // 配置需要登录才能访问
                }
            }, {
                path: '/manager/article/edit/:id',
                name: 'ArticleEdit',
                component: () => import('../views/manager/contents/ArticleEdit.vue'),
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/manager/article/list',
                name: 'ArticleList',
                component: () => import('../views/manager/contents/ArticleList.vue'),
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/manager/tag',
                name: 'TagManage',
                component: () => import('../views/manager/contents/TagManage.vue'),
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/manager/category',
                name: 'CategoryManage',
                component: () => import('../views/manager/contents/CategoryManage.vue'),
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/manager/comment',
                name: 'CommentManage',
                component: () => import('../views/manager/contents/CommentManage.vue'),
                meta: {
                    requireAuth: true
                }
            }, {
                path: '/manager/setting',
                name: 'Setting',
                component: () => import('../views/manager/contents/Setting.vue'),
                meta: {
                    requireAuth: true
                }
            }]
        },
    ]
})


router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token') // 判断用户是否已经登录
    if (to.meta.requireAuth && !isAuthenticated) { // 判断该路由是否需要登录才能访问
        next({
            path: '/login',
            query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    } else {
        next()
    }
})

// 解决 vue 中路由跳转时，总是从新页面中间开始显示
// router.afterEach((to, from, next) => {
//     window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//     })
// })

export default router