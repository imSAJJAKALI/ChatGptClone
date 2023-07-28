const mongoose=require("mongoose")
const questionSchema=mongoose.Schema({
    Question:{
        type:String,
        required:true
    },
    id:{
        type:Number,
        required:true
    }
})
const QuestionModel=mongoose.model("question",questionSchema)

module.exports={QuestionModel}