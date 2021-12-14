<template>
    <el-container direction="horizontal" class="h-100">
        <el-menu
            :default-active="active"
            :router="true"
            :collapse="isCollapse"
            class="h-100 el-menu-nav"
            text-color="#E9EAEC"
            active-text-color="#FAD02C"
            background-color="#333652"
        >
            <el-submenu index="/hospitals">
                <template slot="title">
                    <i class="el-icon-s-platform"></i>
                    <span slot="title">QAB 모니터링</span>
                </template>
                    <el-menu-item index="/hospitals/dashboard">병원 QAB Dashboard</el-menu-item>
<!--                    <el-menu-item index="/hospitals/faults">병원 QAB 장애 이력</el-menu-item>-->
            </el-submenu>
<!--            <el-menu-item index="/users">
                <i class="el-icon-s-custom"></i>
                <span slot="title">사용자 관리</span>
            </el-menu-item>-->
        </el-menu>


        <el-container direction="vertical" class="h-100">
            <el-header class="white" style="box-shadow: 0 0 8px 4px rgba(0,0,0,0.1); z-index: 1">
                <div class="row flex-warp justify-space-between align-center h-100">
                    <div>
                        <el-tooltip class="item" effect="dark" content="메뉴" placement="bottom">
                            <el-button type="info" icon="el-icon-menu" circle @click="changeMenuCollapse"></el-button>
                        </el-tooltip>
                    </div>
                    <div>
                        <el-tooltip class="item" effect="dark" content="로그아웃" placement="bottom">
                            <el-button type="info" icon="mdi-set mdi-logout-variant" circle @click="processingLogout"></el-button>
                        </el-tooltip>
                    </div>
                </div>
            </el-header>
            <el-scrollbar>
                <el-main class="h-100 pa-0">
                    <Nuxt/>
                </el-main>
            </el-scrollbar>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data () {
        return {
            isCollapse: false,
            menuNavWarpCss: ''
        }
    },
    computed:{
        active(){
            return this.$route.path;
        }
    },
    watch: {
/*        isCollapse(isCollapse) {
            if (isCollapse) {
                this.menuNavWarpCss = {
                    ...this.menuNavWarpCss,
                    minWidth: '64px !important'
                }
            } else {
               this.menuNavWarpCss = {
                    ...this.menuNavWarpCss,
                    minWidth: '300px !important'
                }
            }
        }*/

    },
    methods:{
        changeMenuCollapse() {
            this.isCollapse = !this.isCollapse;
        },
        processingLogout() {
            const loading = this.$loading({
                lock: true,
                text: '로그인 진행중',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$router.push({path: '/login'});
            loading.close();
        }
    }
}
</script>
<style>
body {
  background-color: whitesmoke;
}

html, body {
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  height: 100%;
}

div#__nuxt,
div#__layout {
  height: 100%;
}
.el-container{
    flex-basis: min-content !important;
}
.el-scrollbar__wrap {
  overflow-y: scroll;
  overflow-x: hidden;
}
.el-menu{
  /*  minWidth: 300px !important;*/
}
.el-menu-nav:not(.el-menu--collapse) {
    width: 250px;
}
</style>
