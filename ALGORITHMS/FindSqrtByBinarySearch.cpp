// find the square root of a number using a binary search algorithm:
    // Time Complexity: O(log n)
    // Space Complexity: O(1)
#include <bits/stdc++.h>
using namespace std;

int findSqrt(int n) {
    if (n == 0 || n == 1) {
        return n;
    }

    int s = 1;
    int e = n;
    int ans;

    while (s <= e) {
        int mid = s + (e - s) / 2;

        if (mid == n / mid) {
            return mid;
        } else if (mid < n / mid) {
            s = mid + 1;
            ans = mid;
        } else {
            e = mid - 1;
        }
    }
    return ans;
}

int main() {
    int num = 16; // You can change the number here
    int result = findSqrt(num);
    cout << "Square root of " << num << " is: " << result << endl;
    return 0;
}