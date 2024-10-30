---
extension: py
author: Ashwini-955
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: Sleep sort
---
```py
import threading
import time

def sleep_sort(arr):
    result = []
    
    def add_number(n):
        # Sleep for 'n' seconds and then add the number to the result list
        time.sleep(n)
        result.append(n)
    
    # Start a thread for each number in the array
    threads = []
    for num in arr:
        thread = threading.Thread(target=add_number, args=(num,))
        threads.append(thread)
        thread.start()
    
    # Wait for all threads to complete
    for thread in threads:
        thread.join()
    
    return result

# Example usage
arr = [4, 2, 3, 1, 5]
sorted_arr = sleep_sort(arr)
print("Sorted array:", sorted_arr)
```
