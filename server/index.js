import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

// initialize app
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// adding prefix to the url, only going to reach 'localhost:5000/posts'
app.use('/posts', postRoutes);

const CONNECTION_URL = 'mongodb+srv://admin:admin123@cluster0.ak87d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

// this returns a promise
mongoose.connect(CONNECTION_URL/*, { useNewUrlParser: true, useUnifiedTopology: true }*/)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));