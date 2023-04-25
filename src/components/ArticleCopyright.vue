<template>
    <div class="article-copyright">
        <div>
            <i-people theme="filled" size="16" fill="#6163b6" style="vertical-align: -3px; margin-right: 4px;" />
            <span>文章作者：</span>
            <span>{{ config.author }}</span>
        </div>
        <div>
            <i-copy-link theme="filled" size="16" fill="#6163b6" style="vertical-align: -3px; margin-right: 4px;" />
            <span>文章链接：</span>
            <a :href="link">{{ link }}</a>
        </div>
        <div>
            <i-copyright theme="filled" size="16" fill="#6163b6" style="vertical-align: -3px; margin-right: 4px;" />
            <span>版权声明：</span>
            <span>本博客所有文章除特别声明外，均采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA
                    4.0</a> 许可协议。转载请注明来自 <a href="/">{{ config.author }}</a> ！</span>
        </div>
    </div>
</template>

<script setup>
import { useConfigStore } from '@/store';
const { config } = useConfigStore()

let link = window.location.href

</script>
<style scoped>
a {
    color: #000;
    text-decoration: underline;
}

.article-copyright {
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
    background-color: #ffffff;
    overflow: hidden;
    transition: 0.3s;
    color: #303133;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
</style>