import java.util.*;

public class Finding_missing_element_from_a_range {
    // Function to find and print missing elements in the given range
    static void findMissing(int[] arr, int n, int low, int high) {
        // Loop through the range of numbers from low to high
        for (int i = low; i <= high; i++) {
            boolean found = false;
            // Loop through the array to check if i exists in it
            for (int j = 0; j < n; j++) {
                if (arr[j] == i) {
                    found = true;
                    break;
                }
            }

            // If i is not found in the array, print it
            if (!found) {
                System.out.print(i + " ");
            }
        }
    }

    // Driver's code
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Input for the size of the array
        System.out.print("Enter the number of elements in the array: ");
        int n = scanner.nextInt();
        int[] arr = new int[n];

        // Input for the array elements
        System.out.println("Enter the elements of the array:");
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }

        // Input for the range
        System.out.print("Enter the low value of the range: ");
        int low = scanner.nextInt();
        System.out.print("Enter the high value of the range: ");
        int high = scanner.nextInt();

        // Function call
        System.out.println("Missing elements in the range " + low + " to " + high + ":");
        findMissing(arr, n, low, high);

        scanner.close();
    }
}