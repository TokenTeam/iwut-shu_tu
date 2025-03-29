//表单相关状态管理
import { defineStore } from "pinia";
import type { FormDataType } from "@/types";
import { submitBookInfoAPI } from "@/apis/seller";
import { getBookInfoAPI,searchPostAPI } from "@/apis/home";
import { getUserPostAPI,offPostAPI } from "@/apis/manage";
export const useFormStore=defineStore('form',{
    state:()=>({
        formData:{} as FormDataType,//初始化表单数据为空对象
        formDataList:[] as FormDataType[],//表单数组
        getError:null as string|null,//获取表单数组时的错误信息
        isSubmitting:false,//表示表单是否正在提交中
        submitError:null as string |null,//提交表单时的错误信息
        isSearching:false as boolean,//表示搜索框是否正在搜索
    }),
    actions:{

        //发帖界面提交表单操作
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

        //主页面获取帖子操作
        async getFormList(isRefresh:boolean =false){
            //搜索时无法获取帖子
            if(this.isSearching){
                return
            }
            this.getError=null;
            try {
                //添加请求头用来判断是否清空后端缓存重新获取额定数量帖子
                const headers =isRefresh?{'X-Refresh':'true'}:undefined

                const response =await getBookInfoAPI(headers)

                console.log('aaaa',response);
                isRefresh?this.formDataList.splice(0,this.formDataList.length,...response.data.data):this.formDataList.push(...(response.data.data))
                
                if(response.data.code==='0000'){
                    console.log(response.data.msg);
                }
            } catch (error:any) {
                this.getError=error.message
                console.log('获取表单失败',error.response.data.msg);
            }
        },

        //帖子管理页面获取用户帖子操作
        async getUserPosts(){
            try {
                const response =await getUserPostAPI()
                if(response.data.code==='0000'){
                    console.log(response.data.msg);
                    this.formDataList=response.data.data
                }
            } catch (error:any) {
                this.getError=error.message
                console.log('获取用户帖子失败',error.response.data.msg);
            }
        },

        //下架用户指定帖子操作
        async offUserPost(postId:string){
            try {
                const response = await offPostAPI(postId)
                if(response.data.code==='0000'){
                    console.log(response.data.msg);
                }
       
            } catch (error:any) {
                console.log('下架用户帖子失败',error);
            }
        },

        //搜索指定帖子
        async searchPost(keyword:string){
            this.isSearching=true
            try {
                const response =await searchPostAPI(keyword)
                console.log(response);
                if(response.data.code==='0000'){
                    this.formDataList=response.data.data
                }
                if(response.data.code==='1005'){
                    this.isSearching=false
                    //输入框为空时重新获取4条帖子
                    this.getFormList(true)
                }
            } catch (error) {
                console.log('搜索失败',error);
            }
        },

        //清空formDataList
        clearFormDataList(){
            this.formDataList=[]
        }
    }
})