---
extension: cpp
author: Atharva Morankar
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: Longest common subsequence
---
```cpp

#include<iostream>
using namespace std;

int rec(int i, int j, string x, string y)
{
    if(i==0 || j==0)
    {
        return 0;
    }
    if(x[i-1]==y[j-1])
    {
        return 1 + rec(i-1,j-1,x,y);
    }
    else
    {
        return max(rec(i,j-1,x,y),rec(i-1,j,x,y));
    }
   return 0; 
}

int main()
{
    string x,y;
    cout<<"Enter strings :"<<endl;
    cin>>x;
    cin>>y;
    cout<<"LCS is - "<<rec(x.size(),y.size(),x,y);
    return 0;
}
```
