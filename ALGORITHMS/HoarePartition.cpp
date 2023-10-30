//Hoare Partition
//Better than Lomuto Partion
// average time complexity = O(n)
// auxiliary space complexity = O(1)

#include <bits/stdc++.h>
using namespace std;

int partition(int arr[], int l, int h)
{   
    int pivot=arr[l];
    int i=l-1,j=h+1;
    while(true){
        do{
            i++;
        }while(arr[i]<pivot);
        do{
            j--;
        }while(arr[j]>pivot);
        if(i>=j)return j;
        swap(arr[i],arr[j]);
    }
}
 
int main() {
	
    int arr[]={5,3,8,4,2,7,1,10};
	
	int n=sizeof(arr)/sizeof(arr[0]);
	
	partition(arr,0,n-1);
	
	for(int x: arr)
	    cout<<x<<" ";
}