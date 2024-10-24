#include <iostream>
using namespace std;

void Bubble(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) 
			{
				
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void print(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << "  ";
    }
    cout << "\n";
}

int main() {
    int n;
    cout << "Enter no of elementss: ";
    cin >> n;

    //here we will allocate dynamic memory for array.
    int* arr = new int[n];

    cout << "Enter the elements: ";
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    Bubble(arr, n);
    print(arr, n);

	    //now delete  dynamically allocated memeory.
    delete[] arr;

    return 0;
}
