require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
import 'ts-mongoose/plugin';
import { Request, Response } from 'express';

const port = process.env.PORT || 4040;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
mongoose.set('useCreateIndex', true);

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello ;)" });
});

try {
    app.listen(port, () => console.log(`Server listening at port ${port}`));
} catch(err) { console.log(err);}