/* 
Given N items where each item has some weight and profit associated with it and also given a bag with capacity W, 
[i.e., the bag can hold at most W weight in it]. The task is to put the items into the bag such that the sum of profits 
associated with them is the maximum possible. 

 Note: The constraint here is we can either put an item completely into the bag or cannot put it at all [It is not 
possible to put a part of an item into the bag].

Input: N = 3, W = 4, profit[] = {1, 2, 3}, weight[] = {4, 5, 1}
Output: 3
Explanation: There are two items which have weight less than or equal to 4. If we select the item with weight 4, 
the possible profit is 1. And if we select the item with weight 1, the possible profit is 3. So the maximum possible profit is 3.
Note that we cannot put both the items with weight 4 and 1 together as the capacity of the bag is 4.
*/

// Here is the top-down approach of 
// dynamic programming 
#include <bits/stdc++.h> 
using namespace std; 
  
// Returns the value of maximum profit 
int knapSackRec(int W, int wt[], int val[], int index, int** dp) 
{ 
    // base condition 
    if (index < 0) 
        return 0; 
    if (dp[index][W] != -1) 
        return dp[index][W]; 
  
    if (wt[index] > W) { 
  
        // Store the value of function call 
        // stack in table before return 
        dp[index][W] = knapSackRec(W, wt, val, index - 1, dp); 
        return dp[index][W]; 
    } 
    else { 
        // Store value in a table before return 
        dp[index][W] = max(val[index] 
                           + knapSackRec(W - wt[index], wt, val, 
                                         index - 1, dp), 
                       knapSackRec(W, wt, val, index - 1, dp)); 
  
        // Return value of table after storing 
        return dp[index][W]; 
    } 
} 
  
int knapSack(int W, int wt[], int val[], int n) 
{ 
    // double pointer to declare the 
    // table dynamically 
    int** dp; 
    dp = new int*[n]; 
  
    // loop to create the table dynamically 
    for (int i = 0; i < n; i++) 
        dp[i] = new int[W + 1]; 
  
    // loop to initially filled the 
    // table with -1 
    for (int i = 0; i < n; i++) 
        for (int j = 0; j < W + 1; j++) 
            dp[i][j] = -1; 
    return knapSackRec(W, wt, val, n - 1, dp); 
} 
  
// Driver Code 
int main() 
{ 
    int profit[] = { 60, 100, 120 }; 
    int weight[] = { 10, 20, 30 }; 
    int W = 50; 
    int n = sizeof(profit) / sizeof(profit[0]); 
    cout << knapSack(W, weight, profit, n); 
    return 0; 
}