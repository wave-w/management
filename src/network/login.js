import { request } from './request';
export function Login(username,password,rememberme){
    return request({
        url : '/back/login',
        method:'POST',
        params: {
            username,
            password,
            rememberme
        }
    })
}
export function logout(){
    return request({
        url : '/logout',
        method:'POST'
    })
}


export function changepassword(username,oldPasswd,newPasswd){
    return request({
        url:'/back/changePasswd',
        method:'POST',
        params:{
            username,oldPasswd,newPasswd
        }
    })
}