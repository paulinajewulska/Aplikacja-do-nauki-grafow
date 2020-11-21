import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { db, CategoryDoc } from '../models';

const Category: mongoose.Model<CategoryDoc> = db.category;

const getCategories = (req: Request, res: Response): void => {
    Category.find()
        .select('-lessons')
        .then(categories => res.json(categories))
        .catch(err => res.status(400).send(`Categories don't exist - ${err}`));
};

const getLessonsInCategory = (req: Request, res: Response): void => {
    const category = req.params.category;
    if (category) {
        Category.find({ url: category.toLowerCase() })
            .select(['lessons.name', 'lessons.url'])
            .then(categories => res.json(categories))
            .catch(err => res.status(400).send(`Lessons don't exist. - ${err}`));
    } else {
        res.status(400).send("Lessons doesn't exist.");
    }
};

export { getCategories, getLessonsInCategory };
