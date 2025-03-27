import { http } from "@/utils";

//获取帖子API
export function getBookInfoAPI(page:number){
    return http({
        url:`/infos/gain?page=${page||1}`,
        method:'GET',
    })
}