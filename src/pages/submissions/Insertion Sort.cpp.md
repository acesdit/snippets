---
extension: cpp
author: Omkar Vasekar
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: Insertion Sort
---
```cpp
#include <iostream>
using namespace std;
void insertion_sort(int n, int arr[])
{
    for (int i = 1; i < n; i++)
    {
        for (int j = i; j > 0; j--)
        {
            if (arr[j] <= arr[j - 1])
            {
                swap(arr[j], arr[j - 1]);
            }
        }
    }
}
int main()
{
    int array[50], i, n;
    cout << "Enter the no. of elements in array: ";
    cin >> n;
    for (i = 0; i < n; i++)
    {
        cin >> array[i];
    }

    insertion_sort(n, array);
    cout << "\nSorted Order is: " << endl;
    for (int i = 0; i < n; i++)
    {
        cout << array[i] << " ";
    }
}
```
