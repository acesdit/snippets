import java.util.*;
// Selection sort selecting min value and swapping with the first index

public class SelectionSort{

    public static void selectionsort(int arr[]){
        for(int i=0; i<arr.length-1; i++){
            int minPos= i;
            for(int j=i+1; j<arr.length; j++){
                if(arr[minPos]>arr[j]){ //for descending order use less than sign <
                    minPos=j;
                }
            }
            //swapping
            int temp= arr[minPos];
            arr[minPos]= arr[i];
            arr[i]=temp;
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
        selectionsort(arr);
        printing(arr);
    }
}