import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { db, CategoryDoc } from "../models";
const Category: mongoose.Model<CategoryDoc> = db.category;

const getAllCategories = (req: Request, res: Response) => {

    Category.find()
        .then(categories =>   res.json(categories))
        .catch(err => res.status(400).send("Categories don't exits"));
}

export {getAllCategories};