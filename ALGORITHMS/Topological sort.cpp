#include <iostream>
#include <vector>
#include <queue>

using namespace std;

class Graph {
    int vertices;
    vector<vector<int>> adjList;

public:
    Graph(int vertices) {
        this->vertices = vertices;
        adjList.resize(vertices);
    }

    void addEdge(int src, int dest) {
        adjList[src].push_back(dest);
    }

    void topologicalSort() {
        vector<int> inDegree(vertices, 0);
        for (int i = 0; i < vertices; i++) {
            for (int neighbor : adjList[i]) {
                inDegree[neighbor]++;
            }
        }

        queue<int> q;
        for (int i = 0; i < vertices; i++) {
            if (inDegree[i] == 0) {
                q.push(i);
            }
        }

        vector<int> topOrder;

        while (!q.empty()) {
            int vertex = q.front();
            q.pop();
            topOrder.push_back(vertex);

            for (int neighbor : adjList[vertex]) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    q.push(neighbor);
                }
            }
        }

        if (topOrder.size() != vertices) {
            cout << "The graph contains a cycle and cannot have a topological ordering." << endl;
        } else {
            cout << "Topological Sort of the graph:" << endl;
            for (int vertex : topOrder) {
                cout << vertex << " ";
            }
            cout << endl;
        }
    }
};

int main() {
    Graph graph(6);
    graph.addEdge(5, 2);
    graph.addEdge(5, 0);
    graph.addEdge(4, 0);
    graph.addEdge(4, 1);
    graph.addEdge(2, 3);
    graph.addEdge(3, 1);

    graph.topologicalSort();

    return 0;
}
