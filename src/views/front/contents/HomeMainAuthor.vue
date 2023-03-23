<template>
    <HomeCard :head="false" class="author-card" width="300">
        <template #default>
            <div style="padding: 20px;">
                <div class="avatar-box">
                    <div>
                        <a style="cursor: pointer;" @click="avatarClick">
                            <el-avatar class="avatar-img" :src="config.avatar" />
                        </a>
                    </div>
                    <h4>{{ config.author }}</h4>
                    <p>{{ config.authorStatus }}</p>
                </div>
                <div class="blog-info">
                    <div>
                        <h4>
                            <vue-count-to :start-val="0" :end-val="config.articleCount" :duration="2000" />
                        </h4>
                        <p>文章数</p>
                    </div>
                    <div></div>
                    <div>
                        <h4>
                            <vue-count-to :start-val="0" :end-val="config.viewCount" :duration="2000" />
                        </h4>
                        <p>访问量</p>
                    </div>
                </div>
            </div>
        </template>
    </HomeCard>
</template>

<script setup>
import { ref, toRefs, inject } from 'vue'
import HomeCard from '../../../components/HomeCard.vue';
import vueCountTo from '../../../components/VueCountTo/vue-countTo.vue';
import { useConfigStore } from '../../../store';
import { useRouter } from 'vue-router';

let count = ref(0)
let { config } = useConfigStore()
let router = useRouter()

let timerId = 0
const avatarClick = () => {
    clearTimeout(timerId)
    count.value++
    if (count.value >= 5) {
        count.value = 0
        router.push('/manager')
    } else {
        timerId = setTimeout(() => {
            count.value = 0
        }, 2000)
    }
}

</script>
<style scoped>
.author-card {
    width: 300px;
    height: auto;
    background-image: url(/images/global/aside_author_image.jpg);
    background-size: cover;
    background-size: 100% 120px;
    background-repeat: no-repeat;
}

.avatar-box {
    margin: 65px auto 0;
    text-align: center;
}

.avatar-img {
    width: 90px;
    height: 90px;
    border: 3px solid #e3e4e5;
    border-radius: 50%;
}

.avatar-box h4 {
    display: inline-block;
    color: #73aaff;
    font-weight: 700;
    font-size: 22px;
    text-align: center;
    margin: 10px 0;
    cursor: pointer;
}

.avatar-box p {
    color: #404044;
    font-size: 18px;
}

.blog-info {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #ebeef5;
    margin-top: 20px;
    padding: 0 10px;
    padding-bottom: 20px;
}

.blog-info div {
    display: flex;
    flex-direction: column;
    text-align: center;
}

.blog-info div:nth-child(2) {
    border-right: 1px solid #ebeef5;
}

.blog-info div h4 {
    color: #404044;
    font-weight: 500;
    font-size: 24px;
}

.blog-info div p {
    font-size: 16px;
    color: #606266;
    margin-top: 6px;
}
</style>
  