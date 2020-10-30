import { createSchema, Type, typedModel, ExtractDoc } from 'ts-mongoose';
import { TopicSchema } from "./topic.model";

const CategorySchema = createSchema({
    name: Type.string({ required: true, unique: true }),
    url: Type.string({ required: true, unique: true }),
    topics: Type.array({ required: true }).of(TopicSchema)
});

const Category = typedModel('Category', CategorySchema, 'categories');

export type CategoryDoc = ExtractDoc<typeof CategorySchema>;
export { Category };