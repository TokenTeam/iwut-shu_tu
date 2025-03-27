import { http } from "@/utils";
import type { FormDataType } from "@/types";
export function submitBookInfoAPI(formData:FormDataType){
    return http({
        url:'/info/submission',
        method:'POST',
        data:formData
    })
}