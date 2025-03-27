const express =require('express')
const BookBarModel =require('../models/BookBarModel')
const router =express.Router()

//发布帖子
router.post('/info/submission',async(req,res)=>{
    try {
        //处理数据
        const price = Number(req.body.price)

        const {title,content,book,isbn,photo,classification}=req.body
        //如果ISBN是空字符串，则删除该字段
        const santiizedIsbn =isbn && isbn.trim()!=="" ?isbn :undefined

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
            isbn:santiizedIsbn,
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
        console.log(error);
        return res.json({
            code:'1000',
            msg:'提交表单失败',
            data:null
        })
    }
})

//获取帖子
router.get('/infos/gain',async(req,res)=>{
try {
    // const dataArray=[]
    // const dataSize=5
    //使用游标
    // const bookbarInfo= BookBarModel.find().cursor()
    // for await(const info of bookbarInfo){
    //     dataArray.push(info)
    //     if(dataArray.length===dataSize){
    //         break;
    //     }
    // }  

    //使用分页查询
    const page = parseInt(req.query.page)|| 1;
    const limit =5;//一次最多查询5条
    const offset =(page-1)*limit//偏移量

    const posts =await BookBarModel.find().skip(offset).limit(limit).exec();
    console.log(posts)
    res.json({
        code:'0000',
        msg:'获取bookbar成功',
        data:posts
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