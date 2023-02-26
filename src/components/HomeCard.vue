<template>
    <div class="box-card" :style="{ width: width + 'px' }">
        <div v-if="head" class="card-header">
            <slot name="icon">
                <!-- <speaker-one theme="filled" size="20" fill="#f4ca1c" /> -->
            </slot>
            <span style="margin-left: 5px;">{{ title }}</span>
            <div class="card-header-item">
                <i></i>
            </div>
        </div>
        <div class="card-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeCard",
    props: {
        title: {
            default: '卡片',
            type: String
        },
        head: {
            default: true,
            type: Boolean
        },
        width: {
            default: '260',
            type: String
        }
    }
};
</script>
<style scoped>
.box-card {
    width: 260px;
    border-radius: 6px;
    overflow: hidden;
    color: #303133;
    background-color: #ffffff;
    transition: 0.3s;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
}

.card-header {
    padding: 10px 12px;
    border-bottom: 1px solid #e4e7ed;
    font-size: 18px;
    font-weight: 700;
}

.card-header-item {
    float: right;
    width: 60px;
    height: 20px;
}

.card-header-item i {
    display: inline-block;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    margin-top: 4px;
    background-color: #fc625d;
    box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
}
</style>