---
extension: cpp
author: nikhil730
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: MinimumSumOfMountain
---
```cpp
#include<bits/stdc++.h>
using namespace std;

int minimumSum(vector<int>& v) {
        int n=v.size();
        int ans=INT_MAX;
        vector<int>pre,post;
        int mi=v[0];
        pre.push_back(mi);
        for(int i=1;i<n;i++){
            mi=min(mi,v[i]);
            pre.push_back(mi);
        }
        mi=v[n-1];
        post.push_back(mi);
        for(int i=n-2;i>=0;i--){
            mi=min(mi,v[i]);
            post.push_back(mi);
        }
        reverse(post.begin(),post.end());
        for(int i=1;i<n-1;i++){
            if(v[i]>pre[i-1] && v[i]>post[i+1]){
                ans=min(ans,v[i]+pre[i-1]+post[i+1]);
            }
        }
        if(ans==INT_MAX) return -1;
        return ans;
}
int main(){
  vector<int>v{1,2,5,6,4,3,1};
  int ans=minimumSum(v);
  cout<<ans;
  return 0;
}
```
