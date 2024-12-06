const mangoose=require('mongoose');

const menuSchema=new mangoose.Schema({
    name:{
        type:String,
        required:true
    }
})
 const menu=mangoose.model('menu',menuSchema)
 module.exports=menu