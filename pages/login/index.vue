<template>
    <el-row class="container h-100 flex-wrap" type="flex" justify="center" align="center">
        <el-card class="login-box">
            <div class="mb-10 pa-4">
                <img
                    src="data:image/png;base64,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"
                    class="h-50p"
                    alt="Lemon Healthcare Hospital Api Management System"
                />
            </div>
            <div class="mb-5">
                <label class="display-block mb-1">이메일</label>
                <el-input
                    slot="append"
                    id="account-email"
                    placeholder="이메일을 입력해주세요."
                    v-model="account.email">
                    <el-icon slot="prepend" name="user-solid"></el-icon>
                </el-input>
            </div>
            <div class="mb-5">
                <label class="display-block mb-1" >비밀번호</label>
                <el-input
                    slot="append"
                    id="account-password"
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    v-model="account.password">
                    <el-icon slot="prepend" name="lock"></el-icon>
                </el-input>
            </div>
            <el-row class="mb-5" type="flex" justify="center">
                <el-checkbox v-model="rememberEmail" @click="recodingRememberEmail">이메일 저장</el-checkbox>
            </el-row>
            <el-row class="login-btn-box mb-5" type="flex" justify="center">
                <el-button class="login-btn"  @click="authenticate">로그인</el-button>
            </el-row>
        </el-card>
    </el-row>
</template>
<script>
export default {
    layout:'login-layout',
    data:() => ({
        account:{
            email:null,
            password:null
        },
        rememberEmail: false,
    }),
    created() {
        const email = localStorage.getItem('email');
        if (email !== null) {
            this.rememberEmail = true;
            this.account.email = email;
        }
    },
    watch: {
        rememberEmail() {
            this.recodingRememberEmail();
        }
    },
    methods:{
        recodingRememberEmail() {
            if(this.account.email === null || this.account.email === '') {
                return;
            }

            if (this.rememberEmail) {
                localStorage.setItem('email', this.account.email);
            } else {
                localStorage.removeItem('email');
            }
        },
        authenticate() {
            const loading = this.$loading({
                lock: true,
                text: '로그인 진행중',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

            loading.close();

            this.$router.push({path: '/hospitals/dashboard'})

        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    align-items: center;
    justify-content: center;
    height: 100%;
    .login-box{
        height: 26em;
        .login-btn-box{
            .login-btn{
                background-color:#00A1E9;
                color:#fff;
                width: 100%;
            }
        }
    }
}


</style>
