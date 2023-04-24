<template>
    <div>
        <div style="margin-top: 20px;"></div>
        <div class="comment-list" v-if="commentListPage.length > 0">
            <div class="comment-list-card" v-for="(comment, index) in commentListPage" :id="index">
                <div class="comment-list-avatar">
                    <el-avatar :size="40" :src="comment.avatar" />
                </div>
                <div class="comment-list-content" style="margin-left: 10px; width: 100%;">
                    <p>{{ comment.nick }}<span style="margin-left: 10px; color: #999;">{{ comment.email }}</span></p>
                    <p>{{ comment.content }}</p>
                    <p>{{ comment.createTime }} <span @click="reply(comment)">回复</span></p>
                </div>
            </div>
            <div style="display: flex;">
                <el-pagination class="page" layout="prev, pager, next" background :total="50" :page-size="page.size"
                    :page-count="page.count" v-model:current-page="page.current" />
            </div>
        </div>
        <div style="margin-top: 20px;"></div>
        <div class="comment-card">
            <div class="comment-card-info">
                <div class="avatar">
                    <el-avatar :src="formInfo.avatar" />
                </div>
                <el-input v-model="formInfo.nick" @blur="nickToQQ" placeholder="* 昵称 (必填)"
                    style="max-width: 250px; height: 40px;">
                    <template #prepend>昵称</template>
                </el-input>
                <el-input v-model="formInfo.email" placeholder="邮箱 (选填)" style="max-width: 250px; height: 40px;">
                    <template #prepend>邮箱</template>
                </el-input>
                <el-input v-model="formInfo.website" placeholder="网站 (选填)" style="max-width: 250px; height: 40px;">
                    <template #prepend>网站</template>
                </el-input>
            </div>
            <div class="comment-card-content">
                <el-input class="textarea" v-model="formInfo.content" rows="8" resize='none' type="textarea"
                    :placeholder="contentPlaceHolder"
                    input-style="border-radius: 6px; background:#fff url(/images/global/comment.png) right 10px bottom 60px no-repeat; font-size: 16px" />
                <el-button class="submit" type="primary" @click="sendComment">发送评论</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { reactive, watchEffect } from 'vue'
import { getQQInfo } from '@/api/comment';
const emits = defineEmits(['onSendComment'])
const props = defineProps(['commentList'])

let commentListPage = []
let page = reactive({
    size: 5,
    current: 1,
    count: 0,
})

watchEffect(() => {
    if (props.commentList) {
        page.count = Math.ceil(props.commentList.length / page.size)
        let start = (page.current - 1) * page.size
        commentListPage = props.commentList.slice(start, start + page.size)
    }
})


let contentPlaceHolder = '昵称填写 QQ 账号可以自动识别信息哦~'
let formInfo = reactive({
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    nick: '',
    email: '',
    website: '',
    content: ''
})


const reply = (comment) => {
    formInfo.content += '@' + comment.nick + ' '
    document.getElementsByClassName('comment-card')[0].scrollIntoView({ block: "start", behavior: "smooth" });
}

const nickToQQ = () => {
    if (formInfo.nick.length > 5 && formInfo.nick.length <= 10 && formInfo.nick[0] !== '0') {
        // 判断是否纯数字
        if (/^\d+$/.test(formInfo.nick)) {
            getQQInfo(formInfo.nick).then(response => {
                if (response.code !== 200) {
                    ElMessage.error(response.msg)
                } else if (response.data.code === '200') {
                    formInfo.avatar = response.data.data.avatar
                    formInfo.nick = response.data.data.name
                    formInfo.email = response.data.data.qq + '@qq.com'
                }
            })
        }
    }
}
const sendComment = () => {
    if (formInfo.nick === '' || formInfo.content === '') {
        ElMessage.warning('昵称或内容不能为空！')
    } else {
        formInfo.content = formInfo.content.trim()
        emits('onSendComment', formInfo)
        setTimeout(() => {
            formInfo.avatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            formInfo.nick = ''
            formInfo.email = ''
            formInfo.website = ''
            formInfo.content = ''
        }, 300);
    }
}

</script>
<style scoped>
.comment-card {
    border-radius: 6px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
    background-color: #ffffff;
    overflow: hidden;
    transition: 0.3s;
    color: #303133;
    padding: 18px;
}


.comment-card-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}



.comment-list-avatar,
.comment-card-info .avatar {
    width: 40px;
    height: 40px;
    border: 1px solid #dcdfe6;
    border-radius: 50%;
    padding: 2px;
}

.comment-card-content {
    background-color: rgba(255, 0, 0, 0.1);
    margin-top: 15px;
    position: relative;
}

.comment-card-content .submit {
    position: absolute;
    right: 30px;
    bottom: 20px;
}

.comment-list {
    border-radius: 6px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
    background-color: #ffffff;
    overflow: hidden;
    color: #303133;
    padding: 6px 20px;
}

.comment-list-card {
    /* text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25); */
    /* text-align: center; */
    display: flex;
    margin-top: 18px;
    padding-bottom: 12px;
    border-bottom: 1px solid #d4d4d4;
}

.comment-list-content p:nth-child(1) {
    font-size: 16px;
    color: #404044;
}

.comment-list-content p:nth-child(2) {
    display: inline-block;
    font-size: 16px;
    color: #404044;
    padding: 10px;
    background-color: #ebeef5;
    border-radius: 4px;
    margin: 10px 0;
    margin-right: 20px;
    letter-spacing: 1px;
}

.comment-list-content p:nth-child(3) {
    font-size: 14px;
    color: #404044;
}

.comment-list-content p:nth-child(3) span {
    text-decoration: underline;
    margin-left: 5px;
    cursor: pointer;
    transition: color 0.3s;
}

.comment-list-content p:nth-child(3) span:hover {
    color: #00AEEC;
}

.comment-list .page {
    margin: 20px auto;
    margin-top: 30px;
}

:deep().comment-list .el-pagination.is-background .btn-next.is-active,
:deep().comment-list .el-pagination.is-background .btn-prev.is-active,
:deep().comment-list .el-pagination.is-background .el-pager li.is-active {
    background-color: #fdbc40 !important;
}


:deep().comment-card .el-textarea__inner {
    padding: 10px 10px;
}

:deep().comment-card .el-input-group__prepend {
    padding: 0 10px;
    background-color: rgba(144, 147, 153, 0.23);
    color: #404044;
}
</style>