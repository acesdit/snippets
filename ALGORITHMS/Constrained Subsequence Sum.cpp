class Solution {
public:
    int constrainedSubsetSum(vector<int>& v, int k) {
        int n=v.size();
        vector<int>dp(n,0);
        priority_queue<pair<int,int>>pq;
        pq.push({v[0],0});
        dp[0]=v[0];
        int ans=v[0];
        for(int i=1;i<n;i++){
            while(!pq.empty()){
                auto p=pq.top();
                if(i-p.second>k){
                    pq.pop();
                }
                else{
                    break;
                }
            }
            dp[i]=max(v[i],v[i]+pq.top().first);
            ans=max(ans,dp[i]);
            pq.push({dp[i],i});
        }
        return ans;
    }
};
