---
extension: java
author: tanvibaviskar
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: BinarySearchRecursion
---
```java
public class BinarySearchRecursion {
    public static void main(String[] args) {
        int[] arr = {1,3,5,65,79,88,96};
        int target = 88;
        System.out.println(search(arr,target,0,arr.length-1));
    }
    static int search(int[] arr, int target, int s, int e){

        // base condition
        if(s>e){
            return -1;
        }
        int mid = s + (e-s)/2;
        if(arr[mid] == target){
            return mid;
        }
        if(target < arr[mid]){
            return search(arr,target, s,mid -1);
        }
        return search(arr,target,mid+1,e);
    }
}```
