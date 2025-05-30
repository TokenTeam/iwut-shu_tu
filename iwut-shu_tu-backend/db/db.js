module.exports=function(success,error){
    if(typeof error!='function'){
        error=()=>{
            console.log('连接数据库失败');
        }
    }
    
    const mongoose =require('mongoose')

    const {DBHOST,DBNAME,DBPORT}=require('../config/config')

    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

    mongoose.connection.once('open',()=>{
        success()
    })

    mongoose.connection.on('error',()=>{
        error()
    })

    mongoose.connection.on('close',()=>{
        console.log('连接关闭');
    })
}