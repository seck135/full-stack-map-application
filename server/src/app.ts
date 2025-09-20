import express from "express";
import polygonsRouter from "./routes/polygons";
import objectsRouter from "./routes/objects";

const app = express();

// כדי ש־Express ידע לפרסר JSON
app.use(express.json());

// חיבור ה־routes
app.use("/api/polygons", polygonsRouter);
app.use("/api/objects", objectsRouter);

export default app;
