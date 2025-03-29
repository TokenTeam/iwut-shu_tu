import { http } from "@/utils";

//获取帖子API
export function getBookInfoAPI(headers?:Record<string,string>){
    return http({
        url:`/infos/gain`,
        method:'GET',
        headers:{
        ...headers//合并传入的请求头
        }
    })
}


//搜索框搜索关键字API
export function searchPostAPI(keyword:string){
    return http({
        url:'/infos/search',
        method:'GET',
        params:{
            keyword
        }        
    })
}