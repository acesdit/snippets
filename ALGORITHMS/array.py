n = int(input("Enter total number of students: "))
mark_list=[]
print("NOTE:(-1) represent absent student during exam")
print("Enter Marks of students one by one")
i=0
for i in range (n):
    marks=int(input())
    mark_list.append(marks)
print("Marklist is: ",mark_list)
def Average():
    j=0
    sum=0
    for j in range (n):
        if mark_list[j]!= -1:
            sum=sum+mark_list[j]
    print("sum of marks are : ",sum)
    avg=sum/n
    print("Average is : ",avg)
Average()  
def highest():
    max=0
    for i in range (n):
        if mark_list[i]>max and mark_list[i]!=-1:
            max=mark_list[i]
    print("Highest Marks : ",max)
highest()
def lowest():
    min=100
    for i in range (n):
        if mark_list[i]<min and mark_list[i]!=-1 :
            min=mark_list[i]
    print("lowest Marks : ",min)
lowest()
def absent():
    ab=0
    for i in range (n):
        if mark_list[i]==-1:
            ab=ab+1
    print("Absent students : ",ab)
absent()
def frequency():
   i=0
   freq=0
   j=0
     
   for j in mark_list:
       if ((mark_list.index(j)==i)&(mark_list.index(j)!=-1)):
           
           if mark_list.count(j)>freq:
               freq=mark_list.count(j)
               mark =j
       i=i+1 
   print("The marks with highest frequency : ",mark)
frequency()  
   