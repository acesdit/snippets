def bucket_sort(array):
    # Create buckets
    n = len(array)
    buckets = [[] for _ in range(n)]

    # Distributing the elements into buckets
    for value in array:
        bucket_index = int(n * value)  # Assuming values are in the range [0, 1)
        if bucket_index >= n:
            bucket_index = n - 1  # Handle the case where value is 1.0
        buckets[bucket_index].append(value)

    # Sort each bucket and concatenate the results
    index = 0
    for bucket in buckets:
        bucket.sort()  # Sort individual buckets
        for value in bucket:
            array[index] = value  # Concatenate the sorted buckets
            index += 1

# Main function to test the bucket sort
if __name__ == "__main__":
    # Taking input from the user
    input_values = input("Enter floating-point numbers between 0 and 1, separated by spaces: ")
    
    # Convert input string to a list of floats
    array = [float(x) for x in input_values.split()]

    print("Original array:")
    print(array)

    bucket_sort(array)

    print("Sorted array:")
    print(array)