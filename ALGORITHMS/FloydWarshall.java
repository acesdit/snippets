import java.util.Arrays;

public class FloydWarshall {
    final static int INF = 9999; // A large value to represent infinity and a constant as value remains constant

    public void floydWarshall(int graph[][], int V) {
        int dist[][] = new int[V][V];
        int i, j, k;

        // Initialize the solution matrix same as the input graph matrix.
        for (i = 0; i < V; i++)
            for (j = 0; j < V; j++)
                dist[i][j] = graph[i][j];

        // Adding all vertices one by one to the set of intermediate vertices.
        for (k = 0; k < V; k++) {
            for (i = 0; i < V; i++) {
                for (j = 0; j < V; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j])
                        dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
        printSolution(dist, V);
    }

    void printSolution(int dist[][], int V) {
        System.out.println("The following matrix shows the shortest " +
                "distances between every pair of vertices:");
        for (int i = 0; i < V; ++i) {
            for (int j = 0; j < V; ++j) {
                if (dist[i][j] == INF)
                    System.out.print("INF ");
                else
                    System.out.print(dist[i][j] + "   ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        int graph[][] = { { 0, 5, INF, 10 },
                { INF, 0, 3, INF },
                { INF, INF, 0, 1 },
                { INF, INF, INF, 0 } };
        int V = 4;
        FloydWarshall fw = new FloydWarshall();
        fw.floydWarshall(graph, V);
    }
}
