const express = require('express');
const router = express.Router();

import { getAllCategories, getAllTopicsInCategory } from '../controllers/category.controller';

router.get('/app/categories/:category', getAllTopicsInCategory);
router.get('/app/categories', getAllCategories);

module.exports = router;
