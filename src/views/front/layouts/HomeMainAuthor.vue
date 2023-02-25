<template>
    <HomeCard :head="false" class="author-card">
        <template #default>
            <div class="avatar-box">
                <div>
                    <a href="#">
                        <el-avatar class="avatar-img" src="https://javac.me/images/global/gravatar.jpg" />
                    </a>
                </div>
                <h4>向日葵</h4>
                <p>毕设项目ing...</p>
            </div>
            <div class="blog-info">
                <div>
                    <h4>
                        <vue-count-to :start-val="0" :end-val="40" :duration="2000" />
                    </h4>
                    <p>文章数</p>
                </div>
                <div></div>
                <div>
                    <h4>
                        <vue-count-to :start-val="0" :end-val="800" :duration="2000" />
                    </h4>
                    <p>访问量</p>
                </div>
            </div>
        </template>
    </HomeCard>
</template>

<script>
import { reactive, toRefs } from 'vue'
import HomeCard from '../../../components/HomeCard.vue';
import vueCountTo from '../../../components/VueCountTo/vue-countTo.vue';
export default {
    name: "HomeMainAuthor",
    components: {
        vueCountTo,
        HomeCard
    },
    setup() {
        const state = reactive({
        })

        return {
            ...toRefs(state),
        }
    }
};
</script>
<style scoped>
.author-card {
    width: 260px;
    height: auto;
    background-image: url(/images/aside_author_image.jpg);
    background-size: cover;
    background-size: 100% 120px;
    background-repeat: no-repeat;
}

.avatar-box {
    margin: 65px auto 0;
    text-align: center;
}

.avatar-img {
    width: 70px;
    height: 70px;
    border: 3px solid #e3e4e5;
    border-radius: 50%;
}

.avatar-box h4 {
    display: inline-block;
    color: #73aaff;
    font-weight: 500;
    text-align: center;
    margin: 10px 0;
    cursor: pointer;
}

.avatar-box p {
    color: #404044;
    font-size: 14px;
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
    font-size: 22px;
}

.blog-info div p {
    font-size: 12px;
    color: #606266;
    margin-top: 6px;
}
</style>
  