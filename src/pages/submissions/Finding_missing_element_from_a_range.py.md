---
extension: py
author: Kasa1905
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: Finding_missing_element_from_a_range
---
```py
def find_missing(arr, low, high):
    # Loop through the range of numbers from low to high
    for i in range(low, high + 1):
        if i not in arr:
            print(i, end=" ")

# Driver's code
if __name__ == "__main__":
    # Taking input for the array size
    n = int(input("Enter the number of elements in the array: "))
    
    # Taking input for the array elements
    arr = list(map(int, input("Enter the elements of the array: ").split()))
    
    # Taking input for the range
    low, high = map(int, input("Enter the low and high values of the range: ").split())
    
    # Function call
    find_missing(arr, low, high)```
