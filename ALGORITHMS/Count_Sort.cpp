#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void countSort(vector<int>& arr) {
    // Find the maximum element in the array
    int max_val = *max_element(arr.begin(), arr.end());
    
    // Create a count array to store the count of each unique element
    vector<int> count(max_val + 1, 0);
    
    // Store the count of each element
    for (int i = 0; i < arr.size(); i++) {
        count[arr[i]]++;
    }
    
    // Modify the count array to store the position of elements in the sorted array
    for (int i = 1; i <= max_val; i++) {
        count[i] += count[i - 1];
    }
    
    // Output array to store the sorted result
    vector<int> output(arr.size());
    
    // Build the output array by placing elements in the correct position
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    
    // Copy the sorted elements into the original array
    for (int i = 0; i < arr.size(); i++) {
        arr[i] = output[i];
    }
}

int main() {
    vector<int> arr = {4, 2, 2, 8, 3, 3, 1, 7};
    
    cout << "Original array: ";
    for (int i : arr) {
        cout << i << " ";
    }
    cout << endl;

    countSort(arr);

    cout << "Sorted array: ";
    for (int i : arr) {
        cout << i << " ";
    }
    cout << endl;

    return 0;
}
