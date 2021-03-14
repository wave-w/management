import { request } from '../request';
export function getteacheraccount(position,className,college,currentPage,pageSize){
    return request({
        url:'/back/getAllTea',
        method:'POST',
        params:{
            position,className,college,currentPage,pageSize
        }
    })
}
export function getstuentaccount(grade,className,college,currentPage,pageSize){
    return request({
        url:'/back/getAllStu',
        method:'POST',
        params:{
            grade,className,college,currentPage,pageSize
        }
    })
}
export function deleteacher(ids){
    return request({
        url:'/back/delSomeTea',
        method:'DELETE',
        params:{
            ids
        }
    })
}
export function delestudent(ids){
    return request({
        url:'/back/delSomeStu',
        method:'DELETE',
        params:{
            ids
        }
    })
}
export function addadminacc(username,password,roleId){
    return request({
        url:'/back/addAdministrators',
        method:'POST',
        params:{
            username,
            password,
            roleId
        }
    })
}


export function addteacher(num,name,sex,className,position,college,phone,nation,password,roleId){
    return request({
        url:'/back/addTea',
        method:'POST',
        params:{
            num,name,sex,className,position,college,phone,nation,password,roleId
        }
    })
}


export function editteacher(id,num,name,sex,className,position,college,phone,nation,password){
    return request({
        url:'/back/changeTea',
        method:'PUT',
        params:{
            id,num,name,sex,className,position,college,phone,nation,password
        }
    })
}


export function resetstupassword(stuNum){
    return request({
        url:'/back/changeStuPasswd',
        method:'PUT',
        params:{
            stuNum
        }
    })
}