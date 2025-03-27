const express =require('express')
const BookBarModel =require('../models/BookBarModel')
const router =express.Router()

router.post('/info/submission',async(req,res)=>{
    try {
        //处理数据
        const price = Number(req.body.price)

        const {title,content,book,isbn,photo,classification}=req.body
        const imagePic =photo.map(item=>({
            i_name:item.name,
            i_type:item.type,
            i_url:item.url.url
        }))
        // console.log(title,content,book,isbn,photo,classification,price);
        const result =await BookBarModel.create({
            title,
            content,
            book,
            isbn,
            price,
            imagePic,
            classification
        })
        console.log('aaa',result);
        res.json({
            code:'0000',
            msg:'提交表单成功',
            data:result
        })
    } catch (error) {
        return res.json({
            code:'1000',
            msg:'提交表单失败',
            data:null
        })
    }
})

router.get('/infos/gain',async(req,res)=>{

try {
    const dataArray=[]
    const dataSize=5
    //使用游标
    const bookbarInfo= BookBarModel.find().cursor()
    for await(const info of bookbarInfo){
        dataArray.push(info)
        if(dataArray.length===dataSize){
            break;
        }
    }  
    console.log(dataArray)
    res.json({
        code:'0000',
        msg:'获取5条bookbar成功',
        data:dataArray
    })
} catch (error) {
    return res.json({
        code:'1001',
        msg:'获取bookbar失败',
        data:null
    })
}


})

module.exports=router