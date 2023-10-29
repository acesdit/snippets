
#include <iostream>
using namespace std;

struct Tree{
    int data;
    struct Tree* left;
    struct Tree* right;
    Tree(int val){
        data=val;
        left=right=NULL;
    }
};

 /*       1
         / \           preOrder - 1 2 4 5 3
        2   3
       / \
      4   5
*/  

void preOrder(struct Tree* root){
    
    if(root!=NULL){
        cout<<root->data<<" ";
        preOrder(root->left);
        preOrder(root->right);
    }
}

int main()
{
    struct Tree* root = new Tree(1);
    root->left = new Tree(2);
    root->right = new Tree(3);
    root->left->left = new Tree(4);
    root->left->right = new Tree(5);
    
    cout<<"PreOrder of Binary Tree -"<<endl;
    preOrder(root);
    return 0;
}
