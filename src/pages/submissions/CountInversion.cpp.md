---
extension: cpp
author: DipeshC1707
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: CountInversion
---
```cpp
/*
Given an array of integers. Find the Inversion Count in the array. 

Inversion Count: For an array, inversion count indicates how far (or close) the array is 
from being sorted. If the array is already sorted then the inversion count is 0.
If an array is sorted in the reverse order then the inversion count is the maximum. 
Formally, two elements a[i] and a[j] form an inversion if a[i] > a[j] and i < j.

Example 1:

Input: N = 5, arr[] = {2, 4, 1, 3, 5}
Output: 3
Explanation: The sequence 2, 4, 1, 3, 5 
has three inversions (2, 1), (4, 1), (4, 3).

Example 2:

Input: N = 5
arr[] = {2, 3, 4, 5, 6}
Output: 0
Explanation: As the sequence is already 
sorted so there is no inversion count.
*/

//{ Driver Code Starts
#include <bits/stdc++.h>
using namespace std;


// } Driver Code Ends
class Solution{
  public:
    // arr[]: Input Array
    // N : Size of the Array arr[]
    // Function to count inversions in the array.
    void merge(long long arr[], long long n, long long l, long long h, long long mid, long long int &count) {
        long long i = l;
        long long j = mid+1;
        vector<long long>v;
        
        while(i <= mid && j <= h) {
            if(arr[i]<=arr[j]) {
                v.push_back(arr[i]);
                i++;
            }
            else {
                count += mid-i+1;
                v.push_back(arr[j]);
                j++;
            }
        }
        
        while(i<=mid) {
            v.push_back(arr[i]);
            i++;
        }
        while(j<=h) {
            v.push_back(arr[j]);
            j++;
        }
        
        long long k = l;
        for(long long l = 0; l<v.size() ; l++) {
            arr[k++] = v[l];
        }
    }
    
    void merge_sort(long long arr[], long long n, long long l, long long h, long long int &count) {
        if(l<h) {
            int mid = (l+h)/2;
            merge_sort(arr,n,l,mid,count);
            merge_sort(arr,n,mid+1,h,count);
            merge(arr,n,l,h,mid,count);
        }
    }
    
    long long int inversionCount(long long arr[], long long N)
    {
        // Your Code Here
        long long int count = 0;
        
        merge_sort(arr,N,0,N-1,count);
        
        return count;
    }

};

//{ Driver Code Starts.

int main() {
    
        long long N;
        cin >> N;
        
        long long A[N];
        for(long long i = 0;i<N;i++){
            cin >> A[i];
        }
        Solution obj;
        cout << obj.inversionCount(A,N) << endl;
}```
