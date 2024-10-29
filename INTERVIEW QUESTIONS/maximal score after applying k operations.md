# Problem Statement:
You are given a 0-indexed integer array nums and an integer k. You have a starting score of 0.

In one operation:

1. choose an index i such that 0 <= i < nums.length,
2. increase your score by nums[i], and
3. replace nums[i] with ceil(nums[i] / 3).
Return the maximum possible score you can attain after applying exactly k operations.

The ceiling function ceil(val) is the least integer greater than or equal to val.

## Example 1:

### Input: nums = [10,10,10,10,10], k = 5

### Output: 50

### Explanation:
Apply the operation to each array element exactly once. The final score is 10 + 10 + 10 + 10 + 10 = 50.

## Example 2:

### Input: nums = [1,10,3,3,3], k = 3

### Output: 17

## Explanation :
You can do the following operations:
Operation 1: Select i = 1, so nums becomes [1,4,3,3,3]. Your score increases by 10.
Operation 2: Select i = 1, so nums becomes [1,2,3,3,3]. Your score increases by 4.
Operation 3: Select i = 2, so nums becomes [1,1,1,3,3]. Your score increases by 3.
The final score is 10 + 4 + 3 = 17.

## Complexity:
### Time Complexity:O(klogn+nlogn)
Initially, inserting all n elements into the max-heap takes O(nlogn) time.

Each of the k operations involves extracting the largest element from the heap and inserting a new value back into it, both of which take O(logn) time. Performing k such operations results in a time complexity of O(klogn).

Therefore, total time complexity is given by O(klogn+nlogn).

### Space Complexity:O(n)
The space complexity is dominated by the size of the max-heap, which contains at most n elements. Therefore, the space complexity is O(n).

## Solution:

```py

import heapq
import math

def maxKelements(nums, k):
    pq = [-num for num in nums]
    heapq.heapify(pq)  # Create a max-heap (by inverting the values)
    
    score = 0
    while k > 0:
        ele = -heapq.heappop(pq)  # Get the max element (by negating)
        score += ele
        heapq.heappush(pq, -math.ceil(ele / 3))  # Insert ceil(ele / 3)
        k -= 1
    
    return score

# Test the function
nums = [10, 20, 15]
k = 3
print(maxKelements(nums, k))
"""
Approach : Priority Queue
Intuition :

We are given an integer array nums and a number k. The goal is to maximize a starting score of 0 by performing an operation exactly k times. In each operation, we choose an index i, add nums[i] to the score, and replace nums[i] with nums[i] / 3.

We can solve this using a max heap, which allows us to access the largest element in the array efficiently. We need to select the largest number, add it to the score, and then replace it with one-third of its value, doing this k times.

First, we build a max heap from the numbers in nums. For each operation, we extract the largest number, add it to the score, and replace it with its one-third value. We then push this new value back into the heap. Repeating this process k times ensures that the score is maximized.
"""





