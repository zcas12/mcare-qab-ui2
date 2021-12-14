<template>
    <div class="contents-container column pa-5">
        <el-row type="flex" class="flex-warp" >
            <el-col class="back-btn-box" :span="4" :sm="3" :md="2" :lg="1" >
                <el-button
                    style="vertical-align: center"
                    class="ml-1 mr-5"
                    type="info"
                    icon="el-icon-arrow-left"
                    circle
                    @click="back" >
                </el-button>
            </el-col>
            <el-col  :span="16" :md="14" :lg="6" >
                <div >
                    <h2 style="color: #606266;">QAB Dashboard</h2>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" class="flex-warp">
            <el-col class="pa-2" :xs="23" :md="24" :lg="24 / hospital.length"
                    v-for="hospitalServer in hospital"
                    :key="hospitalServer.serverCode">
                <el-card class="mb-3" body-style="padding: 0">
                    <el-alert
                        :type="hospitalState.toLowerCase()"
                        :title="`QAB 서버 - ${hospitalServer.serverCode}`"
                        :description="hospitalServer.appVersion"
                        :closable="false"
                        effect="dark"
                        show-icon
                    >
                    </el-alert>

                </el-card>
            </el-col>
        </el-row>
        <el-row type="flex" class="flex-warp">
            <el-col class="pa-2" :xs="23" :md="24" :lg="12">
                <process-chart :chart-data="processResources" :key="componentKey"></process-chart>
            </el-col>
            <el-col class="pa-2" :xs="23" :md="24" :lg="12">
                <memory-chart :chart-data="memoryResources" :key="componentKey"></memory-chart>
            </el-col>
            <el-col class="pa-2" :xs="23" :md="24" :lg="12">
                <diskspace-chart :chart-data="diskResources" :key="componentKey"></diskspace-chart>
            </el-col>
            <el-col class="pa-2" :xs="23" :md="24" :lg="12">
                <api-test-chart ></api-test-chart>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    async asyncData({app, params,router,error}) {
        const hospital = await app.$axios.get(`http://115.85.181.101:8080/api/hospital/dashboard-url?hospitalCd=${params.id}`);

        const getUri = hospital.data
        try {
            const payload = await app.$axios.get(getUri);
            const tracking = payload.data;
            console.log(tracking);
            return {

                processResources: tracking.resources,
                memoryResources:tracking.resources,
                diskResources: tracking.diskSpaces,
                /*            apiTestLogs: tracking.apiTestResults,*/
                hospital: tracking.states
            }
        }catch (e) {
            error({ statusCode: 404, message: 'Post not found' })
            //await app.router.push({path: '/hospitals/dashboard'});

        }

    },
    data: () => ({
        componentKey:0,
    }),
    created() {
        const loading = this.$loading({
            lock: true,
            text: 'loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        this.findHospitalState(this.$route.params.id);

        loading.close();
    },
    mounted() {
        this.loading = setInterval(this.$nuxt.refresh, 50000);
        this.loading = setInterval(this.forceRerender, 50000);

    },
    computed:{
        ...mapGetters('hospital', ['dashboard']),
        ...mapGetters('hospital', ['hospitalState']),
    },
    methods:{
        ...mapActions('hospital', ['findHospitalState'])
        ,
        forceRerender() {
            this.componentKey += 1
        },
        back() {
            this.$router.back()
        }

    }
}
</script>

<style lang="scss" scoped>
.contents-container {
    min-width: 500px;
    .flex-warp{
        .back-btn-box{
            line-height: 65px;
            min-width: 80px;
        }
    }
}

</style>
