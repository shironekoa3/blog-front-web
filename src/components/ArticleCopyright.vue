<template>
    <div class="article-copyright">
        <div>
            <people theme="filled" size="16" fill="#6163b6" style="vertical-align: -3px; margin-right: 4px;" />
            <span>文章作者：</span>
            <span>向日葵</span>
        </div>
        <div>
            <copy-link theme="filled" size="16" fill="#6163b6" style="vertical-align: -3px; margin-right: 4px;" />
            <span>文章链接：</span>
            <span>http://127.0.0.1:5173/#/home</span>
        </div>
        <div>
            <copyright theme="filled" size="16" fill="#6163b6" style="vertical-align: -3px; margin-right: 4px;" />
            <span>版权声明：</span>
            <span>本博客所有文章除特别声明外，均采用 CC BY-NC-SA 4.0 许可协议。转载请注明来自 向日葵！</span>
        </div>
    </div>
</template>

<script>
import { inject, onMounted, onUnmounted } from 'vue';
import { People, CopyLink, Copyright } from '@icon-park/vue-next';

export default {
    name: "ArticleCopyright",
    components: {
        People, CopyLink, Copyright
    },
    setup() {
        return {
        }
    }
};
</script>
<style scoped>
.article-copyright {
    height: 80px;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
    background-color: #ffffff;
    overflow: hidden;
    transition: 0.3s;
    color: #303133;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
</style>