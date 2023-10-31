---
extension: cpp
author: Yash Jawale
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: Addition of two complex numbers
---
```cpp
#include <stdio.h>
//structure for storing the real and imaginery
//values of complex number
struct complexnum{
   int real, img;
};
complexnum sumcomplex(complexnum a, complexnum b){
   struct complexnum c;
   //Adding up two complex numbers
   c.real = a.real + b.real;
   c.img = a.img + b.img;
   return c;
}
int main(){
   struct complexnum a = {1, 2};
   struct complexnum b = {4, 5};
   struct complexnum c = sumcomplex(a, b);
   printf("Complex number 1: %d + i%d", a.real, a.img);
   printf("Complex number 2: %d + i%d", b.real, b.img);
   printf("Sum of the complex numbers: %d + i%d", c.real, c.img);
   return 0;
}
```
