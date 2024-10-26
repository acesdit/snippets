"""
ANT COLONY OPTIMIZATION
An algorithm based on the behavior of ants for finding the shortest path for food source by depositing pheromones on their trails.
Shorter path accumulate more pheromone,this helps other ants to take up this route.
ACO is particularly effective for combinatorial optimization tasks, most commonly Travelling Salesman Problem.
Helps in finding the best possible route for a set of cities and returning back to origin.
"""

import numpy as np

#define a class encapsulating the properties needed for ACO
class AntColony:
    def __init__(self, distance_matrix, n_ants, n_best, n_iterations, decay, alpha=1, beta=2):
        self.distance_matrix = distance_matrix     #2-D array for dist. btw cities
        self.n_ants = n_ants                       #no.of ants that will search for routes
        self.n_best = n_best                       #best paths by pheromones level
        self.n_iterations = n_iterations           #no.of iterations
        self.decay = decay                         #rate of evaporation of pheromones
        self.alpha = alpha                         #Parameter
        self.beta = beta                           #Parameter
        self.pheromone = np.ones(distance_matrix.shape) / len(distance_matrix)       #initialize pheromone matrix

#Define run function that returns the best path and cost
    def run(self):
        best_path = None
        best_cost = float('inf')

        for _ in range(self.n_iterations):
            all_paths = self._generate_all_paths()         #calls the method to generate all paths taken by ants 
            self._update_pheromone(all_paths)              #update pheromones level

            current_best = min(all_paths, key=lambda x: x[1])     #Finds the best path
            if current_best[1] < best_cost:
                best_cost = current_best[1]
                best_path = current_best[0]

            self.pheromone *= (1 - self.decay)      #Applies pheromones decay,reducing the incluence on path

        return best_path, best_cost

#Define a method to generate all paths taken by ants and their cost
    def _generate_all_paths(self):
        all_paths = []
        for _ in range(self.n_ants):
            path = self._generate_path()
            cost = self._calculate_cost(path)
            all_paths.append((path, cost))
        return all_paths
    
#Define a private method to generate a path for an ant 
    def _generate_path(self):
        n_nodes = len(self.distance_matrix)          #Initialize path starting from node 0
        path = [0]
        visited = set(path)                          #Create a set to track visited nodes 

        for _ in range(1, n_nodes):                  #Begin a loop that continues until all nodes are visited 
            current_node = path[-1]                  #-1 denoting last node 
            probabilities = self._calculate_probabilities(current_node, visited)           #selects the next node based on calculated probabilities 
            next_node = np.random.choice(range(n_nodes), p=probabilities)
            path.append(next_node)                    #adds selected node to the path and mark as visited 
            visited.add(next_node)

        path.append(0)               #this returns the starting node (0) to complete the tour 
        return path                  #this returns the generated path

#Define a private method to calculate probability for moving from current node to next node 
    def _calculate_probabilities(self, current_node, visited):
        pheromone = self.pheromone[current_node]                          #retrieves phermorones level of current node 
        heuristic = 1 / (self.distance_matrix[current_node] + 1e-10)      #calculates a value on the inverse of the distance from current node to all other nodes 
        pheromone = pheromone ** self.alpha                               #adding a small value to avoid division by 0
        heuristic = heuristic ** self.beta
        numerator = pheromone * heuristic
        numerator[list(visited)] = 0
        denominator = sum(numerator)
        return numerator / denominator if denominator > 0 else np.zeros_like(numerator)    #Returns the normalized probabilities for each possible next node.
#if denominator=0 all nodes are visited 

#Define private method to calculate the total cost of paths 
    def _calculate_cost(self, path):
        return sum(self.distance_matrix[path[i], path[i + 1]] for i in range(len(path) - 1))

    def _update_pheromone(self, all_paths):
        for path, cost in all_paths:
            for i in range(len(path) - 1):
                self.pheromone[path[i], path[i + 1]] += 1.0 / cost

# Example usage
if __name__ == "__main__":
    distance_matrix = np.array([[0, 2, 2, 3],         #Define a sample distance matrix for four cities,representing distance between them
                                 [2, 0, 3, 2],
                                 [2, 3, 0, 2],
                                 [3, 2, 2, 0]])

    colony = AntColony(distance_matrix, n_ants=10, n_best=5, n_iterations=100, decay=0.95) #create an instance of class and run the optimization program 
    best_path, best_cost = colony.run()

    print("Best Path:", best_path)
    print("Best Cost:", best_cost)

"""
Output:
Best Path: [0, 2, 3, 1, 0]
Best Cost: 8
"""