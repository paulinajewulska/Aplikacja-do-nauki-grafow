const express = require('express');
const router = express.Router();

import { getAllCategories } from "../controllers/category.controller";

router.get('/app/category', getAllCategories);

module.exports = router;