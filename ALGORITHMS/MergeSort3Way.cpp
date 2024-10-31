#include <iostream>
#include <vector>

void merge(std::vector<int>& arr, int left, int mid1, int mid2, int right) {
    int n1 = mid1 - left + 1;
    int n2 = mid2 - mid1;
    int n3 = right - mid2;

    std::vector<int> leftArr(n1), midArr(n2), rightArr(n3);

    for (int i = 0; i < n1; ++i)
        leftArr[i] = arr[left + i];
    for (int i = 0; i < n2; ++i)
        midArr[i] = arr[mid1 + 1 + i];
    for (int i = 0; i < n3; ++i)
        rightArr[i] = arr[mid2 + 1 + i];

    int i = 0, j = 0, k = 0, l = left;

    while (i < n1 && j < n2 && k < n3) {
        if (leftArr[i] <= midArr[j] && leftArr[i] <= rightArr[k])
            arr[l++] = leftArr[i++];
        else if (midArr[j] <= leftArr[i] && midArr[j] <= rightArr[k])
            arr[l++] = midArr[j++];
        else
            arr[l++] = rightArr[k++];
    }

    while (i < n1 && j < n2) {
        if (leftArr[i] <= midArr[j])
            arr[l++] = leftArr[i++];
        else
            arr[l++] = midArr[j++];
    }

    while (j < n2 && k < n3) {
        if (midArr[j] <= rightArr[k])
            arr[l++] = midArr[j++];
        else
            arr[l++] = rightArr[k++];
    }

    while (i < n1 && k < n3) {
        if (leftArr[i] <= rightArr[k])
            arr[l++] = leftArr[i++];
        else
            arr[l++] = rightArr[k++];
    }

    while (i < n1)
        arr[l++] = leftArr[i++];
    while (j < n2)
        arr[l++] = midArr[j++];
    while (k < n3)
        arr[l++] = rightArr[k++];
}

void mergeSort3Way(std::vector<int>& arr, int left, int right) {
    if (left >= right)
        return;

    int third = (right - left) / 3;
    int mid1 = left + third;
    int mid2 = mid1 + third + 1;

    mergeSort3Way(arr, left, mid1);
    mergeSort3Way(arr, mid1 + 1, mid2);
    mergeSort3Way(arr, mid2 + 1, right);

    merge(arr, left, mid1, mid2, right);
}

int main() {
    std::vector<int> arr;
    arr.push_back(38);
    arr.push_back(27);
    arr.push_back(43);
    arr.push_back(3);
    arr.push_back(9);
    arr.push_back(82);
    arr.push_back(10);

    int n = arr.size();

    mergeSort3Way(arr, 0, n - 1);

    std::cout << "Sorted array: ";
    for (int i = 0; i < n; ++i)
        std::cout << arr[i] << " ";
    std::cout << std::endl;

    return 0;
}