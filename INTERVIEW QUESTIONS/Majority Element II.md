# Problem Statement:

Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.

## Example 1:

### Input: nums = [3,2,3]

### Output: [3]

### Explanation:

Frequency of 3 is 2 and length of nums array is 3 ,so that we can say that is majority element in the array

## Example 2:

### Input: customers = nums = [1]

### Output: [1]

## Intuition :

Frequency of 1 is 1 and length of nums array is 1 , so that we can say that is majority element in the array

## Complexity:
### Time Complexity:O(N)
O(n) bcs we traverse the whole array of length n only onc

### Space Complexity:O(1)
No Extra Space Is used.

## Solution:

```py

def majorityElement(nums):
    limit = math.floor(len(nums)/3)
    result = set()
    nums.sort()
    ans = None
    counter  = 0
    for i in range(len(nums)):
        if nums[i] != ans :
            ans = nums[i]
            counter = 1
        else:
            counter += 1
        if counter > limit:
            result.add(ans)
    return result   

nums = [3,2,3]

print(f" Majority Element : {majorityElement(nums)}")
"""
Intuition:
- Sorting the array will help us to bring all same elements in array
- so we would not need any hash map Thus no extra space will be used.

Approach:
- sort the array
- initialize a set which will contail all the elements of the array that have freq greter than n/3
- traverse through the array
- keep the counter of continous occurance of a element (as the array is sorted same elements will be together).
- if the counter for the element goes beyond n/3 then add the element in the set which we have initialized in step 2.
- return the set.
"""





