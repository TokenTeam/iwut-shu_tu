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
const cache ={};//简单的内存缓存（以后可以替换成Redis）
const u_id=0;//用户标识先用着用于标识获取该用户已获取的帖子
//获取帖子
router.get('/infos/gain',async(req,res)=>{
try {

    //判断请求头是否需要清空缓存
    const isRefresh =req.headers['x-refresh']==='true'
    if(isRefresh){
        cache[u_id]=[]//清空缓存
    }

    const limit =4;//一次最多查询5条

    //获取该用户已经获取的帖子ID
    const existingIds =cache[u_id]||[]

    //构建查询条件，排除已获取的帖子如果existingIds不为空，则使用$nin操作符过滤掉这些帖子;否则，查询所有帖子
    const query = existingIds.length>0?{_id:{$nin:existingIds}}:{};
    //计算符合条件的帖子总数
    const totalCount =await BookBarModel.countDocuments(query)

    if(totalCount === 0){
        return res.json({
            code:"0002",
            msg:'没有更多帖子了',
            data:[]
        })
    }
  
    let randomSkip =0
    if(totalCount-limit+1>0){
        //获取0-totalCount-limit的偏移数确保能够获取limit条帖子
    randomSkip = Math.floor(Math.random() * (totalCount - limit + 1));
    }
    //若已经不足5条则不进入条件判断randomSkip=0获取剩下的所有帖子


    //从数据库中随机获取符合条件的帖子
    const posts =await BookBarModel.find(query).skip(randomSkip).limit(limit).exec();
    console.log(posts);
    //更新缓存中的已获得帖子ID
    const newIds =posts.map(post=>post._id)
    cache[u_id]=existingIds.concat(newIds)

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
