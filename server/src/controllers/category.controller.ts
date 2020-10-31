import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { db, CategoryDoc } from "../models";
const Category: mongoose.Model<CategoryDoc> = db.category;

const getAllCategories = (req: Request, res: Response) => {
    Category.find().select('-topics')
        .then(categories =>   res.json(categories))
        .catch(err => res.status(400).send("Categories don't exist"));
}

const getAllTopicsInCategory = (req: Request, res: Response) => {
    const category = req.params.category;
    if(category) {
        Category.find({url: category.toLowerCase()}).select('topics')
            .then(categories =>   res.json(categories))
            .catch(err => res.status(400).send("Categories don't exist."));
    } else {
        res.status(400).send("Category doesn't exist.")
    }
}

export {getAllCategories, getAllTopicsInCategory};