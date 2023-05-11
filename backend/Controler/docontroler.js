const ToDo = require("../Model/Todomodel")

const getToDo=async(req,res)=>{
    const toDo =await ToDo.find()
    res.json(toDo)
}


const SavetoDo=async(req,res)=>{
    const {text}=req.body
    const toDo=await ToDo.create({text})
    res.json({msg:'add succesfully..',toDo})

}

const updateToDo=async(req,res)=>{
    const _id=req.params.id
    const{text}=req.body
    const Update=await ToDo.findByIdAndUpdate(_id,{text})
   Update ? res.json({msg:'updated toDo',toDo:Update}) : res.json("Error")
}


const deletetoDo=async(req,res)=>{
   
    const _id=req.params.id

    const deleted =await ToDo.findByIdAndRemove(_id)
    deleted ? res.json({msg:'delete toDo',deletedtoDo:deleted}) : res.json("Error")
}
module.exports={getToDo,SavetoDo,updateToDo,deletetoDo}