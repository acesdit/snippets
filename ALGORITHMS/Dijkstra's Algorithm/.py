import heapq

def dijkstra(graph, start):
    # Initialize the shortest path distances dictionary
    shortest_paths = {node: float('inf') for node in graph}
    shortest_paths[start] = 0
    
    # Priority queue to explore nodes by shortest distance
    priority_queue = [(0, start)]
    
    while priority_queue:
        current_distance, current_node = heapq.heappop(priority_queue)
        
        # Skip processing if we've found a shorter path previously
        if current_distance > shortest_paths[current_node]:
            continue
        
        # Check neighboring nodes
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            
            # Update shortest path if a shorter path is found
            if distance < shortest_paths[neighbor]:
                shortest_paths[neighbor] = distance
                heapq.heappush(priority_queue, (distance, neighbor))
                
    return shortest_paths
