import { createSchema, Type } from 'ts-mongoose';

const LessonSchema = createSchema({
    name: Type.string({ required: true, unique: true }),
    description: Type.string({ required: true }),
    url: Type.string({ required: true, unique: true })
});

export { LessonSchema };
