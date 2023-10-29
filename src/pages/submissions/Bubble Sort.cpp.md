---
extension: cpp
author: SujalBagade
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: Bubble Sort
---
```cpp
#include <iostream>
using namespace std;

// Function to perform bubble sort
void bubbleSort(int array[], int size)
{
    // Flag to check if any swapping is done in a pass
    bool swapped;

    for (int step = 0; step < size - 1; ++step) // Reduced the number of steps to avoid unnecessary iteration
    {
        swapped = false;

        // Last 'step' elements are already in place, no need to check them
        for (int i = 0; i < size - step - 1; ++i) // Reduced the number of comparisons in each pass
        {
            // Compare adjacent elements
            if (array[i] > array[i + 1])
            {
                // Swap if the elements are not in the intended order
                int temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
        }

        // If no two elements were swapped in the inner loop, then the array is sorted
        if (!swapped)
            break;
    }
}

// Function to print array
void printArray(int array[], int size)
{
    for (int i = 0; i < size; ++i)
    {
        cout << "  " << array[i];
    }
    cout << "\n";
}

int main()
{
    // Initialize the array
    int data[] = {-2, 45, 0, 11, -9};

    // Find the array's length
    int size = sizeof(data) / sizeof(data[0]);

    // Call the bubble sort function
    bubbleSort(data, size);

    // Print the sorted array
    cout << "Sorted Array in Ascending Order:\n";
    printArray(data, size);

    return 0;
}
```
