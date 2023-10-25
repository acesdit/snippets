---
extension: md
author: Vardhaman Bhandari
category: Interview Questions
layout: '../../layouts/SubmissionLayout.astro'
title: Trapping Rain Water Problem
---
# Problem Statement:

Given an array of non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

## Example 1:

![A bar chart with 12 bars of different heights. The bars represent the elevation of a terrain. The blue section above the bars represents the amount of rainwater that can be trapped after raining.](https://assets.leetcode.com/uploads/2018/10/22/rainwatertrap.png)

### Input: [0,1,0,2,1,0,1,3,2,1,2,1]

### Output: 6

### Explanation:

The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

## Example 2:

![Trapping Rain Water Problem Illustration](https://www.techiedelight.com/wp-content/uploads/Rain-Water-Trapping.png)

### Input: [7,0,4,2,5,0,6,4,0,5]

### Output: 25

## Approach :

The idea is to calculate the maximum height bar on the left and right of every bar. The amount of water stored on top of each bar is equal to the minimum among the leading’ bar to the left and right minus the current bar’s height.

## Solution

```java
class Main
{
    // Function to find the amount of water that can be trapped within
    // a given set of bars
    public static int trap(int[] heights)
    {
        // maintain two pointers left and right, pointing to the leftmost and
        // rightmost index of the input array
        int left = 0, right = heights.length - 1, water = 0;

        int maxLeft = heights[left];
        int maxRight = heights[right];

        while (left < right)
        {
            if (heights[left] <= heights[right])
            {
                left++;
                maxLeft = Integer.max(maxLeft, heights[left]);
                water += (maxLeft - heights[left]);
            }
            else {
                right--;
                maxRight = Integer.max(maxRight, heights[right]);
                water += (maxRight - heights[right]);
            }
        }

        return water;
    }

    public static void main(String[] args)
    {
        int[] heights = { 7, 0, 4, 2, 5, 0, 6, 4, 0, 5 };

        System.out.print("The maximum amount of water that can be trapped is " +
                                trap(heights));
    }
}
/*
The solution you provided is a linear time and constant space solution to the Trapping Rain Water Problem. It works by using two pointers, left and right, to traverse the input array from left to right and right to left, respectively. The pointers are initialized to the leftmost and rightmost indices of the array.

At each step, the algorithm compares the heights of the bars at the left and right indices. If the height of the bar at the left index is smaller than or equal to the height of the bar at the right index, then the algorithm updates the left pointer to the next index and calculates the amount of water trapped above the bar at the left index. The amount of water trapped above the bar at the left index is calculated by subtracting the height of the bar at the left index from the minimum of the maximum heights of the bars seen so far to the left and right of the left index.

If the height of the bar at the right index is smaller than the height of the bar at the left index, then the algorithm updates the right pointer to the previous index and calculates the amount of water trapped above the bar at the right index. The amount of water trapped above the bar at the right index is calculated by subtracting the height of the bar at the right index from the minimum of the maximum heights of the bars seen so far to the left and right of the right index.

The algorithm terminates when the left and right pointers meet. At this point, all of the bars in the input array have been processed and the total amount of water trapped has been calculated.
*/
```
