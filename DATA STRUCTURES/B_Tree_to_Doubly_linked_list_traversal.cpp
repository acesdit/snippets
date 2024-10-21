// C++ program for conversion of Binary Tree to Double Linked List
#include<iostream>
using namespace std;

class Node {
public:
    int data;
    Node* left;
    Node* right;
    Node (int x) {data = x;left = nullptr;  right = nullptr;}
};

void inorder(Node* root) {  
    // if left subtree exists    
    if (root->left){
        
        // find the inorder predecessor of root node
        Node* pred  = root->left;
        while (pred->right){
            pred = pred->right;
        }
        
        // process the left subtree
        inorder(root->left);
        
        // link the predecessor and root node
        pred->right = root;
        root->left = pred;
    }
    
    // if right subtree exists
    if (root->right) {
        
        // find the inorder successor of root node
        Node* succ = root->right;
        while (succ->left) {
            succ = succ->left;
        }
        
        // process the right subtree
        inorder(root->right);
        
        // link the successor and root node
        root->right = succ;
        succ->left = root;
    }
}

Node* bToDLL(Node* root){
    
    // return if root is null
    if (root == nullptr) return root;
    
    // find the head of dll
    Node* head = root;
    while (head->left != nullptr) 
        head = head->left;
        
    // recursively convert the tree into dll
    inorder(root);
    
    return head;
}

void printList(Node* head){
    Node* curr = head;
    
    while (curr != NULL) {
        cout << curr->data << " ";
        curr = curr->right;
    }
    cout<<endl;
}

int main() {
    
    // Create a hard coded binary tree
    //          10
    //         /  \
    //       12    15    
    //      / \    /
    //     25 30  36
    Node* root = new Node(10);
    root->left = new Node(12);
    root->right = new Node(15);
    root->left->left = new Node(25);
    root->left->right = new Node(30);
    root->right->left = new Node(36);

    Node* head = bToDLL(root);

    printList(head);

    return 0;
}
