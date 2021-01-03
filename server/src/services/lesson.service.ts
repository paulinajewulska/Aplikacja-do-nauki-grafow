import * as mongoose from 'mongoose';
import { db, CategoryDoc } from '../models';

const Category: mongoose.Model<CategoryDoc> = db.category;

const getAllCategories = async () => {
    try {
        return await Category.find().select('-lessons');
    } catch (err) {
        throw err;
    }
};

const getLessonsNameUrl = async (category: string) => {
    try {
        return await Category.find({ url: category.toLowerCase() }).select(['lessons.name', 'lessons.url']);
    } catch (err) {
        throw err;
    }
};

const getLessonsAll = async (category: string) => {
    try {
        return await Category.find({ url: category.toLowerCase() }).select([
            'lessons.url',
            'lessons.description',
            'lessons.pseudocode',
            'lessons.tip',
            'lessons.requireSelectedVertex'
        ]);
    } catch (err) {
        throw err;
    }
};

export { getAllCategories, getLessonsNameUrl, getLessonsAll };
