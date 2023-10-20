package com.tanvi;

import java.util.Arrays;

public class BubbleSort {
    public static void main(String[] args) {
        int[] arr = {-3, 12, 56, 4, -20}; //change the array accordingly
        bubble(arr);
        System.out.println(Arrays.toString(arr));
    }

    static void bubble(int[] arr) {
        //run the steps n-1 times
        for (int i = 0; i < arr.length; i++) { //i stands for the number of passes
            //for each step max item will come at the respective last index
            for (int j = 1; j <= arr.length - i - 1; j++) { //internal loop
                //swap if the item is smaller than the previous item
                if (arr[j] < arr[j - 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j - 1];
                    arr[j - 1] = temp;
                }
            }
        }
    }
}