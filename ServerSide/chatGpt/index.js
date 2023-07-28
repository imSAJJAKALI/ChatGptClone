// import {config} from "dotenv"
const express=require("express")
const cors=require("cors")
const app=express()
const {connection}=require("./db")
const {apiRouter}=require("./routes/api.route")
const {questionRouter}=require("./routes/question.route")

const dotenv=require("dotenv")
const {Configuration, OpenAIApi}=require("openai")
const readline=require("readline")

dotenv.config()
app.use(express.json())
app.use(cors())
app.use("/question",questionRouter)
app.use("/api",apiRouter)

// const openai=new OpenAIApi(new Configuration({
//     apiKey:process.env.API_Key
// }))

// const userInterface=readline.createInterface({
//     input:process.stdin,
//     output:process.stdout
// })
// userInterface.prompt();

// userInterface.on("line",async input=>{
//    const res = await openai.createChatCompletion({
//         model:"gpt-3.5-turbo",
//         messages:[{role:"user",content:input}]
//     })
//     console.log(res.data.choices[0].message.content)
//     userInterface.prompt()
// })

// openai.createChatCompletion({
//     model:"gpt-3.5-turbo",
//     messages:[{role:"user",content:"Hello ChatGPT"}]
// }).then(res=>{
//     console.log(res.data.choices[0].message.content)
// })
// app.post("/chat",async(req,res)=>{
//     try {
//         const { message } = req.body;
//         const response = await openai.createChatCompletion({
//             model: "gpt-3.5-turbo",
//             messages: [{ role: "user", content: message }],
//         });
//         res.status(200).json({ answer: response.data.choices[0].message.content });
//     } catch (error) {
//         res.status(500).json({ error: "Something went wrong." });
//     }
// })

// app.post("/interview", async (req, res) => {
//     try {
//         const conversationHistory = req.body.conversation || [];
//         const userMessage = req.body.message;

//         if (userMessage === "start the interview") {
//             // Start the interview by asking the first question
//             conversationHistory.push({ role: "system", content: "Welcome to the interview! Let's get started. What is Node.js, and how does it differ from traditional server-side technologies?" });
//         } else if (userMessage === "stop the interview") {
//             // End the interview when the candidate says "stop the interview"
//             // Optionally, you can provide a closing message
//             conversationHistory.push({ role: "system", content: "Thank you for participating in the interview. The interview has ended." });
//         } else {
//             // Process candidate's response using the GPT-3.5 API
            
//             conversationHistory.push({ role: "user", content: userMessage });
//             const response = await openai.createChatCompletion({
//                 model: "gpt-3.5-turbo",
//                 messages: conversationHistory,
//             });

//             // Extract the assistant's reply, which includes feedback and score
//             const assistantReply = response.data.choices[0].message.content;
//             conversationHistory.push({ role: "assistant", content: assistantReply });
//         }

//         res.status(200).json({ conversation: conversationHistory });
//     } catch (error) {
//         res.status(500).json({ error: "Something went wrong." });
//     }
// });

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to db")
        console.log("Server is running")
    } catch (error) {
        console.log(error)
    } 
})
