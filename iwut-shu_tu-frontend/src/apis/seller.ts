import { http } from "@/utils";
import type { FormDataType } from "@/types";

//提交表单API
export function submitBookInfoAPI(formData:FormDataType){
    return http({
        url:'/info/submission',
        method:'POST',
        data:formData
    })
}