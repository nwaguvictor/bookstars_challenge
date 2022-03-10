import express, { Request, Response, Application } from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();

app.get('/ping', (req: Request, res: Response) => {
  res.json({
    message: 'Testing Bookstars heartbeat',
  });
});

/** Middlewares */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Create server */
const server = http.createServer(app);
const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`::> Application running on port: ${port}`);
});
