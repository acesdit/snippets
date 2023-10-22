---
extension: java
author: tanvibaviskar
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: Selection Sort
---
```java
import java.util.Arrays;

public class SelectionSort {
    public static void main(String[] args) {
        int[] arr = {78,23,-2,16,44};
        selection(arr);
        System.out.println(Arrays.toString(arr));

    }

    static void selection(int[] arr){
        for (int i = 0; i <arr.length  ; i++) {
            //find the maximum item with the remaining array and swap with the correct index
            int last= arr.length -i-1;
            int maxIndex = getMaxIndex(arr,0,last);
            swap (arr ,maxIndex ,last);
        }
    }

    static void swap(int[] arr, int first ,int second ){
        int temp = arr[first];
        arr[first] = arr[second];
        arr[second] = temp;
    }

    static int getMaxIndex(int[] arr,int start,int end){
        int max =start;
        for (int i = 0; i <=end  ; i++) {
            if (arr[max] < arr[i]) {
                max = i;
            }
        }
        return max;
    }
}```
