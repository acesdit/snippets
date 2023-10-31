---
extension: cpp
author: Anisha
category: Data Structures
layout: '../../layouts/SubmissionLayout.astro'
title: ReverseDoublyLinkedList
---
```cpp
// Time Complexity: O(N)
// Auxiliary Space: O(1)

#include <bits/stdc++.h> 
using namespace std; 

struct Node{
    int data;
    Node* prev;
    Node* next;
    Node(int d){
        data=d;
        prev=NULL;
        next=NULL;
    }
};

void printlist(Node *head){
    Node *curr=head;
    while(curr!=NULL){
        cout<<curr->data<<" ";
        curr=curr->next;
    }cout<<endl;
}

Node *reverse(Node *head){
    Node *temp=NULL;
    Node *curr=head;
    while(curr!=NULL){
        temp=curr->prev;
        curr->prev=curr->next;
        curr->next=temp;
        curr=curr->prev;
    }
    if(temp!=NULL)head=temp->prev;
    return head;
}

int main() 
{ 
	Node *head=new Node(10);
	Node *temp1=new Node(20);
	Node *temp2=new Node(30);
	head->next=temp1;
	temp1->prev=head;
	temp1->next=temp2;
	temp2->prev=temp1;
	head=reverse(head);
	printlist(head);
	return 0;
} 
```
