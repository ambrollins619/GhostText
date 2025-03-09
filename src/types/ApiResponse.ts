import { Message } from "@/model/User";

export interface ApiResponse{
    success: boolean; // This is a common convention for api responsess
    message: string; // To have success and a message as the parameters
    isAcceptingMessages?: boolean;
    messages?: Array<Message>
}