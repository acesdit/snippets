
 Top DSA interview Question       

1. Two Sum
 Given an array of integers nums and an integer target, return indices of the two numbers such that they add up 
  to target

solution:

        // solution hashmap
        unordered_map<int,int>mp;

        for(int i=0;i<nums.size(); i++){
            auto it =mp.find(target - nums[i]);

            if(it != mp.end()){
                return {i, it -> second};
            }
                mp.insert({nums[i] , i});
        }
          return  {};

2. Maximum subarray
Kanden's Algorithm
Given an integer array nums, find the subarraywith the largest sum, and return its sum.

solution:

      int maxSubArray(vector<int>& nums) {
        
      int sum=0;
      int maxi=nums[0];
      
        for(int i=0;i<nums.size();i++){
            sum =sum +nums[i];
             maxi =max(maxi,sum);
            
            if(sum<0){
                sum=0;
            }
        }
        return maxi;


3. Spiral Matrix

Given an m x n matrix, return all elements of the matrix in spiral order.
input:
[
[1, 2,  3],
[4, 5,  6],
[7, 8,  9]
]

output : [1,2,3,6,9,8,7,4,5]


      class Solution {
     public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
    // run loop in 4 direction  left -> right, top -> bot , right -> left, bot -> up
        int n= matrix.size();
        int m= matrix[0].size();
        int  left=0 , top=0,num=1;
        int  right = m-1 , bottom = n-1;
        vector<vector<int>>mat(n,vector<int>(n,0));

        while(top <= bottom && left <= right){

        for(int i = left ; i<=right;i++){
            mat[top][i]=num++;
        }
        top++;

        for(int i=top;i<=bottom;i++){
            mat[i][right] =  num++;
        }
        
        right--;
        // important case
        if(top <= bottom){
        for(int i=right; i>=left;i--){
           mat[bottom][i]= num++;
        }
        bottom--;
        }
        // important case 
        if(left <= right){
        for(int i=bottom;i>=top;i--){
            mat[i][left] =  num++;
        }
        left++;
        }
        }
        return mat;
    }
    };


4. Search in rotated sorted array
Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

solution:

    int search(vector<int>& nums, int target) {
        int n=nums.size();
        int l=0;
        int h= n-1;
        int mid = l + (h-l)/2;
        while(l<=h){
            mid = l+ (h-l)/2;

            if(nums[mid] == target){
                return mid;
            }

            if(nums[mid] >= nums[0]){
                if(target >= nums[0] && target <= nums[mid]){
                    h= mid -1;
                }
                else{
                    l = mid +1;
                }
            }

            else{
                if(target >= nums[mid] && target<=nums[n-1]){
                    l = mid+1;
                }
                else{
                    h = mid -1;
                }
            }
        }
        
         return -1;

    }


5. Valid Parenthesis
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.

     class Solution {
     public:
    bool isValid(string s) {
        stack <char> st;

        for(int i=0;i<s.length();i++){
            char ch =s[i];
            if(ch=='(' || ch=='[' || ch=='{'){

                st.push(ch);

            }

            else{
                if(!st.empty()){
                    char tp =st.top();
                    if((tp=='(' && ch==')') ||(tp=='[' && ch==']') || (tp=='{' && ch=='}') ){
                        st.pop();
                    }
                    else{
                        return false;
                    }

                }  
                else{
                    return false;
                }             

            }
           }
        

        if(st.empty()){
            return true;
        }
        return false;
    }
    };


6. Subarrays sum equals to k
Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.
 Sliding window Algorithm

solution:

     int subarraySum(vector<int>& nums, int goal) {
        
         int n = nums.size();
        int ans=0;
        unordered_map<int,int>mp;
         int sum=0;
         for(int i=0;i<n;i++){
           sum  += nums[i];

           if (sum == goal){
               ans++;
           }
// x = sum - goal , if x already exits in hashtable then subarray of sum k is present increment the ans
           if(mp.find(sum-goal)!=mp.end()){
               ans = mp[sum-goal] + ans;
           }
 // if any entry occur more than 1 increment the fre 
           if(mp.find(sum)!= mp.end()){
               mp[sum]++;
           }
 // if there is only one entry
           else{
               mp[sum]=1;
           }

         }
         return ans;
    }


7. continous subarray sum

Given an integer array nums and an integer k, return true if nums has a good subarray or false otherwise.
A good subarray is a subarray where: its length is at least two, and
the sum of the elements of the subarray is a multiple of k.


solution:

     bool checkSubarraySum(vector<int>& nums, int k) {
        int sum=0;
        int n = nums.size();
        unordered_map<int,int>mp;
        mp[0] = -1;
        for(int i=0;i<n; i++){
            sum += nums[i];

            if(mp.find(sum%k) == mp.end()){
                mp[sum%k]= i;
            }
            if( mp.find(sum%k) != mp.end() && i -mp[sum%k] >= 2){
                return 1;
            }

        } 
        return 0;

8. Palindronic Partition
Given a string s, partition s such that every substring of the partition is a Palindrome
A palindrome is a string that reads the same forward and backward.Return all possible palindrome partitioning of string s.

solution:

    class Solution {
    public:
    vector<vector<string>> res;
    
    bool palindrome(string s){
        if(s.size()==0) return true;
        int len = s.size();
        for(int i=0; i<len; i++) if(s[i]!= s[len-1-i]) return false;
        return true;
    }

    void compute(vector<string> &tmp, string s, int index){
        if(index == s.size())  res.push_back(tmp);
        else{
            string substr1;
            for(int i=index; i<s.size(); i++){
                substr1 += s[i];
                if(substr1[0] != s[i]) continue;
                if(palindrome(substr1)){
                    // cout << "sub: " << substr1 << endl; 
                    tmp.push_back(substr1);
                    compute(tmp, s, i+1);
                    tmp.pop_back();
                }
            }    
        } 
    }

    vector<vector<string>> partition(string s) {
        vector<string> tmp;
        compute(tmp, s, 0);
        return res;
    }
    };


9. Merge k sorted Linked list

You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

solution:


     class Solution {
     public:
    
    ListNode* merge(ListNode * l , ListNode * r){
        ListNode * merged = new  ListNode();
        ListNode * d = merged;

        while(l && r){
            if(l -> val < r -> val){
                d -> next = l;
                l = l-> next;
            }
            else{
                d -> next = r;
                r = r -> next;
            }
            d = d -> next;
        }

         while(l ){
            d -> next = l;
            l = l-> next; 
            d = d -> next;
         }

        while(r ){
            d -> next = r;
            r = r-> next; 
            d = d -> next;
        }
     return merged -> next;
    }

    ListNode * mergesort(vector<ListNode*>& lists , int l , int h){
        if(l >=h){
            return lists[h];
        }
        int mid = l + (h-l)/2;
        ListNode * left = mergesort(lists , l , mid);
        ListNode * right = mergesort(lists , mid +1 , h);
        return merge(left , right);
    }

    ListNode* mergeKLists(vector<ListNode*>& lists) {
        if(lists.size() == 0) {
            return NULL;
        }
       return mergesort(lists  ,0, lists.size()-1);
    }
    };



10. Number of Islands 
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water

solution:

    class Solution {
    public:
 
    void bfs(int row, int col , vector<vector<char>> &grid,vector<vector<int>>&vi){
        int n=grid.size() , m= grid[0].size();
        vi[row][col]=1;
        queue<pair<int,int>>q;
        q.push({row, col});

        while(!q.empty()){
            int row = q.front().first;
            int col = q.front().second; 
            q.pop();
            
            int nrow = row;
            int ncol = col+1;

            if(nrow>=0 && nrow<n && ncol>=0 && ncol<m && grid[nrow][ncol] == '1' && !vi[nrow][ncol]){
                vi[nrow][ncol]=1;
                q.push({nrow, ncol});
            }

            nrow = row;
            ncol = col-1;

           if(nrow>=0 && nrow<n && ncol>=0 && ncol<m && grid[nrow][ncol] == '1' && !vi[nrow][ncol]){
                vi[nrow][ncol]=1;
                q.push({nrow, ncol});
            }

            nrow = row-1;
            ncol = col;
            if(nrow>=0 && nrow<n && ncol>=0 && ncol<m && grid[nrow][ncol] == '1' && !vi[nrow][ncol]){
                vi[nrow][ncol]=1;
                q.push({nrow, ncol});
            }

            nrow = row+1;
            ncol = col;
            if(nrow>=0 && nrow<n && ncol>=0 && ncol<m && grid[nrow][ncol] == '1' && !v[nrow][ncol]){
                vi[nrow][ncol]=1;
                q.push({nrow, ncol});
            }
        }
    }
 

    int numIslands(vector<vector<char>>& grid) {
        int n= grid.size();
        int m = grid[0].size();

        vector<vector<int>>vi(n,vector<int>(m,0)); // to keep track of nodes 
        int ans =0;
        for(int row=0;row < n ;row++){
            for(int col =0; col< m; col++){
                if(!vi[row][col] && grid[row][col]=='1'){
                    ans++;
                   bfs( row, col, grid , vi);
                }
            }
        }
        return ans;
    }
    };


11. Maximum Path sum 
A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.
The path sum of a path is the sum of the node's values in the path.
Given the root of a binary tree, return the maximum path sum of any non-empty path.

Solution:

     class Solution {
      public:
    // what to we do when the base case is reached is the main questions comes
        int getmax(TreeNode* root, int &maxpath){
        if(!root){
            return 0;
        }
        int left =  getmax(root -> left , maxpath);
        int right = getmax(root -> right , maxpath);
        // below it is an important step to ignore the negative path sum to get maxpathsum
        if(left < 0) left=0;
        if(right < 0) right=0;
        maxpath = max(maxpath , root -> val + left + right);
        // intution from max height of the binary tree
        return root -> val + max( left , right); 
    }

    // question is important in terms of backtracking 

    int maxPathSum(TreeNode* root) {
        if(!root){
            return 0;
        }
        if(!root-> left && !root -> right){
            return root -> val;
        }
       int maxpath =INT_MIN;
       getmax(root,maxpath);
       return maxpath;
    }
    };


12. Course Scedhule

There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false

solution:
          
         // Khan's Algorithm

    class Solution {
     public:
    bool canFinish(int V, vector<vector<int>>& prerequisites) {
		//	int V = prerequisites.size();
        vector<int>adj[V];
		vector<int>indegree(V,0);

        // creation of graph
        for(auto it : prerequisites){
			adj[it[0]].push_back(it[1]);
		}

	    // store all the indegree of the nodes 
	    for(int i=0;i<V;i++){
	        for(auto it : adj[i]){
	            indegree[it]++;
	        }
	    }
	    //  insert that nodes which have indegree of 0
	    queue<int>q;
	    for(int i=0;i<V;i++){
	        if(indegree[i]==0){
	            q.push(i);
	        }
	    }
	    vector<int>ans;
	    
	    while(!q.empty()){
	        int node = q.front();
	        q.pop();
	        ans.push_back(node);
	        for(auto it : adj[node]){
	            // for each node decrease its adjacent nodes indegree count 
	            // if indegree becomes 0 push in queue
	            indegree[it]--;
	            if(indegree[it] == 0){
	                q.push(it);
	            }
	        }
	    }
	    return ans.size()==V;
    }
    };
