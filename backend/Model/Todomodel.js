const mongoose=require('mongoose')

const TodoSchema= mongoose.Schema({
    text:{
        type:String,
        require:true
    }
})

const ToDo=mongoose.model("ToDo",TodoSchema)

module.exports=ToDo