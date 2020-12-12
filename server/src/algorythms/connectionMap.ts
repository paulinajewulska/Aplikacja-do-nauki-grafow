import { Graph } from './Graph/Graph';

interface lessonsMap {
    lesson: string;
    fun: (graph: Graph) => any;
}

interface connectionMap {
    category: string;
    lessons: Array<lessonsMap>;
}

const connectionMap: Array<connectionMap> = [
    {
        category: 'podstawowe-informacje',
        lessons: [
            {
                lesson: 'co-to-graf',
                fun: () => '🎉Yey, pierwsza lekcja za tobą! 👏🎉'
            },
            {
                lesson: 'rzad-grafu',
                fun: graph => graph.getGraphOrder()
            },
            {
                lesson: 'rozmiar-grafu',
                fun: graph => graph.getGraphSize()
            }
        ]
    }
];

const getGraphFun = (category: string, lesson: string) => {
    const categoryLessons = connectionMap.find(c => c.category.toLowerCase() === category.toLowerCase());
    if (!categoryLessons) throw new Error(`${category} does not exist`);
    const currentLesson = categoryLessons.lessons.find(l => l.lesson.toLowerCase() === lesson);
    if (!currentLesson) throw new Error(`${currentLesson} does not exist`);
    return currentLesson.fun;
};

export { getGraphFun };
