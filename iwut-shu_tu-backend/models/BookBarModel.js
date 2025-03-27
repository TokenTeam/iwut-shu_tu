const mongoose=require('mongoose')

//卖书帖子Model

const BookBarSchema=new mongoose.Schema({
   
    //标题
    title:{
        type:String,
        required:true,
        trim:true
    },
    //帖子内容
    content:{
        type:String,
        required:true,
    },
    //书名
    book:{
        type:String,
        required:true
    },
    //ISBN(标识唯一)
    isbn:{
        type:String,
        // required:true
        unique:true,
        sparse:true,//允许多个空值
    },

    //书籍图片
    imagePic:[{
        i_name:{
            type:String
        },
        i_type:{
            type:String
        },
        i_url:{
            type:String
        },

    }],

    //价格
    price:{
        type:Number,
        required:true,
    },

    //书籍大类分类
    classification:{
        type:String,
        required:true
    },

    //tag
    /* tags:[{
        type:String,
    }], */

    //卖家昵称
    /* sellerNick:{
        type:String
    }, */

    //卖家联系方式
    /* contact:{
        type:String,
        required:true
    }, */

    //帖子状态：0-上架，1-下架,-1-待定
   /*  b_status:{
        type:Number,
        enum:[0,1],
        default:-1,
    },
 */
    //帖子创建时间
    createdAt:{
        type:Date,
        default:Date.now,
    },

    //更新时间
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

//设置更新时间字段为每次更新文档时自动更新
BookBarSchema.pre('save',function(next){
    this.updatedAt=Date.now(),
    next()
})

//创建模型
const BookBarModel=mongoose.model('bookbar',BookBarSchema)

module.exports=BookBarModel