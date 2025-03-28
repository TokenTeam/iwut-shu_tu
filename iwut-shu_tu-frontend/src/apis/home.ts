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