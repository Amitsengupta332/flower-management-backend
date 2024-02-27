import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
import router from './app/routes';
import cookieParser from 'cookie-parser';

//Parser
app.use(express.json());

app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send(' assignment 4 running');
});

export default app;
