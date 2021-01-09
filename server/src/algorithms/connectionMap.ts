import {Graph} from './Graph/Graph';

interface lessonsMap {
    lesson: string;
    fun: (graph: Graph, index?: number) => any;
    ans?: string,
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
                fun: () => '🎉Yey, pierwsza lekcja za tobą! 👏🎉',
                ans: ''
            },
            {
                lesson: 'rzad-grafu',
                fun: graph => graph.getGraphOrder(),
                ans: 'Rząd grafu wynosi'
            },
            {
                lesson: 'rozmiar-grafu',
                fun: graph => graph.getGraphSize(),
                ans: 'Rozmiar grafu wynosi'
            },
            {
                lesson: 'graf-zerowy',
                fun: graph => graph.isNullGraph(),
                ans: ''
            },
            {
                lesson: 'stopien-wierzcholka',
                fun: (graph: Graph, index: number) => graph.getDegree(index),
                requiresIndex: true,
                ans: 'Stopień wybranego wierzchołka wynosi'
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
    },
    {
        category: 'minimalne-drzewo-rozpinajace',
        lessons: [
            {
                lesson: 'kruskal',
                fun: (graph: Graph) => graph.getKruskalMinimumSpanningTree()
            },
            {
                lesson: 'prim',
                fun: (graph: Graph) => graph.getPrimMinimumSpanningTree()
            }
        ]
    },
    {
        category: 'najkrotsza-sciezka-w-grafie-wazonym',
        lessons: [
            {
                lesson: 'dijkstra',
                fun: (graph: Graph) => graph.getDijkstraPath()
            },
            {
                lesson: 'bellman-ford',
                fun: (graph: Graph) => graph.getBellmanFordPath()
            }
        ]
    },
    {
        category: 'cykle-i-sciezki',
        lessons: [
            {
                lesson: 'znajdowanie-cyklu',
                fun: (graph: Graph) => graph.findCycle()
            }
        ]
    }
];

const getGraphFun = (category: string, lesson: string) => {
    const categoryLessons = connectionMap.find(c => c.category.toLowerCase() === category.toLowerCase());
    if (!categoryLessons) throw new Error(`${category} does not exist`);
    const currentLesson = categoryLessons.lessons.find(l => l.lesson.toLowerCase() === lesson);
    if (!currentLesson) throw new Error(`${currentLesson} does not exist`);
    return {graphFun: currentLesson.fun, graphFunString: currentLesson.ans};
};

export {getGraphFun};
