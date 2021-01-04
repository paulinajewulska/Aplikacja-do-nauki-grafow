const express = require('express');
const router = express.Router();
import { getCategories, getLessonsInCategory, getLesson, getSolution } from '../controllers/category.controller';

router.get('/app/categories/:category/:lesson', getLesson);
router.post('/app/categories/:category/:lesson', getSolution);
router.get('/app/categories/:category', getLessonsInCategory);
router.get('/app/categories', getCategories);

module.exports = router;
