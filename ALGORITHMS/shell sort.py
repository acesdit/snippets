#Insertion sort
def insertion_sort(marks):
    for i in range (1,len(marks)):
        num=marks[i]
        j=i-1
        while j>=0 and num <marks[j]:
            marks[j+1]=marks[j]
            j=j-1
        marks[j+1]=num

# Shell Sort
def shell_Sort(marks):
	n = len(marks)
	gap = n/2
	while gap > 0:
		for i in range(int(gap),n):
			temp = marks[i]
			j = i
			while j >= gap and marks[j-int(gap)] >temp:
				marks[j] = marks[j-gap]
				j -= gap
			marks[j] = temp
		gap /= 2
        
marks=[67,23,87,12,43,98,54,45]
print("Percentage of students are : ",marks)
flag = 1
while(flag==1):
    print("Sort Percentage using \n1.Insertion sort\n2.Bubble sort\n3.0 to exit")
    a=int(input("Enter your choice : "))
    if a ==1:
        print("sorted list of percentage using insertion sort method is ",insertion_sort(marks))
        print(marks)
        print("\n")
    elif a==2:
        print("sorted list of percentage using bubble sort method is ",shell_Sort(marks))
        print(marks)
        print("\n")
    else:
        print("Invalid choice")
        flag=0



