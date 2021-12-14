<template>
    <div class="contents-container column pa-5">
        <div class="row flex-warp align-center">
            <h2>병원 QAB Dashboard</h2>
            <el-tooltip
            class="item"
            effect="dark"
            content="서버 추가"
            placement="bottom">
                <el-button
                    class="ml-1"
                    type="info"
                    icon="el-icon-plus"
                    circle
                    size="mini"
                    @click="toggleRegisterServer"
                ></el-button>
            </el-tooltip>
        </div>
        <el-dialog
            title="Shipping address"
            width="400px"
            :visible.sync="toggle">
            <div class="mb-2">
                <span class="mb-1">서버코드</span>
                <el-input label="서버코드" placeholder="서버코드">
                </el-input>
            </div>
            <div class="mb-2">
                <span class="mb-1">IP</span>
                <el-input label="IP" placeholder="IP" >
                </el-input>
            </div>
            <div class="row justify-end">
                <el-button @click="toggle = false">Cancel</el-button>
                <el-button type="primary" @click="toggle = false">Confirm</el-button>
            </div>
        </el-dialog>

        <div class="column justify-center pv-4">
            <el-input class="w-350p" label="병원 검색" prefix-icon="el-icon-search" placeholder="병원명 입력" v-model="search"/>
        </div>
        <el-row :gutter="16">
            <el-col :xs="24" :sm="12" :md="8" :xl="4" :lg="6"
                    v-for="(server) in hospitalServerStates" :key="server.hospitalCode">
                <nuxt-link :to="`/hospitals/dashboard/${server.hospitalCode}`" @click.native="loading">

                    <el-button
                        v-if="server.state === 'ERROR'"
                        class="w-100 h-60p mt-4"
                        icon="el-icon-error"
                        type="danger"
                    >{{ server.hospitalName }}
                    </el-button>

                    <el-button
                        v-if="server.state === 'WARNING'"
                        class="w-100 h-60p mt-4"
                        icon="el-icon-warning"
                        type="warning">
                        {{ server.hospitalName }}
                    </el-button>

                    <el-button
                        v-if="server.state === 'SUCCESS'"
                        class="w-100 h-60p mt-4"
                        icon="el-icon-success"
                        type="success">
                        {{ server.hospitalName }}
                    </el-button>
                </nuxt-link>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import _ from 'lodash'

export default {
    name: "index",
    data: () => ({
    search: null,
    toggle: false
    }),
    created() {
        const loading = this.$loading({
            lock: true,
            text: 'loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });

        this.findServerDashboard();
        setInterval(() => {
            this.findServerDashboard();
        }, 100000)
        loading.close();
    },
    mounted() {

    },
    computed: {
        ...mapGetters('hospital', ['dashboard']),
        hospitalServerStates() {
            return _.filter(this.dashboard, item => this.search === null || item.hospitalName.indexOf(this.search) > -1)
        }
    },
    methods: {
        ...mapActions('hospital', ['findServerDashboard']),
        toggleRegisterServer() {
            this.toggle = !this.toggle;
        },
        loading(){

            const loading = this.$loading({
                lock: true,
                text: 'loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

        }
    }
}
</script>

<style scoped>

</style>
