import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mygeodb"; // שנה לפי הצורך

// חיבור ל-MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected");

        // הרצת השרת
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    });
