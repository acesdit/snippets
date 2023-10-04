---
extension: java
author: prakharpandey04
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: Binary Search
---
```java
public class BinarySearch {
    public static void main(String[] args){
        // Assume the array is already sorted in ascending order.

        int[] arr={-18,-12,-5,0,2,3,6,14,56,78,88,90};
        int target = 88;
        int ans = binarySearch(arr,target);
        System.out.print(ans);

    }
    static int binarySearch(int[] arr, int target){
        int start =0;
        int end = arr.length-1;

        //return the index
        // return -1 if it does not exist
        while(start<=end){
            int mid = start + (end - start)/2;

            if(target <arr[mid]){
                end = mid -1;  //start will not change
            }
            else if(target>arr[mid]){
                start = mid +1; //end will not change
            }
            else{
                //found ans
                return mid;
            }
        }
        return -1;
    }
}
```
