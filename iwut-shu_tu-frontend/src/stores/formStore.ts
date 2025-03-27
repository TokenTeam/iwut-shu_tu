import { defineStore } from "pinia";
import type { FormDataType } from "@/types";
import { submitBookInfoAPI } from "@/apis/seller";
import { getBookInfoAPI } from "@/apis/home";
import { useRouter } from "vue-router";

export const useFormStore=defineStore('form',{
    state:()=>({
        formData:{} as FormDataType,//初始化表单数据为空对象
        formDataList:[] as FormDataType[],//表单数组
        isGetting:false,//表示睡是否在获取
        getError:null as string|null,//获取表单数组时的错误信息
        isSubmitting:false,//表示表单是否正在提交中
        submitError:null as string |null,//提交表单时的错误信息
        hasFetched:false//用于判断是否已经获取过表单数据以避免再次获取
    }),
    actions:{
        async submitForm(){
            this.isSubmitting=true;
            this.submitError=null;
            try{
                const response =await submitBookInfoAPI(this.formData)
                console.log(response);
                if(response.data.code==='0000'){
                setTimeout(() => {  
                    window.location.replace('/')
                }, 500);
            }
            }catch(error:any){
                console.log(error.response);
                this.submitError=error.message;
                console.error('表单提交失败',error.response.data.msg);
            }finally{
                this.isSubmitting=false
            }
        },
        async getFormList(){
            if(this.hasFetched) return;
            this.isGetting=true;
            this.getError=null;
            try {
                const response =await getBookInfoAPI()
                this.formDataList.push(...(response.data.data))
                if(response.data.code==='0000'){
                    console.log(response.data.msg);
                    this.hasFetched=true
                }
            } catch (error:any) {
                this.getError=error.message
                console.log('获取表单失败',error.response.data.msg);
            }finally{
                this.isGetting=false
            }
        }
        //...
    }
})