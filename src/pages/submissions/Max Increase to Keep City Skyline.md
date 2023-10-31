---
extension: md
author: atharvaparab9160
category: Interview Questions
layout: '../../layouts/SubmissionLayout.astro'
title: Max Increase to Keep City Skyline
---
# Problem Statement:

There is a city composed of n x n blocks, where each block contains a single building shaped like a vertical square prism. You are given a 0-indexed n x n integer matrix grid where grid[r][c] represents the height of the building located in the block at row r and column c.

A city's skyline is the outer contour formed by all the building when viewing the side of the city from a distance. The skyline from each cardinal direction north, east, south, and west may be different.

We are allowed to increase the height of any number of buildings by any amount (the amount can be different per building). The height of a 0-height building can also be increased. However, increasing the height of a building should not affect the city's skyline from any cardinal direction.

Return the maximum total sum that the height of the buildings can be increased by without changing the city's skyline from any cardinal direction.

## Example 1:

![matrix with each box having height of building](https://assets.leetcode.com/uploads/2021/06/21/807-ex1.png)

### Input: [[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]

### Output: 35

### Explanation:

The building heights are shown in the center of the above image.
The skylines when viewed from each cardinal direction are drawn in red.
The grid after increasing the height of buildings without affecting skylines is:
gridNew = [ [8, 4, 8, 7],
            [7, 4, 7, 7],
            [9, 4, 8, 7],
            [3, 3, 3, 3] ]

## Example 2:

### Input: [[0,0,0],[0,0,0],[0,0,0]]

### Output: 0

## Explanation
Increasing the height of any building will result in the skyline changing.

## Intuition :

Basically here we need to understand the intuition behind the question first.
As it say that we need to keep the skyline constant.
So what we can do is for every building check the max height building in its row and column.
Which means that even if we increase the height of current building to the minimum of the row and column building our skyline will remains constant.

## Complexity:
### Time Complexity:
**O(N^2)**, where N is the number of rows (and columns) of the grid. We iterate through every cell of the grid.
*we are traversing the complete matrix. actually it 2* O(N^2) but we neglect here the multiplicant.*

### Space Complexity:
**O(N)**, the space used by max_r and max_c.

## Solution:

```py

    def maxIncreaseKeepingSkyline(grid):
        max_r = []
        max_c = []
        height = 0

        for i in grid:
            max_r.append(max(i))
        for i in range(len(grid)):
            l = []
            for j in range(len(grid[0])):
                l.append(grid[j][i])
            max_c.append(max(l)) 

        for r in range(len(grid)):
            for c in range(len(grid[0])):

                if grid[r][c] < min(max_r[r],max_c[c]):
                    height += min(max_r[r],max_c[c]) - grid[r][c]

        return height  
arr_heights = [[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]

print(f" the maximum amount of water the container can store is {maxIncreaseKeepingSkyline(arr_heights)}")
