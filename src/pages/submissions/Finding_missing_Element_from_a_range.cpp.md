---
extension: cpp
author: Kasa1905
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: Finding_missing_Element_from_a_range
---
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Function to find and print missing 
// elements in the given range
void findMissing(int arr[], int n, int low, int high) {
    // Loop through the range of numbers from low to high
    for (int i = low; i <= high; i++) {
        bool found = false;
      
        // Loop through the array to check if i exists in it
        for (int j = 0; j < n; j++) {
            if (arr[j] == i) {
                found = true;
                break;
            }
        }
      
        // If i is not found in the array, print it
        if (!found) {
            cout << i << " ";
        }
    }
}

// Driver's code
int main() {
    int n, low, high;
    
    // Taking input for the array size
    cout << "Enter the number of elements in the array: ";
    cin >> n;
    
    vector<int> vec(n);
    
    // Taking input for the array elements
    cout << "Enter the elements of the array: ";
    for (int i = 0; i < n; i++) {
        cin >> vec[i];
    }
    
    // Taking input for the range
    cout << "Enter the low and high values of the range: ";
    cin >> low >> high;
    
    // Convert vector to array
    int arr[n];
    copy(vec.begin(), vec.end(), arr);
    
    // Function call
    findMissing(arr, n, low, high);
    
    return 0;
}```
