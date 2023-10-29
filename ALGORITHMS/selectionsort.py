def selectionSort(lst):
    n = len(lst)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if lst[j] < lst[min_idx]:
                min_idx = j
        
        lst[i], lst[min_idx] = lst[min_idx], lst[i]

lst1 = eval(input("Enter list to be sorted: "))
selectionSort(lst1)
print("The sorted list is:")
for i in range(len(lst1)):
    print(lst1[i], end=' ')
