---
extension: py
author: Ashwini-955
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: Bead Sort
---
```py
def bead_sort(arr):
    # Handle empty or single-element arrays (already sorted)
    if len(arr) < 2:
        return arr
    
    # Ensure all elements are non-negative integers
    if any(num < 0 for num in arr):
        raise ValueError("Bead Sort can only be applied to non-negative integers.")
    
    # Find the maximum value to determine the number of "bead levels"
    max_val = max(arr)
    
    # If the maximum value is zero, the array is already sorted (all elements are zero)
    if max_val == 0:
        return arr

    # Create a grid to represent the beads; each row represents a level, each column an element in `arr`
    beads = [[0] * len(arr) for _ in range(max_val)]

    # Place beads in columns according to each element's value
    for i, num in enumerate(arr):
        for j in range(num):
            beads[j][i] = 1

    # Drop beads to the bottom of each column to sort
    for j in range(max_val):
        # Count beads in each row from left to right
        sum_beads = sum(beads[j][i] for i in range(len(arr)))
        
        # Set all beads in the row to 0 temporarily
        for i in range(len(arr)):
            beads[j][i] = 0

        # Set beads in the bottom part of each column based on count
        for i in range(len(arr) - sum_beads, len(arr)):
            beads[j][i] = 1

    # Convert bead heights back into sorted values
    for i in range(len(arr)):
        arr[i] = sum(beads[j][i] for j in range(max_val))

    return arr

# Example usage
arr = [5, 3, 1, 7, 4, 2]
print("Original array:", arr)
bead_sort(arr)
print("Sorted array:", arr)
```
