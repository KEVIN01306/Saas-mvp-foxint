import express from 'express';
import cors from 'cors'
import routes from './routes/index.routes.js';

const app = express()

app.use(cors({ credentials: true }))

// Increase body size limits to accept base64 image payloads (adjust if needed)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(routes)


export default app;
