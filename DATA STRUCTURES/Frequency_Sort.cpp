
#include<iostream>
#include<map>
#include<queue>
using namespace std;

int main()
{
    int n;
    map<int,int> mp;
    cout<<"Ener the size of array : ";
    cin>>n;
    int arr[n];
    cout<<"Enter elements of array :"<<endl;
    for(int i=0;i<n;i++)
    {
        cin>>arr[i];
        mp[arr[i]]++;
    }
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    for(auto [x,y]:mp)
    {
        pq.push({y,x});
    }
    
    cout<<"Sorted numbers according to their frequency are : "<<endl;
    while(!pq.empty())
    {
        cout<<pq.top().second<<" - "<<pq.top().first<<" times"<<endl;
        pq.pop();
    }
  return 0;  
}