---
extension: md
author: atharvaparab9160
category: Interview Questions
layout: '../../layouts/SubmissionLayout.astro'
title: Longest Substring Without Repeating Characters
---
# Problem Statement:

Given a string s, find the length of the longest substring without repeating characters.

## Example 1:

### Input: "abcabcbb"

### Output: 3

### Explanation:

The answer is "abc", with the length of 3.

## Example 2:
 
### Input: "bbbbb"

### Output: 1

### Explanation:

The answer is "b", with the length of 1.

## Example 3:

### Input: "pwwkew"

### Output: 3

### Explanation :

The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

## Intuition:
The intuition behind this code is to use a sliding window approach to maintain a substring that doesn't contain repeating characters. By keeping track of the most recent index where each character appeared, the algorithm can efficiently adjust the starting point of the current substring when a repeating character is encountered.

## Complexity:
### Time Complexity:
The time complexity of this algorithm is **O(N)**

### Space Complexity:
**O(min(N, M))** ,where N is the length of the input string and m is the size of the character set (number of distinct characters in the input string).

## Solution :

```py

def lengthOfLongestSubstring(s):
    if not s:
        return 0
    char_index = {} 
    start = 0       
    max_length = 0   
    for end, char in enumerate(s):
        if char in char_index and char_index[char] >= start:
            start = char_index[char] + 1
        
        char_index[char] = end
        max_length = max(max_length, end - start + 1)
    
    return max_length

String = [1,8,6,2,5,4,8,3,7]

print(f" length of the longest substring without repeating characters is {lengthOfLongestSubstring(String)}")


"""
Approch:

The code uses a sliding window approach with two pointers, start and end, that define the current substring without repeating characters. The char_index dictionary is used to store the most recent index where each character appeared.

1. For each character encountered, the code checks if the character is already in char_index and if its index is greater than or equal to  the current start index. If so, it means that the character has appeared previously in the current substring. In this case, the start index is moved to the position immediately after the last occurrence of the character.
2.The char_index dictionary is updated with the current character's index.
3.The length of the current substring is calculated using end - start + 1, and the max_length is updated if necessary.
"""





