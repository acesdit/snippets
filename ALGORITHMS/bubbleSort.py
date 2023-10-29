def bubbleSort(list1):
    n=len(list1)
    for i in range(n):
        for j in range(0,n-i-1):
            if list1[j]>list1[j+1]:
                list1[j],list1[j+1]=list1[j+1],list1[j]


lst=eval(input("Enter list elements to be sorted: "))
bubbleSort(lst)
print("The sorted list is: ")
for i in range(len(lst)):
    print(lst[i],end=" ")
