import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

public class BucketSort {

    // Function to perform bucket sort
    public static void bucketSort(float[] array) {
        // Create buckets
        int n = array.length;
        @SuppressWarnings("unchecked")
        ArrayList<Float>[] buckets = new ArrayList[n];

        for (int i = 0; i < n; i++) {
            buckets[i] = new ArrayList<>();
        }

        // Distributing the elements into buckets
        for (float value : array) {
            int bucketIndex = (int) (n * value); // Assuming values are in the range [0, 1)
            if (bucketIndex >= n) {
                bucketIndex = n - 1; // Handle the case where value is 1.0
            }
            buckets[bucketIndex].add(value);
        }

        // Sort each bucket and concatenate the results
        int index = 0;
        for (ArrayList<Float> bucket : buckets) {
            Collections.sort(bucket); // Sort individual buckets
            for (float value : bucket) {
                array[index++] = value; // Concatenate the sorted buckets
            }
        }
    }

    // Main method to test the bucket sort
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter floating-point numbers between 0 and 1, separated by spaces:");

        // Read input line and split it into an array of strings
        String input = scanner.nextLine();
        String[] inputStrings = input.split(" ");

        // Convert strings to an array of floats
        float[] array = new float[inputStrings.length];
        for (int i = 0; i < inputStrings.length; i++) {
            array[i] = Float.parseFloat(inputStrings[i]);
        }

        System.out.println("Original array:");
        for (float value : array) {
            System.out.print(value + " ");
        }

        bucketSort(array);

        System.out.println("\nSorted array:");
        for (float value : array) {
            System.out.print(value + " ");
        }

        scanner.close();
    }
}