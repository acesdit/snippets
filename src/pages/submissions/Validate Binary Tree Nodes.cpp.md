---
extension: cpp
author: nikhil730
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: Validate Binary Tree Nodes
---
```cpp
#include<bits/stdc++.h>
using namespace std;
 
bool isBinaryTreeValid(int current, vector<int>& leftChild, vector<int>& rightChild, vector<bool>& visited) {
    if (leftChild[current] != -1) {
        if (visited[leftChild[current]]) 
            return false;

        visited[leftChild[current]] = true; 
        if(!isBinaryTreeValid(leftChild[current], leftChild, rightChild, visited))
            return false;
    }

    if (rightChild[current] != -1) {
        if (visited[rightChild[current]]) 
            return false;

        visited[rightChild[current]] = true; 
        if(!isBinaryTreeValid(rightChild[current], leftChild, rightChild, visited))
            return false ;
    }
    return true;
}
bool validateBinaryTreeNodes(int n, vector<int>& leftChild, vector<int>& rightChild) {
    vector<bool> childCount(n, false);
    
    for (auto child : leftChild) {
        
        if (child != -1)
            childCount[child] = true; 
    }
    for (auto child : rightChild) {
        if (child != -1) {
            if (childCount[child])
                return false;
            childCount[child] = true; 
        }
    }
    int root = -1; 
    for (int i = 0; i < n; ++i) {
        if (!childCount[i]) {
            if (root == -1)
                root = i; 
            else
                return false;
        }
    }
    if (root == -1)
        return false; 
    
    vector<bool> visited(n) ;
    visited[root] = true ;
    if(!isBinaryTreeValid(root, leftChild, rightChild, visited)) 
        return false ;
    
    for(int i = 0 ; i < visited.size() ; i ++)
        if(!visited[i])
            return false ;
    return true; 
}

int main(){
    int n=4;
    vector<int>leftChild={1,-1,3,-1};
    vector<int>rightChild={2,-1,-1,-1};
    bool isvalid=validateBinaryTreeNodes(n,leftChild,rightChild);
    cout<<isvalid;
    return 0;
}
```
