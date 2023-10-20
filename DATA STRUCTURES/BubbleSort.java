import java.util.*;
//Bubble sorting Time complexity O(n) Swapping elements from first index to its next upto end of an array

public class BubbleSort{

    public static void bubblesort(int arr[]){
        for(int turn=0; turn< arr.length; turn++){
            for(int j=0; j<arr.length-1-turn; j++){
                if(arr[j]>arr[j+1]){
                    int temp=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]= temp;
                }
            }
        }
    }

    public static void printing(int arr[]){
        for(int i=0; i<arr.length; i++){
            System.out.print(arr[i]+" ");
        }
        System.out.println();
    } 

    public static void main(String args[]){
        int arr[]={12, 4, 2, 8, 5, 11};
        bubblesort(arr);
        printing(arr);
    }
}