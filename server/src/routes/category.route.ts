const express = require('express');
const router = express.Router();

import { getCategories, getLessonsInCategory, getLesson } from '../controllers/category.controller';

router.get('/app/categories/:category/:lesson', getLesson);
router.get('/app/categories/:category', getLessonsInCategory);
router.get('/app/categories', getCategories);

module.exports = router;
