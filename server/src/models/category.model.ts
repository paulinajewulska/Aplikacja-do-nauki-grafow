import { createSchema, Type, typedModel, ExtractDoc } from 'ts-mongoose';
import { LessonSchema } from './lesson.model';

const CategorySchema = createSchema({
    name: Type.string({ required: true, unique: true }),
    url: Type.string({ required: true, unique: true }),
    lessons: Type.array({ required: true }).of(LessonSchema)
});

const Category = typedModel('Category', CategorySchema, 'categories');

export type CategoryDoc = ExtractDoc<typeof CategorySchema>;
export { Category };
