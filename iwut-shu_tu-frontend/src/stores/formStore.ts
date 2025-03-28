//表单相关状态管理
import { defineStore } from "pinia";
import type { FormDataType } from "@/types";
import { submitBookInfoAPI } from "@/apis/seller";
import { getBookInfoAPI } from "@/apis/home";

export const useFormStore=defineStore('form',{
    state:()=>({
        formData:{} as FormDataType,//初始化表单数据为空对象
        formDataList:[] as FormDataType[],//表单数组
        getError:null as string|null,//获取表单数组时的错误信息
        isSubmitting:false,//表示表单是否正在提交中
        submitError:null as string |null,//提交表单时的错误信息
        hasFetched:false,//用于判断是否已经获取过表单数据以避免再次获取（避免多次渲染）
    }),
    actions:{

        //提交表单
        async submitForm(){
            this.isSubmitting=true;
            this.submitError=null;
            try{
                const response =await submitBookInfoAPI(this.formData)
                if(response.data.code==='0000'){
                setTimeout(() => {  
                    window.location.replace('/')
                }, 500);
            }else{
                throw new Error(response.data.msg || '提交失败');
            }
            }catch(error:any){
                console.log(error);
                this.submitError=error.message;
                console.error('表单提交失败');
            }finally{
                this.isSubmitting=false
            }
        },
        //刷新网页获取初始帖子
        async getFormList(isRefresh:boolean =false){
            if(this.hasFetched) return;
            this.getError=null;
            try {
                //添加请求头用来判断是否清空后端缓存重新获取额定数量帖子
                const headers =isRefresh?{'X-Refresh':'true'}:undefined

                const response =await getBookInfoAPI(headers)

                isRefresh?this.formDataList.splice(0,this.formDataList.length,...response.data.data):this.formDataList.push(...(response.data.data))
                
                console.log('bbbb',this.formDataList);
                if(response.data.code==='0000'){
                    console.log(response.data.msg);
                    this.hasFetched=true
                }
            } catch (error:any) {
                this.getError=error.message
                console.log('获取表单失败',error.response.data.msg);
            }
        },
    }
})