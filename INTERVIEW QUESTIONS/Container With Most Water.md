# Problem Statement:

You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

## Example 1:

![A bar chart with 9 bars of different heights. The bars represent the elevation of a terrain. The blue section above the bars and between 2 bars represents the amount of water that can be contained](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg)

### Input: [1,8,6,2,5,4,8,3,7]

### Output: 49

### Explanation:

The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

## Example 2:

### Input: [1,1]

### Output: 1

## Intuition :

The two-pointer technique starts with the widest container and moves the pointers inward based on the comparison of heights.
Increasing the width of the container can only lead to a larger area if the height of the new boundary is greater. By moving the pointers towards the center, we explore containers with the potential for greater areas.

## Complexity:
### Time Complexity:
The time complexity of this algorithm is **O(n)**, where n is the number of elements in the height array. This is because we explore all possible combinations of two lines once, and each operation inside the loop is performed in constant time.

### Space Complexity:
The space complexity is **O(1)**, which means the algorithm uses a constant amount of extra space regardless of the input size. We only use a few extra variables (left, right, maxWater, width, h, and water) that do not depend on the input size.

## Solution:

```py

def maxArea( height):
    left = 0           
    right = len(height) - 1  
    maxWater = 0        
    
    while left < right:
        width = right - left
        
        h = min(height[left], height[right])
        
        water = width * h
        
        maxWater = max(maxWater, water)
        
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return maxWater

arr_heights = [1,8,6,2,5,4,8,3,7]

print(f" the maximum amount of water the container can store is {maxArea(arr_heights)}")
"""
1. We use a two-pointer approach, starting with the left pointer at the leftmost edge of the array (left = 0) and the right pointer at the rightmost edge of the array (right = height.size() - 1).

2. We initialize a variable maxWater to store the maximum water capacity, initially set to 0.

3. We enter a while loop, which continues as long as the left pointer is less than the right pointer. This loop allows us to explore all possible combinations of two lines.

4. Inside the loop, we calculate the width of the container by subtracting the positions of the two pointers: width = right - left.

5. We calculate the height of the container by finding the minimum height between the two lines at positions height[left] and height[right]: h = min(height[left], height[right]).

6. We calculate the water capacity of the current container by multiplying the width and height: water = width * h.

7. We update the maxWater variable if the current container holds more water than the previous maximum: maxWater = max(maxWater, water).

8. Finally, we adjust the pointers: if the height at the left pointer is smaller than the height at the right pointer (height[left] < height[right]), we move the left pointer to the right (left++); otherwise, we move the right pointer to the left (right--).

9. We repeat steps 4-8 until the left pointer is less than the right pointer. Once the pointers meet, we have explored all possible combinations, and the maxWater variable contains the maximum water capacity.

10. We return the maxWater value as the final result.
"""





