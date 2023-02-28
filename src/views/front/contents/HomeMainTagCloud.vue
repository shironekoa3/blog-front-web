<template>
    <HomeCard title="标签云" width="300">
        <template v-slot:icon>
            <bookmark-one theme="filled" size="18" fill="#fc625d" style="vertical-align: -3px;" />
        </template>
        <template #default>
            <div class="tag-cloud">
                <ul>
                    <li v-for="(tag, i) in config.tags" :id="i">
                        <a href="#" class="tag-cloud-item" v-text="tag.name"
                            :style="{ backgroundColor: getRandomColor() }"></a>
                    </li>
                </ul>
            </div>
        </template>
    </HomeCard>
</template>

<script>
import { reactive, toRefs, inject } from 'vue';
import { BookmarkOne } from '@icon-park/vue-next';
import HomeCard from '../../../components/HomeCard.vue';
import { useConfigStore } from '../../../store';
import { list } from '../../../api/tag';


export default {
    name: "HomeMainCardCloud",
    components: { BookmarkOne, HomeCard },
    setup() {
        const state = reactive({
        })
        const { config } = useConfigStore()

        // 获取标签数据
        list().then(response => {
            if (response.status !== 200) {
                ElMessage.error('标签获取失败！')
            } else {
                config.tags = response.data
            }
        })

        const getRandomColor = () => {
            let colorList = ['#fdc400', '#e66c70', '#f8ba3c', '#ea5455', '#00eaff', '#ed71b4', '#45c17a', '#ef93fa', '#ff52e5', '#fd999d']
            return colorList[Math.floor(Math.random() * colorList.length)]
        }

        return {
            ...toRefs(state),
            config,
            getRandomColor
        }
    }
};
</script>
<style scoped>
.tag-cloud {
    display: flex;
    flex-wrap: wrap;
    padding: 12px;
}

.tag-cloud li {
    float: left;
    padding: 5px;
}

.tag-cloud-item {
    display: inline-block;
    padding: 4px 8px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 2px;
    transition: 0.3s;
}

.tag-cloud-item:hover {
    background-color: #000 !important;
}
</style>
  