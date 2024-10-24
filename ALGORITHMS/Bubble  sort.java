class Bubble_sort{
    void bubble_sort(int arr[]){
        int n = arr.length;
        for (int i=0;i<n-1;i++){
            for (int j=0;j<n-i-1;j++){
                if (arr[j] > arr[j+1]){
                    int temp =arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=temp;
                }
            }
        }

    }
    void printarr(int arr[]){
        int n = arr.length;
        for (int i=0;i<n;i++){
            System.out.print(arr[i]+" ");
        }
    }


}

public class Main {
    public static void main(String[] args) {
        int[] arr={10,5,30,15,50,6};
        Bubble_sort s = new Bubble_sort();
        s.bubble_sort(arr);
        s.printarr(arr);

    }
}