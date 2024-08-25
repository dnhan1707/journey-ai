import express from "express";
import {GoogleGenerativeAI} from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router(); 

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error("API key is not defined. Please set it in the .env file.");
}


const genAI = new GoogleGenerativeAI(API_KEY);


const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {responseMimeType: "application/json"}
});


router.post("/gemini_response", async (req, res) => {
    try {
        const { prompt } = req.body; // Correctly destructure the prompt
        console.log("PROMPT:  ");
        console.log(prompt);

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        if(!text){
            console.log("No response")
        }

        if(!prompt){
            console.log("No prompt")
        }

        res.json({ message: text });
        console.log("GEMINI API got triggered");


    } catch (error) {
        console.error('Error fetching data from Generative AI:', error);
        throw error;
    }
});


export default router;
