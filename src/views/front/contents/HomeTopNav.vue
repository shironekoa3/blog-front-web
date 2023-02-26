<template>
    <div class="nav-container">
        <nav>
            <a href="/" title="首页">
                <el-avatar class="nav-img" :src="config.avatar" />
            </a>
            <div class="nav-menu">
                <div class="nav-menu-item">
                    <a href="#">
                        <span class="nav-menu-item-nc" v-text="'首页'" title="首页"
                            :style="{ 'color': config.isHeaderHidden ? '#666' : '#fff' }">
                        </span>
                    </a>
                </div>
                <div class="nav-menu-item">
                    <div class="dropdown">
                        <span class="dropdown-text" :style="{ 'color': config.isHeaderHidden ? '#666' : '#fff' }">
                            分类
                            <i style="vertical-align: -2px;">
                                <down theme="outline" size="20" :fill="config.isHeaderHidden ? '#666' : '#fff'" />
                            </i>
                        </span>
                        <div class="dropdown-content">
                            <a href="#">
                                <span v-text="'子菜单'"></span>
                            </a>
                            <a href="#">
                                <span v-text="'子菜单'"></span>
                            </a>
                            <a href="#">
                                <span v-text="'子菜单'"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';
import { Down } from '@icon-park/vue-next';

export default {
    name: "HomeTopNav",
    components: {
        Down
    },
    props: ['config'],
    setup() {
        const state = reactive({
            navLinks: [],
        })

        const getNavLinks = () => {
            let tempdata = []

            // 取出所有父级节点 并排序
            let topMenu = tempdata.filter(item => {
                return item.parentId === 0
            }).sort((a, b) => {
                return a.id - b.id
            });

            // 取出所有子节点，插入到父节点的 children 属性里面
            tempdata.filter(item => {
                return item.parentId !== 0
            }).sort((a, b) => {
                return a.id - b.id
            }).forEach(item => {
                topMenu.forEach(topItem => {
                    if (item.parentId === topItem.id) {
                        topItem.children.push(item);
                    }
                });
            });

            state.navLinks = topMenu;
        }

        onMounted(() => {
            getNavLinks()
        })
        return {
            ...toRefs(state),
            getNavLinks
        }
    }
};
</script>
<style scoped>
.nav-container {
    width: 100%;
    display: flex;
    justify-content: center;
}

nav {
    width: 80%;
    height: 60px;
}

.nav-img {
    display: block;
    float: left;
    margin: 10px 0;
    margin-right: 20px;
    cursor: pointer;
}

.nav-menu {
    float: left;
    height: 60px;
}

.nav-menu-item {
    float: left;
    color: white;
    height: 100%;
    margin-left: 10px;
}

.nav-menu-item:first-child {
    margin-left: 0;
}

.nav-menu-item-nc {
    display: inline-block;
    padding: 18px 20px;
}

.dropdown {
    position: relative;
    cursor: pointer;
    width: 100px;
    text-align: center;
}

.dropdown .dropdown-text {
    display: inline-block;
    padding: 18px 0;
    width: 100px;
}

.dropdown:hover .dropdown-content {
    visibility: visible;
    margin-top: 0px;
    opacity: 1;
}

.dropdown:hover .dropdown-icon {
    transform: rotate(180deg);
}

.dropdown-content {
    visibility: hidden;
    width: 120px;
    position: absolute;
    left: -10px;
    background-color: #fff;
    border-radius: 5px;
    transition: all 0.3s;
    margin-top: -10px;
    opacity: 0;
    overflow: hidden;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.dropdown-content a {
    display: block;
    width: 100%;
    height: 40px;
    text-align: center;
    transition: all 0.3s;
}

.dropdown-content a:hover {
    background-color: #ddd;
}

.dropdown-content a span {
    display: inline-block;
    margin-top: 8px;
    padding: 0;
    color: #000;
}
</style>
  