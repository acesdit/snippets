---
extension: cpp
author: Aryan
category: Data Structures
layout: '../../layouts/SubmissionLayout.astro'
title: B_Tree_operations
---
```cpp
#include <iostream>
#include <vector>

using namespace std;

const int MAX_KEYS = 3; // B-tree degree

struct BTreeNode {
    vector<int> keys;
    vector<BTreeNode*> children;
    bool isLeaf;

    BTreeNode(bool isLeafNode) : isLeaf(isLeafNode) {}

    int findKey(int key) {
        int idx = 0;
        while (idx < keys.size() && keys[idx] < key)
            ++idx;
        return idx;
    }

    void insertNonFull(int key) {
        int i = keys.size() - 1;

        if (isLeaf) {
            keys.push_back(0);
            while (i >= 0 && key < keys[i]) {
                keys[i + 1] = keys[i];
                i--;
            }
            keys[i + 1] = key;
        } else {
            while (i >= 0 && key < keys[i])
                i--;

            if (children[i + 1]->keys.size() == MAX_KEYS) {
                splitChild(i + 1, children[i + 1]);

                if (key > keys[i + 1])
                    i++;
            }
            children[i + 1]->insertNonFull(key);
        }
    }

    void splitChild(int i, BTreeNode* y) {
        BTreeNode* z = new BTreeNode(y->isLeaf);
        z->keys.reserve(MAX_KEYS);

        keys.insert(keys.begin() + i, y->keys[MAX_KEYS / 2]);

        for (int j = 0; j < MAX_KEYS / 2; j++)
            z->keys.push_back(y->keys[j + (MAX_KEYS / 2)]);

        if (!y->isLeaf) {
            for (int j = 0; j <= MAX_KEYS / 2; j++)
                z->children.push_back(y->children[j + (MAX_KEYS / 2)]);
        }

        y->keys.resize(MAX_KEYS / 2);

        children.insert(children.begin() + i + 1, z);
    }

    void traverseInOrder() {
        int i;
        for (i = 0; i < keys.size(); i++) {
            if (!isLeaf)
                children[i]->traverseInOrder();
            cout << keys[i] << " ";
        }

        if (!isLeaf)
            children[i]->traverseInOrder();
    }

    void traversePreOrder() {
        int i;
        for (i = 0; i < keys.size(); i++) {
            cout << keys[i] << " ";
            if (!isLeaf)
                children[i]->traversePreOrder();
        }

        if (!isLeaf)
            children[i]->traversePreOrder();
    }

    void traversePostOrder() {
        int i;
        if (!isLeaf) {
            for (i = 0; i < keys.size(); i++) {
                children[i]->traversePostOrder();
            }
        }
        for (i = 0; i < keys.size(); i++) {
            cout << keys[i] << " ";
        }
    }
};

class BTree {
    BTreeNode* root;

public:
    BTree() : root(nullptr) {}

    void insert(int key) {
        if (root == nullptr) {
            root = new BTreeNode(true);
            root->keys.push_back(key);
        } else {
            if (root->keys.size() == MAX_KEYS) {
                BTreeNode* newRoot = new BTreeNode(false);
                newRoot->children.push_back(root);
                newRoot->splitChild(0, root);

                int i = 0;
                if (newRoot->keys[0] < key)
                    i++;
                newRoot->children[i]->insertNonFull(key);

                root = newRoot;
            } else {
                root->insertNonFull(key);
            }
        }
    }

    void deleteKey(int key) {
        // Implement deletion logic for the B-tree
        // This part would require specific deletion logic for B-tree
        cout << "Delete operation not implemented in this example." << endl;
    }

    void traverseInOrder() {
        if (root != nullptr)
            root->traverseInOrder();
    }

    void traversePreOrder() {
        if (root != nullptr)
            root->traversePreOrder();
    }

    void traversePostOrder() {
        if (root != nullptr)
            root->traversePostOrder();
    }
};

int main() {
    BTree bTree;

    // Insert elements
    bTree.insert(5);
    bTree.insert(10);
    bTree.insert(15);
    bTree.insert(20);
    bTree.insert(25);
    bTree.insert(30);
    bTree.insert(35);

    cout << "In-order traversal: ";
    bTree.traverseInOrder();
    cout << endl;

    cout << "Pre-order traversal: ";
    bTree.traversePreOrder();
    cout << endl;

    cout << "Post-order traversal: ";
    bTree.traversePostOrder();
    cout << endl;

    return 0;
}
```
