import axios from 'axios'

export function request(config){
    const intance = axios.create({
        // baseURL: 'http://111.75.252.147/score',
        baseURL: 'https://cxcy.gmu.cn/score_back',
        withCredentials :true,
        timeout: 10000
    })


intance.interceptors.request.use(
    config => {
        return config
    },
    error =>{
        console.log(err);
    }
)

intance.interceptors.response.use(
    response =>{
        return response.data
    },
    error =>{
        console.log(error);
    }
)
 return intance(config)
}