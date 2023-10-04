rogram for counting sort in JAVA
// Counting sort in Java programming

import java.util.Arrays;

class countSort {
    void applycountSort(int array[], int size) {
        int[] output = new int[size + 1];

        // Here we find the largest item in the array
        int max = array[0];
        for (int i = 1; i < size; i++) { if (array[i] > max)
                max = array[i];
        }
        int[] count = new int[max + 1];

        // Initialize the count for each element in array to 0
        for (int i = 0; i < max; ++i) {
            count[i] = 0;
        }

        // For each element we store the count
        for (int i = 0; i < size; i++) {
            count[array[i]]++;
        }

        // Store the cummulative count of each array
        for (int i = 1; i <= max; i++) 
        { 
            count[i] += count[i - 1]; 
        } 

        // Search the index of each element of the actual array in count array, and 
        // place the elements in output array 
        for (int i = size - 1; i >= 0; i--) {
            output[count[array[i]] - 1] = array[i];
            count[array[i]]--;
        }

        // Transfer the sorted items into actual array
        for (int i = 0; i < size; i++) {
            array[i] = output[i];
        }
    }

    // Driver code
    public static void main(String args[]) {
        int[] data = {2, 5, 2, 8, 1, 4, 1};
        int size = data.length;

        countSort obj = new countSort();
        obj.applycountSort(data, size);

        System.out.println("Array After Sorting: ");
        System.out.println(Arrays.toString(data));
    }
}
