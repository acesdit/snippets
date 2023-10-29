---
extension: py
author: ivahbavi
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: linearSearch
---
```py
def linearSearch(list,key):
    for index in range(0,len(list)):
        if list[index]==key:
            return index+1
            return None

list1=[]
maximum=int(input("How many elements are in your list?"))
print("Enter each element and press enter:")
for i in range(0,maximum):
    n=int(input())
    list1.append(n)
print("The List contents are:",list1)

key=int(input("Enter the number to be searched:"))
pos=linearSearch(list1,key)
if pos is None:
    print("Number",key,"is not present in the list")
else:
    print("Number",key,"is present at position",pos)
    
```
