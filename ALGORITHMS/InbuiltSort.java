import java.util.*;
//Using java.util.Collections library
//Time complexity for sorting is O(n log n)
public class InbuiltSort{
    public static void main(String args[]){
        Integer arr[]={3, 5, 2, 9, 6};
        //Arrays.sort(arr);

        //Arrays.sort(arr, 0, 3); To print from range 0 to 3
        //To print in reverse order
        Arrays.sort(arr,Collections.reverseOrder());
        for(int i=0; i<arr.length; i++){
            System.out.print(arr[i]+" ");
        }
    }
}