import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例

const wicket = {
    // 窗口
    getWicketlist(params) {
        return axios.post(`${base.apiBase}/getChuangkou`,params)
    },
    // 事项
    getIncidentlist(params) {
        return axios.post(`${base.apiBase}/getShixiang`,params)
    },
    // 工号
    getJobNumlist(params) {
        return axios.post(`${base.apiBase}/getGonghao`,params)
    },
    // getSearchList(pageNum, pageSize, total, ) {
    //     return axios.get(`${base.apiBase}/getBumen` + "?pageNum=" + pageNum + "&pageSize=" + pageSize + "&total=" + total, );
    // },
    // 部门
     getSearchList(params) {
        return axios.post(`${base.apiBase}/getBumen` ,params);
    },

    getTodaylist() {
        // return axios.get(`${base.apiBase}`)
    },
}
export default wicket;