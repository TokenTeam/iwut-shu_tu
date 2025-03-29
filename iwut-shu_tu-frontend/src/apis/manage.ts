import { http } from "@/utils";

//获取该用户的帖子
export function getUserPostAPI(){
    return http({
        url:'/infos/user',
        method:'GET',
    })
}

//下架用户指定帖子
export function offPostAPI(postId:string){
    return http({
        url:`/infos/off?postId=${postId}`,
        method:'GET'
    })
}