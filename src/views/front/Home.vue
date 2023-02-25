<template>
    <HomeTop :config="config" />
    <HomeMain />
</template>

<script>
import { reactive, toRefs } from 'vue';
import HomeMain from './layouts/HomeMain.vue';
import HomeTop from './layouts/HomeTop.vue';
export default {
    name: "home",
    components: {
        HomeTop,
        HomeMain
    },
    setup() {
        const state = reactive({
            config: {
                title: '向日葵的个人博客',
                description: '这里是向日葵的个人博客！',
                avatar: 'https://javac.me/images/global/gravatar.jpg',
                headerImg: '/images/54.webp',
                isHeaderHidden: false
            }
        })

        return {
            ...toRefs(state)
        }

    }
};
</script>
<style scoped></style>
  