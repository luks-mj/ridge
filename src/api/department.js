import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例

const department ={
    getdepartment(){
        return axios.get(`${base.apiBase}/getDepartmentset`)
    },
    // getSearchList(params){
    //     return axios.post(`${base.apiBase}/getBumen`,params);
    // }
}
export default department;