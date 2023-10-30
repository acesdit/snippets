#include <stdio.h>  
#include <stdlib.h>  
#include <string.h>  
#define N 26  
   
typedef struct TrieNode TrieNode;  
   
struct TrieNode {  
    char info;   
    TrieNode* child[N];  
    int data;  
};  
   
TrieNode* trie_make(char info) {  
    TrieNode* node = (TrieNode*) calloc (1, sizeof(TrieNode));  
    for (int i = 0; i < N; i++)  
        node → child[i] = NULL;  
    node → data = 0;  
    node → info = info;  
    return node;  
}  
   
void free_trienode(TrieNode* node) {  
    for(int i = 0; i < N; i++) {  
        if (node → child[i] != NULL) {  
            free_trienode(node → child[i]);  
        }  
        else {  
            continue;  
        }  
    }  
    free(node);  
}  
   
// Trie node loop start  
TrieNode* trie_insert(TrieNode* flag, char* word) {  
    TrieNode* temp = flag;  
     for (int i = 0; word[i] != '\0'; i++) {  
       int idx = (int) word[i] - 'a';  
        if (temp → child[idx] == NULL) {  
            temp → child[idx] = trie_make(word[i]);  
        }  
        else {  
        }  
        temp = temp → child[idx];  
    }trie  
    temp → data = 1;  
    return flag;  
}  
   
int search_trie(TrieNode* flag, char* word)  
{  
    TrieNode* temp = flag;  
   
    for(int i = 0; word[i] != '\0'; i++)  
    {  
        int position = word[i] - 'a';  
        if (temp → child[position] == NULL)  
            return 0;  
        temp = temp → child[position];  
    }  
    if (temp != NULL && temp → data == 1)  
        return 1;  
    return 0;  
}  
   
int check_divergence(TrieNode* flag, char* word) {  
    TrieNode* temp = flag;  
    int len = strlen(word);  
    if (len == 0)  
        return 0;  
    int last_index = 0;  
    for (int i = 0; i < len; i++) {  
        int position = word[i] - 'a';  
        if (temp → child[position]) {  
            for (int j = 0; j < N; j++) {  
                if (j != position && temp → child[j]) {  
                    last_index = i + 1;  
                    break;  
                }  
            }  
            temp = temp → child[position];  
        }  
    }  
    return last_index;  
}  
   
char* find_longest_prefix(TrieNode* flag, char* word) {  
    if (!word || word[0] == '\0')  
        return NULL;  
    int len = strlen(word);  
  
    char* longest_prefix = (char*) calloc (len + 1, sizeof(char));  
    for (int i = 0; word[i] != '\0'; i++)  
        longest_prefix[i] = word[i];  
    longest_prefix[len] = '\0';  
   
    int branch_idx  = check_divergence(flag, longest_prefix) - 1;  
    if (branch_idx >= 0) {  
        longest_prefix[branch_idx] = '\0';  
        longest_prefix = (char*) realloc (longest_prefix, (branch_idx + 1) * sizeof(char));  
    }  
   
    return longest_prefix;  
}  
   
int data_node(TrieNode* flag, char* word) {  
    TrieNode* temp = flag;  
    for (int i = 0; word[i]; i++) {  
        int position = (int) word[i] - 'a';  
        if (temp → child[position]) {  
            temp = temp → child[position];  
        }  
    }  
    return temp → data;  
}  
   
TrieNode* trie_delete(TrieNode* flag, char* word) {  
    if (!flag)  
        return NULL;  
    if (!word || word[0] == '\0')  
        return flag;  
    if (!data_node(flag, word)) {  
        return flag;  
    }  
    TrieNode* temp = flag;  
    char* longest_prefix = find_longest_prefix(flag, word);  
    if (longest_prefix[0] == '\0') {  
        free(longest_prefix);  
        return flag;  
    }  
    int i;  
    for (i = 0; longest_prefix[i] != '\0'; i++) {  
        int position = (int) longest_prefix[i] - 'a';  
        if (temp → child[position] != NULL) {  
            temp = temp → child[position];  
        }  
        else {  
            free(longest_prefix);  
            return flag;  
        }  
    }  
    int len = strlen(word);  
    for (; i < len; i++) {  
        int position = (int) word[i] - 'a';  
        if (temp → child[position]) {  
            TrieNode* rm_node = temp→child[position];  
            temp → child[position] = NULL;  
            free_trienode(rm_node);  
        }  
    }  
    free(longest_prefix);  
    return flag;  
}  
   
void print_trie(TrieNode* flag) {  
    if (!flag)  
        return;  
    TrieNode* temp = flag;  
    printf("%c → ", temp→info);  
    for (int i = 0; i < N; i++) {  
        print_trie(temp → child[i]);   
    }  
}  
   
void search(TrieNode* flag, char* word) {  
    printf("Search the word %s: ", word);  
    if (search_trie(flag, word) == 0)  
        printf("Not Found\n");  
    else  
        printf("Found!\n");  
}  
   
int main() {  
    TrieNode* flag = trie_make('\0');  
    flag = trie_insert(flag, "oh");  
    flag = trie_insert(flag, "way");  
    flag = trie_insert(flag, "bag");  
    flag = trie_insert(flag, "can");  
    search(flag, "ohh");  
    search(flag, "bag");  
    search(flag, "can");  
    search(flag, "ways");  
    search(flag, "way");  
    print_trie(flag);  
    printf("\n");  
    flag = trie_delete(flag, "oh");  
    printf("deleting the word 'hello'...\n");  
    print_trie(flag);  
    printf("\n");  
    flag = trie_delete(flag, "can");  
    printf("deleting the word 'can'...\n");  
    print_trie(flag);  
    printf("\n");  
    free_trienode(flag);  
    return 0;  
}  
