import { reactive } from "vue";
import { defineStore } from "pinia";
import { listHome as listOption } from "../api/option";
import { ElMessage } from "element-plus";

export const useConfigStore = defineStore('config', () => {
    let rawConfig = reactive({})
    let config = reactive({
        title: '',
        description: '',
        headerImg: '',
        isHeaderHidden: false,
        author: '',
        authorStatus: '',
        notice: '',
        link: '',
        avatar: '',
        viewCount: 0,
        articleCount: 0,
        nav: {},
        footer: '',
        isShowDescription: true,
        tags: [],
        currArticle: {
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
        },
    })


    // 获取网站配置
    listOption().then(response => {
        if (response.status !== 200) {
            ElMessage.error('获取失败，网络错误！')
        } else {
            rawConfig = response.data
            rawConfig.map(i => { return { [i.key]: i.value } })
                .forEach(i => { Object.assign(config, i) })

            // 将后台传入的文本数据转换成对应的类型
            config.isHeaderHidden = config.isHeaderHidden !== 'false'
            config.articleCount = Number(config.articleCount)
            config.nav = JSON.parse(config.nav)
            config.viewCount = Number(config.viewCount)
        }
        // console.log('数据获取完成！', config);
    })

    return {
        rawConfig,
        config
    }
})