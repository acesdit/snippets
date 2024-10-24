#selection sort

def sel_sort(marks):
    n=len(marks)
    for i  in range (n):
        min=i
        for j in range(i+1,n):
            if marks[min]>marks[j]:
                min = j
        marks[i],marks[min]=marks[min],marks[i]
    return marks

#bubble sort
def bub_sort(marks):
    b=len(marks)
    for i in range (b-1):
        if marks[i]>marks[i+1]:
            marks[i],marks[i+1]=marks[i+1],marks[i]
    return marks  

# Function for displaying top five marks

def top_five_marks(marks):
    
    list2=(marks[::-1])
    return list2


# Take input of marks from user
n=int(input("Enter no. of students "))
print("Enter marks one by one")
marks=[]
for i in range (n):
    f=int(input())
    marks.append(f)
print("Original list is ",marks)

flag=1
while flag==1:
    print("Enter your choice\n1.Selection sort method\n2.Bubble sort method\n3.Top 5 marks")
    choice=int(input())
    if choice==1:
        list=sel_sort(marks)
        print("List with selection sort method is ",list,"\n")
    elif choice==2:
        list1=bub_sort(marks)
        print("List with bubble sort method is ",list1,"\n")
    elif choice==3:
         list3=top_five_marks(marks)
         print("Top 5 marks are ",list3)
             
                          
    else :
        print("Invalid input")
        flag=0




