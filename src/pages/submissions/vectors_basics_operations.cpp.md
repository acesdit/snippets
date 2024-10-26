---
extension: cpp
author: Soham Gadekar
category: Data Structures
layout: '../../layouts/SubmissionLayout.astro'
title: vectors_basics_operations
---
```cpp
#include<iostream>
#include<vector>
using namespace std;

/* Vectors are the same as dynamic arrays with the ability to resize themselves automatically when an element is inserted or deleted, with their storage being handled automatically by the container. Vector elements are placed in contiguous storage so that they can be accessed and traversed using iterators. */

int main()
{
    //vector<int> vec(); // Declaring a empty vector of data type integer

    //vector<int> vec(10); // Declaring a vector of size 10

    //vector<int> vec(10,100); // Declaring a vector of size 10 and initialization with 100

    //vector<int> vec={1,2,5,7,8,9,15}; // Declaring a vector and initialization with values 1,2,5,7,8,9,15

    vector<int> vec({1,2,5,7,8,9,15});  // Declaring a vector and initialization with using list
    vec.push_back(14); // push elements into a vector from the back
    vec.pop_back(); // pop elemnts into vector from the back
    vec.insert(vec.begin()+1,95); //insering element using first position
    vec.insert(vec.end()-1,25); //inserting element using end position
    vec.erase(vec.end()-1); //delecting element using end position
    vec.erase(vec.begin()+4); //delecting element using start position

    int x=vec.at(2);  //accesing using index
    int y=vec.front(); //accesing first element
    int z=vec.back(); //accesing last element
    int x1=vec.at(6); 
    vector <int> vec1(vec);  // copy vector
    cout<<x<<endl; 
    cout<<y<<endl;
    cout<<z<<endl;
    cout<<x1<<endl;
    cout<<vec.size()<<endl;  // size of the vector
    cout<<vec.capacity()<<endl;   // Total Capacity of vector
// Iterating over elements
    cout<<"VECTORS ELEMENTS: ";
    for(int i=0;i<vec.size(); i++)
    {
        cout<<vec[i]<<" ";
    }
    cout<<endl;

// Using iterators
    for(auto it = vec.begin(); it != vec.end(); ++it) {
        cout << *it << " ";
}
}





```
