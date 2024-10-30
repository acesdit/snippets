def is_palindrome(s):
    # Remove non-alphanumeric characters and convert to lowercase
    s = ''.join(char.lower() for char in s if char.isalnum())
    # Check if the string is equal to its reverse
    return s == s[::-1]

# Example usage
text = "A man, a plan, a canal, Panama"
if is_palindrome(text):
    print("It's a palindrome!")
else:
    print("It's not a palindrome.")