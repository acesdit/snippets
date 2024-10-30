class ManachersAlgorithm {
    public String longestPalindrome(String s) {
        
         s="#"+s.replaceAll("","#")+"#";
        int[] p=new int[s.length()];
        int l=1;
        int r=1;
        int center=0;
        int maxLen=0;

        for(int i=0;i<s.length();i++){

            if(i<r){
                 p[i]=Math.max(0,Math.min(r-i,p[r+l-i]));
                
            }
            else{
                p[i]=1;
            }
           
            while(i-p[i]>=0 && i+p[i]<s.length() && s.charAt(i-p[i]) == s.charAt(i+p[i])){
                p[i]++;
            }

            if(p[i]+i > r){
                l= i-p[i];
                r= i+p[i];
            }

            if(p[i]>maxLen){
                maxLen=p[i];
                center=i;
            }  
        }

        int start= (center - maxLen  +1);


    return s.substring((center-maxLen+1),(center+maxLen)).replaceAll("#","");
    }
}