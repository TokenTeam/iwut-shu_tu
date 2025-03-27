import { http } from "@/utils";

export function getBookInfoAPI(){
    return http({
        url:'/infos/gain',
        method:'GET',
    })
}