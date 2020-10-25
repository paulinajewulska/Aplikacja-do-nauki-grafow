import { createSchema, Type, typedModel, ExtractDoc } from 'ts-mongoose';

const TopicSchema = createSchema({
    name: Type.string({ required: true, unique: true }),
    description: Type.string({required: true}),
    url: Type.string({required: true, unique: true})
});

export {  TopicSchema };