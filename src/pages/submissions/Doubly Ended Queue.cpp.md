---
extension: cpp
author: Omkar Vasekar
category: Data Structures
layout: '../../layouts/SubmissionLayout.astro'
title: Doubly Ended Queue
---
```cpp
#include <iostream>
using namespace std;
#define size 100
class queue
{
public:
    int arr[size], front, rear;
    queue()
    {
        front = rear = -1;
    }
    bool is_empty()
    {
        if (front == rear)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
    bool is_full()
    {
        if (rear >= size - 1)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
    void enqueue(int a)
    {
        if (is_empty())
        {
            rear++;
            arr[rear] = a;
        }
        else if (is_full())
        {
            cout << "Queue is full";
        }
        else
        {
            rear += 1;
            arr[rear] = a;
        }
    }
    void deque()
    {
        if (is_empty())
        {
            cout << "\nQueue is empty.";
        }
        else
        {

            front++;
            int i = arr[front];
            cout << "\nDeleted " << i;
        }
    }
    void display()
    {
        cout << "\n";
        for (int i = front + 1; i <= rear; i++)
        {
            cout << " " << arr[i];
        }
    }
};
int main()
{
    queue q;

    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    q.enqueue(4);
    q.enqueue(5);
    q.enqueue(6);
    q.deque();    
    q.deque();    
    q.display();
}
```
