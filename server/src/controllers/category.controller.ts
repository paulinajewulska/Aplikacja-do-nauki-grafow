import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { db, CategoryDoc } from '../models';
import { getGraphFun } from '../algorythms/connectionMap';
import { Graph } from '../algorythms/Graph/Graph';

const Category: mongoose.Model<CategoryDoc> = db.category;

// TODO: refactor
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
            .then(lessons => res.json(lessons))
            .catch(err => res.status(400).send(`Lessons don't exist. - ${err}`));
    } else {
        res.status(400).send("Lessons don't exist.");
    }
};

const getLesson = (req: Request, res: Response): void => {
    const category = req.params.category;
    const lesson = req.params.lesson;

    if (category && lesson) {
        Category.find({ url: category.toLowerCase() })
            .select(['lessons.url', 'lessons.description', 'lessons.pseudocode', 'lessons.tip'])
            .then(lessons => {
                res.json(lessons[0].lessons.find(ls => ls.url === lesson));
            })
            .catch(err => res.status(400).send(`Lesson doesn't exist. - ${err}`));
    } else {
        res.status(400).send("Lesson doesn't exist.");
    }
};

const getLessonSolution = (req: Request, res: Response): void => {
    const { vertexes, category, lesson } = req.body;
    try {
        const graphFun: (Graph) => any = getGraphFun(category, lesson);
        const result: number | boolean = graphFun(new Graph(vertexes));
        res.json({ result });
    } catch (err) {
        res.status(400).send(err);
    }
};

export { getCategories, getLessonsInCategory, getLesson, getLessonSolution };
