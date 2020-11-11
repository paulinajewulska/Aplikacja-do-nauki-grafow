import { Category, CategoryDoc } from './category.model';
import { Model } from 'mongoose';

interface Database {
    category: Model<CategoryDoc>;
}

const db: Database = { category: Category };

export { db, CategoryDoc };
