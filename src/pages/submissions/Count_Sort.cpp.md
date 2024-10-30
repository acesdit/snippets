---
extension: cpp
author: Ashishshinde2611
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: Count_Sort
---
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void countSort(vector<int>& arr) {
    int min_val = *min_element(arr.begin(), arr.end());
    int max_val = *max_element(arr.begin(), arr.end());
    int range = max_val - min_val + 1;

    vector<int> count(range, 0);

    // Count occurrences directly and update sorted positions simultaneously
    for (int x : arr) count[x - min_val]++;

    int idx = 0;
    for (int i = 0; i < range; ++i) {
        while (count[i]--) arr[idx++] = i + min_val;
    }
}

int main() {
    vector<int> arr = {4, 2, 2, 8, 3, 3, 1, 7};

    cout << "Original array: ";
    for (int i : arr) cout << i << " ";
    cout << endl;

    countSort(arr);

    cout << "Sorted array: ";
    for (int i : arr) cout << i << " ";
    cout << endl;

    return 0;
}

```
