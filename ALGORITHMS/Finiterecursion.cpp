#include<bits/stdc++.h>
using namespace std;
//Recursive function
void get(int n)
{
    //When condition is met recursion terminates
    if(n==0)
       return;
    cout<<n<<" ";
    //call recursively
    get(n-1);
}
int main()
{
    int n;
    cout<<"Enter value of n: ";
    cin>>n;
    //calling recursive function
    get(n);
    return 0;
}