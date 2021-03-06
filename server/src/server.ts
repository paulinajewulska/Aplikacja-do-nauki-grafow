require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
import 'ts-mongoose/plugin';
import { Request, Response } from 'express';

const port = process.env.PORT || 4040;
const connectionString = process.env.MONGODB;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
mongoose.set('useCreateIndex', true);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello ;)' });
});

const categoryRoutes = require('./routes/category.route');
app.use(categoryRoutes);

mongoose
    .connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        app.listen(port, () => console.log(`Server listening at port ${port}`));
    })
    .catch((err: Error) => {
        console.log(err);
    });
