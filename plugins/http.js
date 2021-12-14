import axios from "axios";

const http = axios.create({
    withCredentials: true
});


http.interceptors.request.use(
    function (config) {
        return config;
    },
    function () {
    }
);

http.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default http;
