---
extension: py
author: PratKakade
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: HeapSort
---
```py
def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2

    if l < n and arr[l] > arr[largest]:
        largest = l

    if r < n and arr[r] > arr[largest]:
        largest = r

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]  # swap
        heapify(arr, n, largest)


def heapSort(arr):
    n = len(arr)

    # Build a maxheap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]  # swap
        heapify(arr, i, 0)


# Example usage:
arr = [12, 11, 13, 5, 6, 7]
print("Original array:", arr)
heapSort(arr)
print("Sorted array:", arr)
```
