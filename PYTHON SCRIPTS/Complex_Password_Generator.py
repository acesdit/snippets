import random
import string

def generate_password(length=12):
    if length < 8:
        print("Password length should be at least 8 characters.")
        return

    # Ensure the password has at least one character from each category
    password_chars = [
        random.choice(string.ascii_uppercase),  # At least one uppercase letter
        random.choice(string.ascii_lowercase),  # At least one lowercase letter
        random.choice(string.digits),             # At least one digit
        random.choice(string.punctuation)         # At least one punctuation
    ]

    # Fill the rest of the password length with random choices
    characters = string.ascii_letters + string.digits + string.punctuation
    password_chars += [random.choice(characters) for _ in range(length - 4)]

    # Shuffle the resulting list to ensure randomness
    random.shuffle(password_chars)

    password = ''.join(password_chars)
    print(f"Generated password: {password}")

if __name__ == "__main__":
    length = int(input("Enter desired password length (minimum 8): "))
    generate_password(length)


'''no libraries are required to be installed'''