---
extension: cpp
author: Anisha
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: LomutoPartition
---
```cpp
//Lomuto Partition
// average time complexity = O(n)
// auxiliary space complexity = O(1)
#include <bits/stdc++.h>
using namespace std;

int ipartition(int arr[], int l, int h){
    int pivot = arr[h];
    int i = l-1;
    for(int j=l; j<=h-1;j++){
        if(arr[j]<pivot){
            i++;
                swap(arr[i],arr[j]);

        }
        
    }
    swap(arr[i+1],arr[h]);
    return i+1;

};
int main() {
	
    int arr[]={10,80,30,90,40,50,70};
	
	int n=sizeof(arr)/sizeof(arr[0]);
	
	ipartition(arr,0,n-1);
	
	for(int x: arr)
	    cout<<x<<" ";
};



```
