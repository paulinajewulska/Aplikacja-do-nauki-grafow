import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { db, CategoryDoc } from '../models';
const Category: mongoose.Model<CategoryDoc> = db.category;

const getAllCategories = (req: Request, res: Response): void => {
    Category.find()
        .select('-topics')
        .then(categories => res.json(categories))
        .catch(err => res.status(400).send(`Categories don't exist - ${err}`));
};

const getAllTopicsInCategory = (req: Request, res: Response): void => {
    const category = req.params.category;
    if (category) {
        Category.find({ url: category.toLowerCase() })
            .select('topics')
            .then(categories => res.json(categories))
            .catch(err => res.status(400).send(`Categories don't exist. - ${err}`));
    } else {
        res.status(400).send("Category doesn't exist.");
    }
};

export { getAllCategories, getAllTopicsInCategory };
