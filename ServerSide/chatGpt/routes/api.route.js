const express=require("express")
const apiRouter=express.Router()
const {Configuration, OpenAIApi}=require("openai")
const readline=require("readline")
const {QuestionModel}=require("../model/questions.model")
const natural = require('natural');

const openai=new OpenAIApi(new Configuration({
    apiKey:process.env.API_Key
}))

apiRouter.get("/Questions",async(req,res)=>{
    try {
        // const { message } = req.body;
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Ask me one interview question on Nodejs, I need only question" }],
        });
        res.status(200).json({ Question: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong." });
    }
})

apiRouter.post("/chat/new",(req,res)=>{
    let question=req.body.question || 'How to use chatgpt?'
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${question}`,
        max_tokens: 4000,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      }).then(response=>{
        return response?.data?.choices?.[0].text;
      }).then((ans)=>{
        const arr=ans?.split("\n").filter(ele=>ele).map(value=>value.trim());
        return arr;
      })
      .then(response=>{
        res.json({
            answer:response,
            prompt:question
        })        
    })
})



// Function to generate a response using the model
async function generateResponse(prompt, userAnswer) {
    const messages = [
        { role: "user", content: prompt },
        { role: "assistant", content: userAnswer }
    ];

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
    });

    return response.data.choices[0].message.content.trim();
}

function calculateLevenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0) {
                dp[i][j] = j;
            } else if (j === 0) {
                dp[i][j] = i;
            } else if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }

    return dp[m][n];
}

// Function to score the user's answer based on Levenshtein distance
function scoreAnswer(userAnswer, expectedAnswer) {
    const similarityThreshold = 3; // Adjust this threshold based on your requirements

    const distance = calculateLevenshteinDistance(userAnswer, expectedAnswer);
    let score = 10 - Math.min(distance, similarityThreshold); // Map the distance to a scale of 1 to 10

    if (score < 1) {
        score = 1;
    }

    return score;
}
// const expectedAnswer = "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.";
// const userAnswer = "Node.js is a JavaScript runtime that uses the V8 engine.";

// const evaluation = scoreAnswer(userAnswer, expectedAnswer);

// console.log(`Score: ${evaluation.score}`);

// apiRouter.post("/dummt/test",(req,res)=>{
//     const {userAnswer, expectedAnswer}=req.body
//     console.log(userAnswer,expectedAnswer)
//     try {
//         const ans=scoreAnswer(userAnswer, expectedAnswer)
//         console.log(ans)
//         res.status(200).send(ans)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

 const randomNum = Math.floor(Math.random() * 10) + 1;
apiRouter.get("/get/Question",async(req,res)=>{
    try {
        const interviewQuestion = await QuestionModel.findOne({id:randomNum});
        res.send(interviewQuestion.Question)
    } catch (error) {
       res.status(400).send(error) 
    }
})

apiRouter.post("/trial", async (req, res) => {
    const userAnswer = req.body.userAnswer; // Access the user's answer from the query parameter
    try {
         const interviewQuestion = await QuestionModel.findOne({id:randomNum});
         console.log(interviewQuestion.Question)

        // You should get the user's answer from your front-end or wherever it is provided by the user.

        const response = await generateResponse(interviewQuestion.Question, userAnswer);
        // console.log(response)
        // Score the user's answer
        const score = scoreAnswer(userAnswer, response);
        // console.log(score)

        // Provide feedback based on the score
        let feedback;
        if (score >= 7) {
            feedback = "Great job! Your answer is correct.";
        } else if (score >= 4) {
            feedback = "Your answer is partially correct.";
        } else {
            feedback = "Your answer is incorrect.";
        }

        res.status(200).json({
            Question: interviewQuestion.Question,
            UserAnswer: userAnswer,
            RequiredAns: response,
            Score: score,
            Feedback: feedback,
        });
    } catch (error) {
        res.status(500).json({ error: error});
    }
});
module.exports={apiRouter}