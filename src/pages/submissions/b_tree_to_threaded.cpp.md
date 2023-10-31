---
extension: cpp
author: Aryan
category: Data Structures
layout: '../../layouts/SubmissionLayout.astro'
title: b_tree_to_threaded
---
```cpp
#include <iostream>
#include <stack>

using namespace std;

struct Node {
    int data;
    Node *left, *right;
    bool isThreaded;

    Node(int value) : data(value), left(nullptr), right(nullptr), isThreaded(false) {}
};

Node* createThreadedTree(Node* root) {
    if (root == nullptr)
        return nullptr;

    stack<Node*> stack;
    Node* current = root;
    Node* prev = nullptr;

    while (current != nullptr || !stack.empty()) {
        while (current != nullptr) {
            stack.push(current);
            current = current->left;
        }

        current = stack.top();
        stack.pop();

        if (prev != nullptr && prev->right == nullptr) {
            prev->right = current;
            prev->isThreaded = true;
        }

        prev = current;
        current = current->right;
    }

    return root;
}

void printThreadedInorder(Node* root) {
    if (root == nullptr) {
        cout << "Empty tree";
        return;
    }

    Node* current = root;

    while (current != nullptr) {
        while (current->left != nullptr)
            current = current->left;

        while (current != nullptr) {
            cout << current->data << " ";
            if (current->isThreaded)
                current = current->right;
            else
                current = current->right;
        }
    }
}

int main() {
    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);

    // Convert Binary Tree to Threaded Binary Tree
    createThreadedTree(root);

    cout << "In-order traversal of Threaded Binary Tree: ";
    printThreadedInorder(root);
    cout << endl;

    return 0;
}```
