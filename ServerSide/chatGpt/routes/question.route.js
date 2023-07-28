const express=require("express")
const questionRouter=express.Router()
const {QuestionModel}=require("../model/questions.model")

questionRouter.post("/add",async(req,res)=>{
    try {
        const question=new QuestionModel(req.body)
        await question.save()
        res.send("Question added")
    } catch (error) {
        res.status(400).send(error)
    }
})

questionRouter.get("/",async(req,res)=>{
    try {
        const questions=await QuestionModel.find()
        res.send(questions)
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports={questionRouter}