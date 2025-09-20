import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

// חיבור ל־MongoDB והפעלת השרת
async function startServer() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`🚀 Server is running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to connect to MongoDB:", err);
        process.exit(1);
    }
}

startServer();
