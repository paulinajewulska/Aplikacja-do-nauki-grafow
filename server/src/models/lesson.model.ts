import { createSchema, Type } from 'ts-mongoose';

const LessonSchema = createSchema({
    name: Type.string({ required: true, unique: true }),
    url: Type.string({ required: true, unique: true }),
    description: Type.string({ required: true }),
    pseudocode: Type.string(),
    tip: Type.string()
});

export { LessonSchema };
