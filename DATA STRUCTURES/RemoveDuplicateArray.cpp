// Remove Duplicate elements from Sorted Array
// Time Complexity : O(n) 
// Auxiliary Space : O(1)

#include <iostream>
#include <cmath>
using namespace std;

 int remDups(int arr[], int n)
{
	int temp[n];

	temp[0] = arr[0];

	int res = 1;

	for(int i = 1; i < n; i++)
	{
		if(temp[res - 1] != arr[i])
		{
			temp[res] = arr[i];
			res++;
		}
	}

	for(int i = 0; i < res; i++)
	{
		arr[i] = temp[i];
	}

	return res;
}
    
int main() {
	
      int arr[] = {10, 20, 20, 30, 30, 30}, n = 6;

      cout<<"Before Removal"<<endl;

       for(int i = 0; i < n; i++)
       {
       		cout<<arr[i]<<" ";
       }

       cout<<endl;

       n = remDups(arr, n);

       cout<<"After Removal"<<endl;

       for(int i = 0; i < n; i++)
       {
       		cout<<arr[i]<<" ";
       }
    
};