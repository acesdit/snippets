import java.util.*;
//Insertion sorting Time complexity O(n^2)
//making sorted and unsorted two parts of array then placing elements from unsorted to sorted array at its right position
public class Sorting3Insertion{

    public static void insertionsort(int arr[]){
        for(int i=0; i<arr.length;i++){
            int curr=arr[i];
            int prev= i-1;
            //finding the correct position for element
            while(prev>=0 && arr[prev]>curr){
                //pushing at previous position
                arr[prev+1]= arr[prev];
                prev--;
            }
            //inserting 
            arr[prev+1]=curr;
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
        insertionsort(arr);
        printing(arr);
    }
}    

//int curr=arr[i]: stores the element at the position
//int curr: stores the index 