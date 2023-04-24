<template>
    <el-tabs v-model="state.activeName" type="border-card">
        <el-tab-pane name="User" label="博客配置">
            <el-form size="large" label-position="right" label-width="90" style="max-width: 600px;">
                <el-form-item label="博客标题：">
                    <el-input v-model="config.title" placeholder="请输入博客标题" />
                </el-form-item>
                <el-form-item label="博客描述：">
                    <el-input v-model="config.description" type="textarea" placeholder="请输入博客描述" rows="5" />
                </el-form-item>
                <el-form-item label="顶部图片：">
                    <el-input v-model="config.headerImg" placeholder="请输入图片链接" style="margin-bottom: 10px;" />
                    <el-image :src="config.headerImg" style="width: 100%; height: 300px;" />
                </el-form-item>
                <el-form-item label="隐藏顶部：">
                    <el-switch v-model="config.isHeaderHidden" />
                </el-form-item>
                <el-form-item label="" style="margin: 20px 0;">
                    <el-button type="primary" @click="saveOption">保存</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane name="Role" label="作者配置">
            <el-form size="large" label-position="right" label-width="90" style="max-width: 600px;">
                <el-form-item label="作者名称：">
                    <el-input v-model="config.author" placeholder="请输入作者名称" />
                </el-form-item>
                <el-form-item label="作者状态：">
                    <el-input v-model="config.authorStatus" type="textarea" placeholder="请输入作者状态" rows="5" />
                </el-form-item>
                <el-form-item label="头像链接：">
                    <div style="width: 100%; display: flex; justify-content: space-between">
                        <el-input v-model="config.avatar" placeholder="请输入头像链接" style="max-width: 400px;" />
                        <el-avatar class="nav-img" :src="config.avatar" />
                        <div></div>
                    </div>
                </el-form-item>
                <el-form-item label="博客通知：">
                    <el-input v-model="config.notice" placeholder="请输入博客标题" />
                </el-form-item>
                <el-form-item label="" style="margin: 20px 0;">
                    <el-button type="primary" @click="saveOption">保存</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane name="Config" label="导航配置">
            <el-form size="large" label-position="right" label-width="90" style="max-width: 600px;">
                <el-form-item label="导航信息：">
                    <el-input v-model="state.navYaml" type="textarea" placeholder="使用 YAML 语法配置首页导航链接信息" rows="14" />
                </el-form-item>
                <el-form-item label="" style="margin: 20px 0;">
                    <el-button type="primary" @click="saveOption">保存</el-button>
                </el-form-item>
                <el-form-item label="语法说明：">
                    <div style="color: red; line-height: 24px; font-size: 16px; padding-top: 6px;">
                        <p>* 大小写敏感</p>
                        <p>* 使用缩进表示层级关系</p>
                        <p>* 禁止使用 tab 缩进，只能使用空格键</p>
                        <p>* 缩进长度没有限制，只要元素对齐就表示这些元素属于一个层级</p>
                        <p>* 使用 # 表示注释</p>
                        <p>* 字符串可以不用引号标注</p>
                    </div>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane name="Task" label="底部配置">
            <el-form size="large" label-position="right" label-width="90" style="max-width: 600px;">
                <el-form-item label="底部信息：">
                    <el-input v-model="config.footer" type="textarea" placeholder="填写底部信息" rows="10" />
                </el-form-item>
                <el-form-item label="" style="margin: 20px 0;">
                    <el-button type="primary" @click="saveOption">保存</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane name="System" label="系统配置">
            <el-form size="large" label-position="right" label-width="90" style="max-width: 600px;">
                <el-form-item label="重置账户：">
                    <el-button type="danger" @click="resetManager">重置管理员账户</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { reactive, watchEffect } from 'vue';
import { useConfigStore } from '@/store';
import yaml from 'js-yaml'
import { ElMessage, ElMessageBox } from 'element-plus';
import { change } from '@/api/option';
import { reset } from '@/api/user';

const state = reactive({
    activeName: 'User',
    navYaml: ''
})

const yaml2Json = (ymlText) => {
    try {
        return yaml.load(ymlText);
    } catch (error) {
        return {}
    }
}
const json2Yaml = (jsonText) => {
    try {
        return yaml.dump(jsonText);
    } catch (error) {
        return ""
    }
}

let { config } = useConfigStore()

watchEffect(() => {
    state.navYaml = json2Yaml(config.nav)
})

const saveOption = () => {
    let tempNav = JSON.stringify(yaml2Json(state.navYaml))
    if (tempNav == '{}') {
        ElMessage.error('请检查导航语法是否有误！')
        return
    }
    let tempConfig = [
        { key: 'title', value: config.title },
        { key: 'description', value: config.description },
        { key: 'headerImg', value: config.headerImg },
        { key: 'isHeaderHidden', value: config.isHeaderHidden ? 'true' : 'false' },
        { key: 'author', value: config.author },
        { key: 'authorStatus', value: config.authorStatus },
        { key: 'avatar', value: config.avatar },
        { key: 'notice', value: config.notice },
        { key: 'nav', value: tempNav },
        { key: 'footer', value: config.footer }
    ]
    change(tempConfig).then(resp => {
        if (resp.code === 200) {
            ElMessage.success('操作成功！')
        } else {
            ElMessage.error(resp.msg)
        }
    })
}

const resetManager = () => {
    ElMessageBox.confirm('重置管理员账户之后会跳转到登陆页面，新输入的账号和密码即为新的管理员账户。', '确定要重置吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        reset().then(resp => {
            if (resp.code !== 200) {
                ElMessage.error(resp.msg)
            } else {
                ElMessage.success('重置成功！')
                const token = localStorage.getItem('token');
                if (token) {
                    localStorage.removeItem('token')
                }
                setTimeout(() => {
                    window.location.href = '/'
                }, 1200);
            }
        })
    }).catch(() => {
        // 取消
    })
}
</script>

<style scoped></style>