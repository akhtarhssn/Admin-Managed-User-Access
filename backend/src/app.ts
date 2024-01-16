/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";

const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hero Academy Server</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }
      .container {
        width: 1024px;
        height: 80vh;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
        text-align: center;
      }
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        margin: 10px 0;
        display: flex;
        gap: 1.5rem;
      }
      a {
        text-decoration: none;
        color: #007BFF;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome <br /> Webyapar Solutions</h1>
      <p>Who do we have here? 😊😊</p>
    </div>
  </body>
  </html>`);
});

// global error handler
app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
