<template>
    <div v-box-loading="isLoading" style="min-height: 300px;">
        <ArticleDetail :article="config.currArticle" />
        <div style="margin-top: 20px;"></div>
        <ArticleCopyright />
        <div style="margin-top: 20px;"></div>
        <div class="comment-tip">—— 评论区{{ allowComment ? '' : '已关闭' }} ——</div>
        <CommentCard v-if="allowComment" :commentList="commentList" @onSendComment="onSendComment" />
    </div>
</template>

<script setup>
import { ref, reactive, toRef, toRefs, onUnmounted } from 'vue';
import ArticleCopyright from '../../../components/ArticleCopyright.vue';
import ArticleDetail from '../../../components/ArticleDetail.vue';
import { useConfigStore } from '../../../store';
import { useRoute, useRouter } from 'vue-router';
import { get as getArticle } from '../../../api/article';
import { getByArticleId, save as saveComment } from '../../../api/comment';
import CommentCard from '../../../components/CommentCard.vue';
import { ElMessage, ElNotification } from 'element-plus';


let isLoading = ref(true)
let allowComment = ref(false)
let commentList = ref([])


let { config } = useConfigStore()

// 加载文章
let id = useRoute().params.id
if (id > 0) {
    getArticle(id).then(response => {
        if (response.code !== 200) {
            ElMessage.error(response.msg)
        } else {
            config.currArticle = response.data
            allowComment.value = config.currArticle.isComment
            isLoading.value = false
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    })
}

// 加载评论
const refreshComment = () => {
    getByArticleId(id).then(response => {
        if (response.code !== 200) {
            ElMessage.error(response.msg)
        } else {
            commentList.value = response.data
        }
    })
}
refreshComment()

const onSendComment = (comment) => {
    comment.articleId = config.currArticle.id
    saveComment(comment).then(response => {
        if (response.code !== 200) {
            ElMessage.error(response.msg)
        } else {
            ElNotification({
                title: 'Success',
                message: '评论成功！',
                type: 'success',
            })
            refreshComment()
        }
    })
}


onUnmounted(() => {
    config.currArticle = {
        id: 0,
        title: '',
        categoryId: 0,
        category: {},
        content: '',
        createBy: 1,
        createTime: '',
        updateTime: '',
        isComment: true,
        isDeleted: false,
        status: false,
        summary: '',
        tags: [],
        thumbnail: '',
        viewCount: 0
    }
})

</script>
<style scoped>
.comment-tip {
    border-radius: 6px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
    background-color: #ffffff;
    overflow: hidden;
    color: #303133;
    padding: 20px;
    font-size: 24px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    text-align: center;
}
</style>
  