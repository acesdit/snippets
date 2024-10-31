// C++ program to Find the missing element

#include <bits/stdc++.h>
using namespace std;

int missingNumber(int n, vector<int>& arr)
{

    // Create hash array of size n+1
    vector<int> hash(n + 1, 0);

    // Store frequencies of elements
    for (int i = 0; i < n - 1; i++) {
        hash[arr[i]]++;
    }

    // Find the missing number
    for (int i = 1; i <= n; i++) {
        if (hash[i] == 0) {
            return i;
        }
    }

    // Edge case handling (though problem guarantees a
    // solution)
    return -1;
}

/* Driver code */
int main()
{
    vector<int> arr = { 1, 2, 3, 5 };
    int n = 5;
    cout << missingNumber(n, arr);
}
