import { Graph } from './Graph/Graph';

interface lessonsMap {
    lesson: string;
    fun: (graph: Graph, index?: number) => any;
    requiresIndex?: boolean;
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
            },
            {
                lesson: 'graf-zerowy',
                fun: graph => graph.isNullGraph()
            },
            {
                lesson: 'stopien-wierzcholka',
                fun: (graph: Graph, index: number) => graph.getDegree(index),
                requiresIndex: true
            }
        ]
    },
    {
        category: 'reprezentacja-grafow',
        lessons: [
            {
                lesson: 'adjacency-matrix',
                fun: graph => graph.getAdjacencyMatrix()
            },
            {
                lesson: 'incidence-matrix',
                fun: graph => graph.getIncidenceMatrix()
            },
            {
                lesson: 'adjacency-list',
                fun: graph => graph.getAdjacencyList()
            }
        ]
    },
    {
        category: 'przechodzenie-grafow',
        lessons: [
            {
                lesson: 'w-glab',
                fun: (graph: Graph, index: number) => graph.getDepthFirstSearch(index)
            },
            {
                lesson: 'wszerz',
                fun: (graph: Graph, index: number) => graph.getBreadthFirstSearch(index)
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
