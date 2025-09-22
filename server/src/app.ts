import cors from "cors";
import express from "express";
import objectsRouter from "./routes/objects";
import polygonsRouter from "./routes/polygons";

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // my frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/polygons", polygonsRouter);
app.use("/api/objects", objectsRouter);

export default app;
