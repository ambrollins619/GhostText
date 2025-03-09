import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
    console.log("API Key:", process.env.RESEND_API_KEY);
    throw new Error("Missing RESEND_API_KEY in environment variables");
}

export const resend = new Resend(process.env.RESEND_API_KEY);
// intializes a new instance Resend which is used to send
// Emails for verification