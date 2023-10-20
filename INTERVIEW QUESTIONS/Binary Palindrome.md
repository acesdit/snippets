# Write a C++ Program to Check if binary representation of a number is palindrome

Input: x=0
Output: 1

Input: x=10
Output: 0

```cpp
#include<iostream>
using namespace std;

// This function returns true if k'th bit in x is set (or 1). For example if x (0010) is 2 and k is 2, then it returns true
bool isKthBitSet(unsigned int x, unsigned int k)
{
	return (x & (1 << (k - 1))) ? true : false;
}

// This function returns true if binary representation of x is palindrome.
// For example (1000...001) is palindrome
bool isPalindrome(unsigned int x)
{
	int l = 1; // Initialize left position
	int r = sizeof(unsigned int) * 8; // initialize right position

	// One by one compare bits
	while (l < r)
	{
		if (isKthBitSet(x, l) != isKthBitSet(x, r))
			return false;
		l++; r--;
	}
	return true;
}


int main()
{
	unsigned int x = 0;
	cout << isPalindrome(x) << endl;
	x = 19;
	cout << isPalindrome(x) << endl;
	return 0;
}

/*
It defines two functions:

isKthBitSet(unsigned int x, unsigned int k): This function takes two unsigned integers as parameters, x and k, and checks if the kth bit
(0-based index from the right) in the binary representation of x is set to 1. It uses bitwise AND (&) to perform this check.
If the kth bit is set, it returns true; otherwise, it returns false.

isPalindrome(unsigned int x): This function takes an unsigned integer x as a parameter and checks if its binary representation is a palindrome.
It initializes two variables, l and r, to represent the left and right positions of the binary representation, respectively.
The variable l starts from 1 (the rightmost bit), and r starts from the total number of bits in an unsigned integer (sizeof(unsigned int) * 8).
The function then iterates through the binary representation from both ends, comparing the bits using the isKthBitSet function. If the bits at positions l
and r are not equal, the function returns false. If it successfully compares all the bits without finding a mismatch, it returns true

*/

```
