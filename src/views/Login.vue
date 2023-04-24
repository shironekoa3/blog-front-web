<template>
    <section>
        <div class="login-card">
            <div class="login-card-img">
                <img src="/images/login/login_banner.webp" alt="登录">
            </div>
            <div class="login-card-main">
                <h5>
                    <svg class="inline-block" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512" mr-10="" text-50=""
                        color-primary="">
                        <path fill="currentColor"
                            d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-92.2 312.9c-63.4 0-85.4-28.6-97.1-64.1c-16.3-51-21.5-84.3-63-84.3c-22.4 0-45.1 16.1-45.1 61.2c0 35.2 18 57.2 43.3 57.2c28.6 0 47.6-21.3 47.6-21.3l11.7 31.9s-19.8 19.4-61.2 19.4c-51.3 0-79.9-30.1-79.9-85.8c0-57.9 28.6-92 82.5-92c73.5 0 80.8 41.4 100.8 101.9c8.8 26.8 24.2 46.2 61.2 46.2c24.9 0 38.1-5.5 38.1-19.1c0-19.9-21.8-22-49.9-28.6c-30.4-7.3-42.5-23.1-42.5-48c0-40 32.3-52.4 65.2-52.4c37.4 0 60.1 13.6 63 46.6l-36.7 4.4c-1.5-15.8-11-22.4-28.6-22.4c-16.1 0-26 7.3-26 19.8c0 11 4.8 17.6 20.9 21.3c32.7 7.1 71.8 12 71.8 57.5c.1 36.7-30.7 50.6-76.1 50.6z">
                        </path>
                    </svg>
                    用户登陆
                </h5>
                <el-form class="ruleForm">
                    <el-form-item>
                        <el-input size="large" maxlength="20" v-model="userData.username" type="text" autocomplete="off"
                            placeholder="请输入账号" input-style="font-size: 18px; color: #000;" />
                    </el-form-item>
                    <el-form-item>
                        <el-input size="large" maxlength="20" v-model="userData.password" type="password"
                            @keydown.enter.native="loginHandle" autocomplete="off" placeholder="请输入密码"
                            input-style="font-size: 18px; color: #000;" />
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox label="记住我" v-model="userData.isRemember" style="font-size: 20px;" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit" size="large" @click="loginHandle">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!-- <el-button type="primary" @click="loginHandle">登陆</el-button>
        <el-button type="primary" @click="testList">获取</el-button> -->
    </section>
</template>
  
<script setup>
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
import { login } from '@/api/user';
import router from '@/router';

let userData = reactive({
    username: '',
    password: '',
    isRemember: false
})

function loginHandle() {
    if (userData.username.trim() === '' || userData.password.trim() === '') {
        ElMessage.error('用户名或密码不能为空！')
    } else {
        login(userData).then(response => {
            if (response.code === 200) {
                localStorage.setItem('token', response.data.token);
                router.push('/manager')
            } else {
                ElMessage.error(response.msg)
            }
        })
    }
}

</script>
<style scoped>
section {
    width: 100%;
    height: 100vh;
    background-image: url(/images/login/login_bg.webp);
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-card {
    height: 425px;
    border-radius: 10px;
    padding: 0 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-20px);
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017;
}

.login-card-img {
    width: 320px;
    padding-right: 30px;
}

.login-card-img img {
    width: 100%;
}

.login-card-main h5 {
    font-size: 24px;
    display: flex;
    align-items: center;
    font-weight: 400;
    color: rgba(106, 106, 106, 1);
}

.login-card-main svg {
    color: #316C72FF;
    font-size: 40px;
    margin-right: 10px;
    margin-left: -2px;
}

.ruleForm {
    width: 100%;
    margin-top: 20px;
}

.submit {
    width: 100%;
    font-size: 16px;
}


@media only screen and (max-width: 768px) {
    .login-card-img {
        display: none;
    }
}


:deep().el-checkbox__inner {
    width: 16px;
    height: 16px;
}

:deep().el-checkbox__inner::after {
    left: 5px;
    height: 8px;
}

:deep().el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #316c72;
    border-color: #316c72;
}

:deep().el-checkbox__input.is-checked+.el-checkbox__label {
    color: #316c72;
}

:deep().el-checkbox__label {
    color: #000;
    font-size: 16px;
}

:deep().el-button:focus,
.el-button:hover {
    background-color: #477b80;
    border-color: #477b80;
}

:deep().el-button {
    background-color: #316c72;
    border-color: #316c72;
}

:deep().el-button:active {
    background-color: #2B4C59FF;
}
</style>