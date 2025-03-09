import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}



async function dbConnect(): Promise<void>{
    if(connection.isConnected) {
        console.log("Already connected to database")
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '') 
        //other options can also be provided during making a connection
        connection.isConnected = db.connections[0].readyState

        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("my mongodb uri: ",process.env.MONGODB_URI)
        console.log("Database connection failed", error)

        process.exit()
    }
}

export default dbConnect;