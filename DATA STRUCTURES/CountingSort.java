import java.util.*;
//Counting sort
public class CountingSort{

    public static void countingsort(int arr[]){
        int largest= Integer.MIN_VALUE;
        for(int i=0; i<arr.length; i++){
            largest= Math.max(largest, arr[i]);
        }

        //counting the frequency on original array
        int count[]= new int[largest+1];
        for(int i=0; i<arr.length; i++){
            count[arr[i]]++;
        }

        //sorting on frequency array
        int j=0;
        for(int i=0; i<arr.length; i++){
            while(count[i]>0){
                arr[j]=i;
                j++;
                count[i]--; //after inserting an element decreasing its count
            }
        }
    }

    public static void main(String args[]){
        int arr[]={1, 4, 1, 3, 2, 4, 3, 7};
        countingsort(arr);
        for(int i=0; i<arr.length; i++){
            System.out.print(arr[i]+" ");
        }
    }
}