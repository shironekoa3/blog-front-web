<template>
    <HomeTop />
    <main v-loading="false">
        <div class="main-left">
            <HomeMainLeft />
        </div>
        <div class="main-right">
            <HomeMainRight />
        </div>
    </main>
    <footer>
        <div class="footer-box">2020-2023丨备案号</div>
        <div class="footer-box">本站由 SpringBoot2 + Vue 3 开发</div>
        <div class="footer-box">总访问量：9999 次丨作者：向日葵</div>
    </footer>
</template>

<script>
import { reactive, toRefs, provide } from 'vue';
import HomeMainLeft from './layouts/HomeMainLeft.vue';
import HomeMainRight from './layouts/HomeMainRight.vue';
import HomeTop from './layouts/HomeTop.vue';
export default {
    name: "home",
    components: {
        HomeTop,
        HomeMainLeft,
        HomeMainRight
    },
    setup() {
        const state = reactive({
            config: {
                title: '向日葵的个人博客',
                description: '这里是向日葵的个人博客！',
                author: '向日葵',
                authorStatus: '毕设项目ing...',
                notice: '博客系统开发中...',
                avatar: 'https://javac.me/images/global/gravatar.jpg',
                headerImg: '/images/54.webp',
                isHeaderHidden: false,
                articleCount: 32,
                viewCount: 813,
                tags: [{ id: 1, name: 'Java' }, { id: 2, name: 'C++' }, { id: 3, name: 'C#' }, { id: 4, name: '前端' }, { id: 5, name: '后台' }, { id: 6, name: '测试' }],
                currArticle: {
                    id: 1,
                    title: '测试文章标题',
                    summary: '默认文要默认文章摘要默认文章摘要默认文章摘要默认文章摘要默认文章摘要默认文章摘要默认文章摘要~~',
                    createTime: '2023-01-01',
                    updateTime: '2023-01-02',
                    thumbnail: '/images/54.webp',
                    category: {
                        id: 0,
                        name: '默认分类'
                    },
                    tags: [
                        { id: 0, name: '标签1' },
                        { id: 0, name: '标签2' }
                    ],
                    viewCount: 999,
                    content: 'ABCDDDDD'
                }
            },
        })

        provide('config', state.config)

        return {
            ...toRefs(state)
        }

    }
};
</script>
<style scoped>
main {
    width: 1200px;
    margin: 20px auto 40px;
    display: flex;
    justify-content: space-between;
}

.main-right {
    width: 880px;
    /* background-color: rgba(255, 0, 0, 0.1); */
}

footer {
    width: 100%;
    height: 120px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.footer-box {
    font-size: 14px;
    font-weight: 100;
    letter-spacing: 1px;
    color: #606266;
    margin-bottom: 5px;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
}

.footer-box:nth-child(1) {
    margin-top: 20px;
}
</style>