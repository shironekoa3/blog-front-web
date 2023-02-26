<template>
    <div style="position: -webkit-sticky; position: sticky; top: 10px;">
        <!-- 作者信息卡片 -->
        <HomeMainAuthor />
        <div style="margin-bottom: 20px;"></div>

        <!-- 站点公告卡片 -->
        <HomeCard title="站点公告" width="300">
            <template v-slot:icon>
                <speaker-one theme="filled" size="20" fill="#f4ca1c" style="vertical-align: -3px;" />
            </template>
            <template #default>
                <div style="padding: 20px;">{{ config.notice }}</div>
            </template>
        </HomeCard>
        <div style="margin-bottom: 20px;"></div>

        <!-- 标签云卡片 -->
        <HomeMainCardCloud />
    </div>
</template>

<script>
import { reactive, toRefs, inject } from 'vue'
import HomeCard from '../../../components/HomeCard.vue';
import { SpeakerOne, Tag } from '@icon-park/vue-next';
import vueCountTo from '../../../components/VueCountTo/vue-countTo.vue';
import HomeMainAuthor from '../contents/HomeMainAuthor.vue'
import HomeMainCardCloud from '../contents/HomeMainTagCloud.vue'
export default {
    name: "HomeMainLeft",
    components: {
        vueCountTo,
        HomeCard,
        HomeMainAuthor,
        HomeMainCardCloud,
        SpeakerOne, Tag
    },
    setup(props) {
        const state = reactive({

        })

        let config = inject('config')

        return {
            ...toRefs(state),
            config
        }

    }
};
</script>
<style scoped></style>
  