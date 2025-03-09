import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-pro"; // Update model name if needed
const API_KEY = process.env.GEMINI_API_KEY; // Ensure API key is set

if(!API_KEY){
    throw new Error( "Your api key is missing" );
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!Array.isArray(messages)) {
            throw new Error("Invalid messages format. Expected an array.");
        }

        // Convert messages to Gemini's expected format
        const formattedMessages = messages.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }] // Correct structure
        }));

        // Create a chat session
        const chatSession = model.startChat({
            generationConfig: {}, // Add configs if needed
            history: formattedMessages,
        });

        // Generate a response
        const result = await chatSession.sendMessage(
            "Generate three open-ended questions."
        );

        // Ensure response is valid
        if (!result.response || !result.response.text) {
            throw new Error("Invalid response from Gemini API.");
        }

        return NextResponse.json({ questions: result.response.text });
    } catch (error) {
        console.error("Gemini API error:", error);
        return NextResponse.json(
            { error: (error as Error).message || "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
