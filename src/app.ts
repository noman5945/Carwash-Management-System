import express, { Application, Request, Response } from "express";
import cors from "cors";
import routes from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Carwash-management site backend Running");
});

app.use(globalErrorHandler);

app.all("*", (req: Request, res: Response) => {
  res.status(400).send({
    succsess: false,
    message: "Route not found",
  });
});

export default app;
