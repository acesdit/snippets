---
extension: java
author: Kasa1905
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: PigeonholeSort
---
```java
import java.util.Arrays;

public class PigeonholeSort { // Java program to implement Pigeonhole Sort

    public static void pigeonhole_sort(int arr[], int n) {
        if (n == 0) return; // Check for empty array

        int min = arr[0];
        int max = arr[0];
        int range, i, j, index;

        // Find the minimum and maximum values in the array
        for (int a = 0; a < n; a++) {
            if (arr[a] > max)
                max = arr[a];
            if (arr[a] < min)
                min = arr[a];
        }

        // Calculate the range of the values
        range = max - min + 1;
        int[] phole = new int[range]; // Create an auxiliary array
        Arrays.fill(phole, 0); // Initialize the auxiliary array

        // Fill the auxiliary array with counts of each value
        for (i = 0; i < n; i++)
            phole[arr[i] - min]++;

        index = 0;

        // Reconstruct the sorted array from the auxiliary array
        for (j = 0; j < range; j++)
            while (phole[j]-- > 0)
                arr[index++] = j + min;
    }

    public static void main(String[] args) {
        PigeonholeSort sort = new PigeonholeSort();
        int[] arr = {8, 3, 2, 7, 4, 6, 8};

        System.out.print("Sorted order is : ");

        sort.pigeonhole_sort(arr, arr.length);

        // Print the sorted array
        for (int i = 0; i < arr.length; i++)
            System.out.print(arr[i] + " ");
    }
}```
