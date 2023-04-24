<template>
    <div v-if="!state.commitResult.commited">
        <div class="menu">
            <el-input class="title" v-model="state.article.title" size="large" placeholder="在此输入标题..." />
            <el-button class="submit" type="primary" size="large" @click='nextStep'>发表</el-button>
        </div>
        <MdEditor v-model="state.article.content" class="md" />
    </div>

    <!-- 编写完毕之后弹出对话框编辑文章信息 -->
    <el-dialog v-model="state.dialogVisible" title="还差一步！" width="500" style="padding: 0 20px;">
        <el-form size="large" label-position="right" label-width="auto" style="max-width: 460px;">
            <el-form-item label="文章分类：">
                <el-input v-model="state.article.category.name" placeholder="填写文章分类（必填）" />
            </el-form-item>
            <el-form-item label="文章标签：">
                <el-input v-model="state.tagText" placeholder="多个标签用逗号隔开" />
            </el-form-item>
            <el-form-item label="封面图片：">
                <el-input v-model="state.article.thumbnail" placeholder="填入图片URL地址" />
            </el-form-item>
            <el-form-item label="文章简介：">
                <el-input v-model="state.article.summary" type="textarea" rows="5" placeholder="留空则自动提取文章前面部分文字" />
            </el-form-item>
            <el-form-item label="评论：" style="text-align: right;">
                <el-switch v-model="state.article.isComment" />
                <el-form-item label="置顶：" style="text-align: right;">
                    <el-switch v-model="state.article.isTop" />
                </el-form-item>
                <el-form-item label="隐藏：" style="text-align: right;">
                    <el-switch v-model="state.article.status" />
                </el-form-item>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button size="large" @click="state.dialogVisible = false">取消</el-button>
                <el-button size="large" type="primary" @click="submitArticle">

                    发表文章</el-button>
            </span>
        </template>
    </el-dialog>

    <div class="result" style="background-color: #fff;" v-if="state.commitResult.commited">
        <el-result :icon="state.commitResult.icon" :title="state.commitResult.title"
            :sub-title="state.commitResult.subTitle">
            <template #extra>
                <el-button type="primary" @click="refreshPage">返回</el-button>
            </template>
        </el-result>
    </div>
</template>
  
<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ElMessage } from 'element-plus'

import { get, change } from '@/api/article'
import { useRoute } from 'vue-router';

let state = reactive({
    dialogVisible: false,
    tagText: '',
    article: {
        id: 0,
        title: '',
        content: '',
        summary: '',
        category: {
            id: 0,
            name: ''
        },
        thumbnail: '',
        tags: [],
        isTop: 0,
        isComment: 1,
        status: 0,
        isComment: true,
        isTop: false,
        status: false
    },
    commitResult: {
        commited: false,
        icon: 'success',
        title: '发布成功',
        subTitle: '已完成文章发布',
    }
})

state.article.id = useRoute().params.id
if (state.article.id > 0) {
    get(state.article.id).then(resp => {
        if (resp.code !== 200) {
            ElMessage.error(resp.msg)
        } else {
            state.article = resp.data
            state.tagText = resp.data.tags.map(i => i.name).join(', ')

            // 删除时间信息，使用后台自动添加的时间
            delete state.article.createTime
            delete state.article.updateTime
        }
    })
}

const nextStep = () => {
    if (state.article.title === '') {
        ElMessage.warning('先填写文章标题吧！')
    } else if (state.article.content === '') {
        ElMessage.warning('写点东西吧！')
    } else {
        // 弹出对话框
        state.dialogVisible = true
    }
}

const submitArticle = async () => {
    if (state.article.category.name === '') {
        ElMessage.warning('请填写文章分类！')
    } else {
        // 判断摘要是否填写
        if (state.article.summary === '') {
            state.article.summary = state.article.content.substring(0, 300)
        }
        // 标签文本转后台数组对象
        state.article.tags = state.tagText.split(',')
            .map(item => { return { id: 0, name: item.trim() } })
            .filter(item => item.name.trim())

        // 发送请求
        change(state.article).then(resp => {
            if (resp.code !== 200) {
                // ElMessage.error(resp.msg)
                state.commitResult.commited = true
                state.commitResult.icon = 'error'
                state.commitResult.title = '发布失败'
                state.commitResult.subTitle = resp.msg
            } else {
                // ElMessage.success('操作成功！')
                // setTimeout(() => {
                //     window.location.reload()
                // }, 500);
                state.commitResult.commited = true
                state.commitResult.icon = 'success'
                state.commitResult.title = '发布成功'
                state.commitResult.subTitle = '文章已发布'
            }
            state.dialogVisible = false
        })
    }
}

const refreshPage = () => {
    window.location.reload()
}
</script>

<style scoped>
.menu {
    width: 50%;
    display: flex;
    margin-bottom: 20px;
}

.submit {
    margin-left: 20px;
}

.md {
    height: calc(100vh - 152px);
}

.attr-item {
    display: flex;
}

.attr-item span {
    width: 80px;
    line-height: 32px;
    text-align: left;
    display: inline-block;
    margin-right: 5px;
}
</style>