def is_leap_year(year):
    """Check if the given year is a leap year."""
    if year % 4 == 0:
        if year % 100 == 0:
            return year % 400 == 0  # Divisible by 400
        return True  # Divisible by 4 but not 100
    return False  # Not divisible by 4

# Get user input
year = int(input("Enter a year: "))

# Check if the year is a leap year
if is_leap_year(year):
    print(f"{year} is a leap year.")
else:
    print(f"{year} is not a leap year.")
