import java.util.Arrays;

public class Heap {

    public static void heapSort(int[] array) {
        buildMaxHeap(array);
        sortHeap(array);
    }

    private static void buildMaxHeap(int[] array) {
        int n = array.length;
        for (int i = n / 2 - 1; i >= 0; i--) {
            maxHeapify(array, n, i);
        }
    }

    private static void sortHeap(int[] array) {
        int n = array.length;
        for (int i = n - 1; i > 0; i--) {
            swap(array, 0, i);
            maxHeapify(array, i, 0);
        }
    }

    private static void maxHeapify(int[] array, int heapSize, int rootIndex) {
        int largest = rootIndex;
        int leftChild = 2 * rootIndex + 1;
        int rightChild = 2 * rootIndex + 2;

        if (leftChild < heapSize && array[leftChild] > array[largest]) {
            largest = leftChild;
        }

        if (rightChild < heapSize && array[rightChild] > array[largest]) {
            largest = rightChild;
        }

        if (largest != rootIndex) {
            swap(array, rootIndex, largest);
            maxHeapify(array, heapSize, largest);
        }
    }

    private static void swap(int[] array, int i, int j) {
        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    public static void main(String[] args) {
        int[] array = {12, 11, 13, 5, 6, 7};
        System.out.println("Original array: " + Arrays.toString(array));

        heapSort(array);

        System.out.println("Sorted array: " + Arrays.toString(array));
    }
}
