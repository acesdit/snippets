---
extension: py
author: ivahbavi
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: insertionSort
---
```py
def insertionSort(lst):
    n=len(lst)
    for i in range(n):
        temp=lst[i]
        j=i-1
        while j>=0 and temp< lst[j]:
            lst[j+1]=lst[j]
            j=j-1
        lst[j+1]=temp

lst1 = eval(input("Enter list to be sorted: "))
insertionSort(lst1)
print("The sorted list is:")
for i in range(len(lst1)):
    print(lst1[i], end=' ')
```
