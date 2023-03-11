<template>
    <BoxLoading :isLoading="isLoading" />
    <ArticleDetail :article="config.currArticle" />
    <div style="margin-top: 20px;"></div>
    <ArticleCopyright />
    <div style="margin-top: 20px;"></div>
    <CommentCard :commentList="commentList" @onSendComment="onSendComment" />
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
import { ElMessage } from 'element-plus';
import timeFormater from 'time-formater'

let isLoading = ref(true)
let commentList = reactive([])

let { config } = useConfigStore()

// 加载文章
let id = useRoute().params.id
if (id > 0) {
    getArticle(id).then(response => {
        if (response.status !== 200) {
            ElMessage.error('文章获取失败！')
        } else {
            response.data.createTime = timeFormater(response.data.createTime).format('YYYY-MM-DD HH:mm:ss')
            response.data.updateTime = timeFormater(response.data.updateTime).format('YYYY-MM-DD HH:mm:ss')
            config.currArticle = response.data
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
        if (response.status !== 200) {
            ElMessage.error('评论获取失败！')
        } else {
            commentList = response.data
            commentList.forEach(item => {
                item.createTime = timeFormater(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                item.updateTime = timeFormater(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
            })
        }
    })
}
refreshComment()

const onSendComment = (comment) => {
    comment.articleId = config.currArticle.id
    saveComment(comment).then(response => {
        if (response.status !== 200) {
            ElMessage.error('评论失败！')
        } else {
            ElMessage.success('评论成功！')
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
<style scoped></style>
  