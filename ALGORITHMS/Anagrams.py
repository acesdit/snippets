def are_anagrams(str1, str2):
    # Remove spaces and convert to lowercase
    clean_str1 = str1.replace(" ", "").lower()
    clean_str2 = str2.replace(" ", "").lower()
    
    # Sort the characters of each string
    sorted_str1 = sorted(clean_str1)
    sorted_str2 = sorted(clean_str2)
    
    # Compare the sorted strings
    return sorted_str1 == sorted_str2

# Example usage
string1 = "listen"
string2 = "silent"
print(are_anagrams(string1, string2))  # Output: True

string3 = "hello"
string4 = "world"
print(are_anagrams(string3, string4))  # Output: False