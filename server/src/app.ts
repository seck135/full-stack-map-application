import express from "express";
import polygonsRouter from "./routes/polygons";
import objectsRouter from "./routes/objects";

const app = express();
app.use(express.json());

// חיבור ה-Routes
app.use("/api/polygons", polygonsRouter);
app.use("/api/objects", objectsRouter);

export default app;
