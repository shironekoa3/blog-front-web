<template>
    <ArticleDetail :article="config.currArticle" />
    <div style="margin-top: 20px;"></div>
    <ArticleCopyright />
</template>

<script>
import { reactive, toRefs, onUnmounted } from 'vue';
import ArticleCopyright from '../../../components/ArticleCopyright.vue';
import ArticleDetail from '../../../components/ArticleDetail.vue';
import { useConfigStore } from '../../../store';
import { useRoute, useRouter } from 'vue-router';
import { get } from '../../../api/article';
export default {
    name: "HomeMainArticleDetail",
    components: {
        ArticleDetail,
        ArticleCopyright
    },
    setup() {
        const state = reactive({

        })

        let { config } = useConfigStore()
        let id = useRoute().params.id
        if (id > 0) {
            get(id).then(response => {
                if (response.status !== 200) {
                    ElMessage.error('文章获取失败！')
                } else {
                    config.currArticle = response.data
                    console.log(config.currArticle);
                }
            })
        }

        onUnmounted(() => {
            config.currArticle = { id: 0, title: '' }
        })

        return {
            ...toRefs(state),
            config
        }
    }
};
</script>
<style scoped></style>
  