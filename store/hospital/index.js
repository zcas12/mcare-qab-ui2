export const state = () => ({
    //dashboard: [{"hospitalCode":"11100036","hospitalName":"서울백병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:00"},{"hospitalCode":"11100117","hospitalName":"고려대학교 안암병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:01"},{"hospitalCode":"11100184","hospitalName":"한양대학교병원 본원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:01"},{"hospitalCode":"11100206","hospitalName":"신촌세브란스","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:02"},{"hospitalCode":"11100443","hospitalName":"강남세브란스","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:02"},{"hospitalCode":"11100494","hospitalName":"고려대학교 구로병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:03"},{"hospitalCode":"11100729","hospitalName":"강동성심병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:05"},{"hospitalCode":"11101016","hospitalName":"노원을지대학교병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:06"},{"hospitalCode":"11921196","hospitalName":"인하대학교병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:06"},{"hospitalCode":"31100252","hospitalName":"고려대학교 안산병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:07"},{"hospitalCode":"31100309","hospitalName":"가천대학교길병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:07"},{"hospitalCode":"31100538","hospitalName":"한양대학교병원 구리","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:08"},{"hospitalCode":"31100741","hospitalName":"국립암센터","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:09"},{"hospitalCode":"32100035","hospitalName":"원주세브란스기독병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:09"},{"hospitalCode":"34100041","hospitalName":"대전을지대학교병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:10"},{"hospitalCode":"34100199","hospitalName":"단국대학교병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:11"},{"hospitalCode":"35100061","hospitalName":"원광대학교병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:11"},{"hospitalCode":"36100013","hospitalName":"전남대학교병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:12"},{"hospitalCode":"36100021","hospitalName":"조선대학교병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:14"},{"hospitalCode":"36100498","hospitalName":"화순전남대학교병원","state":"ERROR","sort":1,"messages":"서버 다운","renewal":"2021-12-10T12:22:14"},{"hospitalCode":"37100092","hospitalName":"대구가톨릭대학교병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:16"},{"hospitalCode":"38100215","hospitalName":"경상대학교병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:17"},{"hospitalCode":"38100525","hospitalName":"삼성창원병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:18"},{"hospitalCode":"39100103","hospitalName":"제주대학교병원","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:19"},{"hospitalCode":"KAHP","hospitalName":"한국건강관리협회","state":"SUCCESS","sort":3,"messages":"정상","renewal":"2021-12-10T12:22:19"}
    //],
    dashboard:[],
    hospitalState:""
})

export const mutations = {
    DASHBOARD (state, dashboard) {
        state.dashboard = dashboard;
    },
    HospitalState (state, hospitalState) {
        state.hospitalState = hospitalState;
    }
}

export const actions = {
    async findServerDashboard({commit}) {
         const payload = await this.$axios.get('http://115.85.181.101:8080/api/hospital');
         console.log(payload.data)
         commit("DASHBOARD", payload.data);
    },
    async findHospitalState({commit},id){
        const payload = await this.$axios.get('http://115.85.181.101:8080/api/hospital');
        let result = ""
        payload.data.forEach(function (item){
            if (item.hospitalCode.indexOf(id) >= 0 ){
                result = item.state
            }
        })
        console.log(result);
        commit("HospitalState", result);
    }
}

export const getters = {
    dashboard: (state) => state.dashboard,
    hospitalState: (state) => state.hospitalState
}
