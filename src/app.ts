import express, { Application, Request, Response } from "express";
import cors from "cors";

import router from "./routes";
import { errorHandler } from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";

const app: Application = express();

// parsers
// app.use(express.json());
// app.use(cors());

// parsers
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://petmate-frontend-self.vercel.app", // আপনার ফ্রন্টএন্ডের লাইভ ডোমেইন

      "https://petmate-frontend-i0yoicxp4-amitsengupta332s-projects.vercel.app",
    ],
    credentials: true,
  }),
);

// application routes
app.use("/api/v1", router);
// app.use('/api/v1', router);

app.get("/", (req: Request, res: Response) => {
  res.send("Pet server!!");
});

app.use(errorHandler);
app.use(notFound);

export default app;
