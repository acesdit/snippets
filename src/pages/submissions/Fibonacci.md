---
extension: java
author: tanvibaviskar
category: Interview Questions
layout: '../../layouts/SubmissionLayout.astro'
title: Fibonacci
---
public class Fibonacci {
    public static void main(String[] args) {
        //System.out.println(fibo(7));
        //for (int i = 0; i <11 ; i++) {
          //  System.out.println(fiboFormula(i));

       // }
        System.out.println(fiboFormula(50));
    }

    static int fiboFormula(int n){
        //just for demo , use long instead
       return (int)((Math.pow(((1+Math.sqrt(5)) / 2), n))/Math.sqrt(5)) ;
    }
    static int fibo(int n){

        //base condition
        if (n<2){
            return n ;
        }

        //this is not tail recursion as the addition of both is the last statement of the function
        return fibo(n-1)+ fibo (n-2);  // formula of fibonacci number
    }
}