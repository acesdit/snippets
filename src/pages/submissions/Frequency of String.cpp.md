---
extension: cpp
author: Shraddha7171
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: Frequency of String
---
```cpp
#include <iostream>

using namespace std;
int main()
{
   char c[] = "C++ programming is not easy.", check = 'm';
   int count = 0;

   for(int i = 0; c[i] != '\0'; ++i)
   {
       if(check == c[i])
           ++count;
   }
   cout << "Frequency of " << check <<  " = " << count;
   return 0;
}


```
