import express from 'express';
import cors from 'cors';
import snippetsRouter from './snippets';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/snippets', snippetsRouter);

export default app;