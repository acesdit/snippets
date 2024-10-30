# Python3 implementation of TimSort

MIN_RUN = 32

def insertion_sort(arr, left, right):
    for i in range(left + 1, right + 1):
        key = arr[i]
        j = i - 1
        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def merge(arr, left, mid, right):
    # Left and right subarrays
    len1, len2 = mid - left + 1, right - mid
    left_arr, right_arr = arr[left:left + len1], arr[mid + 1:mid + 1 + len2]

    i = j = 0
    k = left

    # Merging left and right arrays
    while i < len1 and j < len2:
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1

    # Copy remaining elements of left, if any
    while i < len1:
        arr[k] = left_arr[i]
        i += 1
        k += 1

    # Copy remaining elements of right, if any
    while j < len2:
        arr[k] = right_arr[j]
        j += 1
        k += 1

def tim_sort(arr):
    n = len(arr)

    # Sort individual subarrays of size MIN_RUN
    for start in range(0, n, MIN_RUN):
        end = min(start + MIN_RUN - 1, n - 1)
        insertion_sort(arr, start, end)

    # Merge sorted runs
    size = MIN_RUN
    while size < n:
        for left in range(0, n, 2 * size):
            mid = min(n - 1, left + size - 1)
            right = min((left + 2 * size - 1), n - 1)

            if mid < right:
                merge(arr, left, mid, right)

        size *= 2

# Example usage
arr = [12, 11, 13, 5, 6, 7, 14, 18, 20, 19, 15, 10]
print("Original array:", arr)
tim_sort(arr)
print("Sorted array:", arr)
