---
extension: java
author: infinityshru27
category: Data Structures
layout: '../../layouts/SubmissionLayout.astro'
title: Exercise17
---
```java
import java.util.Scanner;

class Exercise17 {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
		int arr[][] = new int[3][3];
		System.out.println("Enter ");
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
               arr[i][j] = s.nextInt();
            }
        }
        int a1[][] = new int[3][3];
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                a1[j][i] =arr[i][j];
            }
        }
		for (int i = 0; i < 3; i++) {
            int a = 0,b=2;
            
            while (a < b) {
                int temp = a1[i][a];
                a1[i][a] = a1[i][b];
                a1[i][b] = temp;
                a++;
                b--;
            }
        }
		System.out.println("Rotated ");
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.print(a1[i][j] + " ");
            }
            System.out.println();
        }

        
       
    }
}
```
