import { Request, Response } from 'express';
import { getGraphFun } from '../algorithms/connectionMap';
import { Graph } from '../algorithms/Graph/Graph';
import { getAllCategories, getLessonsAll, getLessonsNameUrl } from '../services/lesson.service';

const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await getAllCategories();
        res.json(categories);
    } catch (err) {
        res.status(400).send(`Categories don't exist - ${err}`);
    }
};

const getLessonsInCategory = async (req: Request, res: Response) => {
    const category = req.params.category;
    try {
        const lessons = await getLessonsNameUrl(category);
        res.json(lessons);
    } catch (err) {
        res.status(400).send(`Lessons don't exist. - ${err}`);
    }
};

const getLesson = async (req: Request, res: Response) => {
    const category = req.params.category;
    const lesson = req.params.lesson;
    try {
        const lessons = await getLessonsAll(category);
        res.json(lessons[0].lessons.find(ls => ls.url === lesson));
    } catch (err) {
        res.status(400).send(`Lesson doesn't exist. - ${err}`);
    }
};

const getSolution = (req: Request, res: Response): void => {
    const { vertexes, category, lesson, selectedVertex = null, isDirected = false } = req.body;

    const { graphFun, graphFunString } = getGraphFun(category, lesson);
    try {
        let result: number | boolean | string;
        if (selectedVertex != null) {
            result = graphFun(new Graph(vertexes, isDirected), selectedVertex);
        } else {
            result = graphFun(new Graph(vertexes, isDirected));
        }
        result = graphFunString ? `${graphFunString} ${result}.` : result;
        res.json({ result });
    } catch (err) {
        res.status(400).send(err);
    }
};
export { getCategories, getLessonsInCategory, getLesson, getSolution };
