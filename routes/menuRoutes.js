const express=require("express")
const menu=require("./../models/menu");
const router=express.Router()
router.get("/menu",async(req,res)=>{
    try{
      const data=await menu.find()
      res.send(data)
    }
    catch(err){
      console.log(err)
    }
    })
    
   
      module.exports=router;