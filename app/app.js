import express from 'express';
import mongoose from 'mongoose';
import route from './routes/index.js';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

route(app);

let uri='mongodb+srv://Nilay:NilayPassword@cluster0.jr8js.mongodb.net/FitnessTracker'

mongoose.connect(uri);

export default app;