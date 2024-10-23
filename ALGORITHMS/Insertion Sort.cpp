#include <iostream>
using namespace std;
void insertion_sort(int n, int arr[])
{
     // Loop through each element in the array starting from the second one
    for (int i = 1; i < n; i++) 
    {
        // Compare the current element with previous elements
        for (int j = i; j > 0; j--)
        {
            // If the current element is less than or equal to the previous element
            if (arr[j] <= arr[j - 1])
            {
                // Swap them to put the current element in its correct position
                swap(arr[j], arr[j - 1]);
            }
        }
    }
}
int main()
{
    int array[50], i, n; // Declare an array to hold up to 50 integers
    cout << "Enter the no. of elements in array: ";
    cin >> n; // Read the number of elements from the user
   
    // Loop to input the elements into the array
    for (i = 0; i < n; i++)
    {
        // Read each element into the array
        cin >> array[i]; 
    }

    // Call the insertion sort function
    insertion_sort(n, array);
    cout << "\nSorted Order is: " << endl; // Print the sorted array
    for (int i = 0; i < n; i++) // Print each sorted element
    {
        cout << array[i] << " ";
    }
}
