import { http } from "@/utils";

//获取该用户的帖子
export function getUserPostAPI(){
    return http({
        url:'/infos/user',
        method:'GET',
    })
}