import express from "express";
import polygonsRouter from "./routes/polygons";
import objectsRouter from "./routes/objects";

const app = express();

// This middleware is responsible for parsing incoming request bodies with a JSON payload
app.use(express.json());

// routes
app.use("/api/polygons", polygonsRouter);
app.use("/api/objects", objectsRouter);

export default app;