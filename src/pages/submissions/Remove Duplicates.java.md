---
extension: java
author: infinityshru27
category: Data Structures
layout: '../../layouts/SubmissionLayout.astro'
title: Remove Duplicates
---
```java
import java.util.Scanner;

class RemoveDuplicates {
    public static void main(String args[]) {
        Scanner s = new Scanner(System.in);
        System.out.println("Enter size: ");
        int size = s.nextInt();
        
        int arr[] = new int[size];
        System.out.println("Enter elements:");
        for (int i = 0; i < size; i++) {
            arr[i] = s.nextInt();
        }
        
        int unique[] = new int[size]; 
        int k = 0;
        unique[k++] = arr[0];

        for (int j = 1; j < size; j++) {
            boolean isDuplicate = false;
            for (int l = 0; l < k; l++) {
                if (arr[j] == unique[l]) {
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) {
                unique[k++] = arr[j];
            }
        }

        System.out.println("Without duplicates:");
        for (int m = 0; m < k; m++) {
            System.out.println(unique[m]);
        }
        
        
    }
}
```
