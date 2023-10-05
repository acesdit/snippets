---
extension: cpp
author: Nishant surve
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: Dijkstras Algorithm
---
```cpp
/*
Dijkstra's Algorithm

Given a weighted, undirected, and connected graph of V vertices and an adjacency list adj where adj[i] is a list of lists containing two integers where the first integer of each list j denotes there is an edge between i and j, second integers corresponds to the weight of that edge. You are given the source vertex S and You have to Find the shortest distance of all the vertex from the source vertex S. You have to return a list of integers denoting the shortest distance between each node and the Source vertex S.

Example 1:

Input:
V = 2
adj [] = {{{1, 9}}, {{0, 9}}}
S = 0

Output: 0 9

Note: S is source node and Graph doesn’t contain any negative weight cycle

*/

#include<bits/stdc++.h>
    using namespace std;

    class Solution
    {
    public:
    // Function to find the shortest distance of all the vertices
     
    vector<int> dijkstra(int V, vector<vector<int>> adj[], int S)
    {

        // Create a priority queue (min-Heap)for storing the nodes as a pair type{distant,node}
        // where dist is the distance from source to the node.
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

        // Initialising distant list with a large number to
        // This list contains distance from source to the nodes.
        vector<int> distant(V, INT_MAX);

        // Source initialised with dist=0.
        distant[S] = 0;
        pq.push({0, S});

        while (!pq.empty())
        {
            int node = pq.top().second;
            int dis = pq.top().first;
            pq.pop();

            for (auto it : adj[node])
            {
                int v = it[0];
                int w = it[1];
                if (dis + w < distant[v])
                {
                    distant[v] = dis + w;
                    pq.push({dis + w, v});
                }
            }
        }
        return distant;
    }
     };

      int main()
    {
  
    int V = 3, E = 3, S = 2;
    vector<vector<int>> adj[V];
    vector<vector<int>> edges;
    vector<int> v1{1, 1}, v2{2, 6}, v3{2, 3}, v4{0, 1}, v5{1, 3}, v6{0, 6};
    int i = 0;
    adj[0].push_back(v1);
    adj[0].push_back(v2);
    adj[1].push_back(v3);
    adj[1].push_back(v4);
    adj[2].push_back(v5);
    adj[2].push_back(v6);

    Solution obj;
    vector<int> ans = obj.dijkstra(V, adj, S);

    for (int i = 0; i < V; i++)
    {
        cout << ans[i] << " ";
    }
    cout << endl;
 
}
```
