---
extension: cpp
author: nikhil730
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: PowerOfFour
---
```cpp
#include<bits/stdc++.h>
using namespace std;
bool isPowerOfFour(int n) {
    for(int i=0;i<=31;i++){
        double small=pow(4,i);
        if(small==n){
            return true;
        }
    }
    return false;
}
int main(){
  int n=4;
  bool ans=isPowerOfFour(n);
  return 0;
}
```
