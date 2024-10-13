import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb://localhost:27017/tms';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const itemSchema = new mongoose.Schema({
    subject: String,
    faculty: String,
    schedule: Array,
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`);
})