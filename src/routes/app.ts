import express from 'express';
import snippetsRouter from './snippets';

const app = express();

app.use(express.json());
app.use('/snippets', snippetsRouter);

export default app;