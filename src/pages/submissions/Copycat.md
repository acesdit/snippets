---
extension: md
author: Yash Jawale
category: Interview Questions
layout: '../../layouts/SubmissionLayout.astro'
title: Copycat
---
/*Ashish was copying from Rahit in the exam. So, Rahit told him to change the answers a little bit so that the examiner cannot find the fraud. But silly Ashish in the way started to change all the answers that were needed. He shuffled the letters in each word in a way where the maximum number of letters were misplaced.

For a given word, find the maximum difference that Ashish can generate between his answer and Rahit’s answer.

Suppose Rahit wrote “car” for an answer, Ashish can write “acr” with difference 2, or “arc” with differnece 

Output:

N number of lines with an integer each denoting possible maximum difference.
*/

#include<bits/stdc++.h>

using namespace std;
string s, s1;
int n;

int func() {
    if (n <= 1) return 0;
    int ans = 0, c = 0;
    sort(s.begin(), s.end());
    for (int i = 0; i < n; i++)
        if (s1[i] != s[i]) c++;
    ans = max(ans, c);
    c = 0;
    while (next_permutation(s.begin(), s.end())) {
        for (int i = 0; i < n; i++)
            if (s1[i] != s[i]) c++;
        ans = max(ans, c);
        c = 0;
    }
    return ans;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        cin >> s;
        s1 = s;
        n = s.length();
        cout << func() << endl;
    }

    return 0;
}
