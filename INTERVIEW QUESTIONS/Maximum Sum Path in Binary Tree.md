
Maximum Sum Path in Binary Tree

Problem Statement: Write a program to find the maximum sum path in a binary tree. 
A path in a binary tree is a sequence of nodes where every adjacent pair of nodes are connected by an edge. 
A node can only appear in the sequence at most once. 
A path need not pass from the root. We need to find the path with the maximum sum in the binary tree.


 input  : root = [-10,9,20,null,null,15,7]
 output : 42

     #include <bits/stdc++.h>

    using namespace std;

     struct node {
     int data;
     struct node * left, * right;
     };

    int findMaxPathSum(node * root, int & maxi) {
    if (root == NULL) return 0;

     // l and r store maximum path sum from left and
    // right child of root respectively

    int leftMaxPath = max(0, findMaxPathSum(root -> left, maxi));
    int rightMaxPath = max(0, findMaxPathSum(root -> right, maxi));
    int val = root -> data;
    maxi = max(maxi, (leftMaxPath + rightMaxPath) + val);
    return max(leftMaxPath, rightMaxPath) + val;

    }

    int maxPathSum(node * root) {
        // intialize result
    int maxi = INT_MIN;
    findMaxPathSum(root, maxi);
    return maxi;

     }

    struct node * newNode(int data) {
    struct Node* newNode = new Node;
    newNode->data = data;
    newNode->left = newNode->right = NULL;
    return (newNode);
    }

    int main() {

     struct node * root = newNode(-10);
    root -> left = newNode(9);
     root -> right = newNode(20);
     root -> right -> left = newNode(15);
    root -> right -> right = newNode(7);

     int answer = maxPathSum(root);
     cout << "The Max Path Sum for this tree is " << answer;

      return 0;
     }