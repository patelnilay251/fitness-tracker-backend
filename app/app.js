import express from 'express';
import mongoose from 'mongoose';
import route from './routes/index.js';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

route(app);

let uri='mongodb://127.0.0.1/FitnessTracker'

mongoose.connect(uri);

export default app;