<template>
    <div class="card-panel-container">
        <div class="card-panel">
            <div class="card-panel-icon-wrapper">
                <svg t="1681740822890" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="7125" width="25" height="25">
                    <path
                        d="M320 864 320 0l480 0 0 192 0 32L1024 224l0 640L320 864zM928 320l-512 0 0 32 512 0L928 320zM928 448l-512 0 0 32 512 0L928 448zM928 576l-512 0 0 32 512 0L928 576zM928 704l-512 0 0 32 512 0L928 704zM832 0l19.2 0L1024 160 1024 192l-192 0L832 0zM288 896l320 0L704 896l0 128L0 1024 0 160l288 0 0 320-192 0L96 512l192 0 0 96-192 0L96 640l192 0 0 96-192 0L96 768l192 0 0 96-192 0L96 896 288 896z"
                        p-id="7126" fill="#04934d"></path>
                </svg>
            </div>
            <div class="card-panel-description">
                <div class="card-panel-text">
                    文章数量
                </div>
                <div class="card-panel-counter">
                    <count-to :start-val="0" :end-val="articleCount" :duration="2000" class="card-panel-num" />
                </div>
            </div>
        </div>
        <div class="card-panel">
            <div class="card-panel-icon-wrapper">
                <svg t="1681743392864" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="8203" width="25" height="25">
                    <path
                        d="M372.374696 93.15419q25.491887 0 43.61527 17.653053t18.123383 43.113585l0 244.979227q0 25.491887-18.123383 43.61527t-43.61527 18.123383l-244.979227 0q-25.491887 0-43.113585-18.123383t-17.653053-43.61527l0-244.979227q0-25.491887 17.653053-43.113585t43.113585-17.653053l244.979227 0zM372.374696 583.081289q25.491887 0 43.61527 17.653053t18.123383 43.113585l0 245.951242q0 25.491887-18.123383 43.113585t-43.61527 17.653053l-244.979227 0q-25.491887 0-43.113585-17.653053t-17.653053-43.113585l0-245.951242q0-25.491887 17.653053-43.113585t43.113585-17.653053l244.979227 0zM863.27381 583.081289q25.491887 0 43.113585 17.653053t17.653053 43.113585l0 245.951242q0 25.491887-17.653053 43.113585t-43.113585 17.653053l-244.979227 0q-25.491887 0-43.61527-17.653053t-18.123383-43.113585l0-245.951242q0-25.491887 18.123383-43.113585t43.61527-17.653053l244.979227 0zM999.481383 200.922474q19.597084 19.597084 19.597084 46.060986t-19.597084 45.088971l-182.268558 182.268558q-19.597084 19.597084-45.559301 19.597084t-45.559301-19.597084l-182.268558-182.268558q-18.625069-18.625069-18.625069-45.088971t18.625069-46.060986l182.268558-182.268558q19.597084-18.625069 45.559301-18.625069t45.559301 18.625069z"
                        fill="#2dadfc" p-id="8204"></path>
                </svg>
            </div>
            <div class="card-panel-description">
                <div class="card-panel-text">
                    分类数量
                </div>
                <div class="card-panel-counter">
                    <count-to :start-val="0" :end-val="categoryCount" :duration="2000" class="card-panel-num" />
                </div>
            </div>
        </div>
        <div class="card-panel">
            <div class="card-panel-icon-wrapper">
                <svg t="1681743745477" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="10075" width="25" height="25">
                    <path
                        d="M814.766 416.148l-8.479-226.429c-1.087-29.034-24.53-52.237-53.573-53.02l-226.507-6.133a55.091 55.091 0 0 0-40.656 16.32L85.668 550.93c-21.319 21.537-21.136 56.605 0.401 77.924L321.053 861.42c21.54 21.316 56.607 21.136 77.925-0.405l399.886-404.044a55.1 55.1 0 0 0 15.902-40.823z m-188.848-56.306c-35.869-8.689-57.899-44.811-49.211-80.676 8.689-35.869 44.807-57.9 80.676-49.211s57.9 44.807 49.211 80.676c-8.689 35.865-44.808 57.9-80.676 49.211z"
                        p-id="10076" fill="#7d6ac7"></path>
                    <path
                        d="M960.888 451.546l-8.479-226.429c-1.087-29.034-24.53-52.237-53.573-53.02l-54.94-1.488c6.529 8.69 10.663 19.285 11.098 30.91l8.478 226.429a55.105 55.105 0 0 1-15.901 40.823L447.687 872.815c-0.807 0.816-1.755 1.388-2.6 2.144l22.089 21.86c21.54 21.316 56.607 21.136 77.925-0.405L944.987 492.37a55.1 55.1 0 0 0 15.901-40.824z"
                        p-id="10077" fill="#7d6ac7"></path>
                </svg>
            </div>
            <div class="card-panel-description">
                <div class="card-panel-text">
                    标签数量
                </div>
                <div class="card-panel-counter">
                    <count-to :start-val="0" :end-val="tagCount" :duration="2000" class="card-panel-num" />
                </div>
            </div>
        </div>
        <div class="card-panel">
            <div class="card-panel-icon-wrapper">
                <svg t="1681743791259" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="11125" width="25" height="25">
                    <path
                        d="M420.864 450.56l-164.864 139.264 0-186.368 185.344-162.816 5.12 6.144 167.936 195.584 308.224-320.512 92.16 112.64-413.696 431.104-3.072-7.168zM928.768 705.536q19.456 0 37.376 7.68t30.72 20.48 20.48 30.208 7.68 36.864q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68l-832.512 0q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888l0-640q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68q19.456 0 37.376 7.68t30.72 20.48 20.48 30.72 7.68 37.376l0 544.768 736.256 0z"
                        p-id="11126" fill="#fe52cb"></path>
                </svg>
            </div>
            <div class="card-panel-description">
                <div class="card-panel-text">
                    总访问量
                </div>
                <div class="card-panel-counter">
                    <count-to :start-val="0" :end-val="viewCount" :duration="2000" class="card-panel-num" />
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import CountTo from '@/components/VueCountTo/vue-countTo.vue'
import { reactive } from 'vue';
import { useConfigStore } from '@/store';

let props = defineProps({
    articleCount: {
        type: Number,
        default: 0
    },
    categoryCount: {
        type: Number,
        default: 0
    },
    tagCount: {
        type: Number,
        default: 0
    },
    viewCount: {
        type: Number,
        default: 0
    }
})

let state = reactive({

})

let { config } = useConfigStore()


</script>
  
<style scoped>
.card-panel-container {
    width: 100%;
    background-color: #fff;
    border-radius: 6px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 20px;
}

.card-panel {
    height: 100px;
    min-width: 170px;
    background-color: #ddf8e9;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-panel-icon-wrapper {
    width: 30px;
    height: 30px;
    background-color: #c4e6d1;
    padding: 10px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-panel-description {
    margin-left: 14px;
    letter-spacing: 1px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    font-weight: 400;
}

.card-panel-counter {
    width: 100%;
    font-size: 24px;
    text-align: center;
    font-weight: 700;
    color: #1d8e5c;
}

.card-panel:nth-child(2) {
    background-color: #dcedf7;
}

.card-panel:nth-child(2) .card-panel-icon-wrapper {
    background-color: #bedff0;
}

.card-panel:nth-child(2) .card-panel-counter {
    color: #3fafe7;
}

.card-panel:nth-child(3) {
    background-color: #ece7fa;
}

.card-panel:nth-child(3) .card-panel-icon-wrapper {
    background-color: #d9d2e4;
}

.card-panel:nth-child(3) .card-panel-counter {
    color: #4f35b0;
}

.card-panel:nth-child(4) {
    background-color: #fde9f8;
}

.card-panel:nth-child(4) .card-panel-icon-wrapper {
    background-color: #f3d5f0;
}

.card-panel:nth-child(4) .card-panel-counter {
    color: #e760be;
}


@media only screen and (max-width: 1360px) {
    .card-panel-container {
        grid-template-rows: 1fr 1fr;
        grid-template-columns: repeat(2, 1fr);
    }
}

/* 
@media only screen and (max-width: 875px) {
    .right-panel {
        display: none;
    }
}

@media only screen and (max-width: 1200px) {

    .card-panel:nth-child(2),
    .card-panel:nth-child(3) {
        display: none;
    }

    .right-panel .card-panel {
        width: 49%;
    }
}

@media only screen and (max-width: 1550px) {
    .right-panel .card-panel {
        flex-direction: column;
    }
} */
</style>
