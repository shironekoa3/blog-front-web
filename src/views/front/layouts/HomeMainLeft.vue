<template>
    <!-- 作者信息卡片 -->
    <HomeMainAuthor />
    <div style="margin-bottom: 20px;"></div>

    <!-- 站点公告卡片 -->
    <HomeCard title="站点公告">
        <template v-slot:icon>
            <speaker-one theme="filled" size="20" fill="#f4ca1c" style="vertical-align: -4px;" />
        </template>
        <template #default>
            <div>博客系统开发中...</div>
        </template>
    </HomeCard>
</template>

<script>
import { reactive, toRefs } from 'vue'
import HomeCard from '../../../components/HomeCard.vue';
import { SpeakerOne } from '@icon-park/vue-next';
import vueCountTo from '../../../components/VueCountTo/vue-countTo.vue';
import HomeMainAuthor from './HomeMainAuthor.vue'
export default {
    name: "HomeMainLeft",
    components: {
        vueCountTo,
        HomeCard,
        HomeMainAuthor,
        SpeakerOne
    },
    setup(props) {
        const state = reactive({
        })

        return {
            ...toRefs(state)
        }

    }
};
</script>
<style scoped></style>
  