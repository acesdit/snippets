'''SETUP
1.	Importing the necessary modules.
2.	Connectivity of MySQL with python.
3.	Creating a database named ‘medical’ in MySQL.
4.	Creating tables ‘bill’, ‘staff’ and ‘stock’ in MySQL using database ‘medical’.
5.	Writing the required code
'''


import pandas as pd
import mysql.connector as sql
conn=sql.connect(host='localhost',user='root',passwd='212005',database='medical')
if conn.is_connected():
    print('connected')
import warnings
warnings.filterwarnings('ignore')

def menu():
    print()
    print('*********************************************')
    print('     MEDICAL STORE MANAGEMENT SYSTEM         ')
    print('*********************************************')
    print()
    print()
    print('1. About the project')
    print('2. Display list of all medicines available in the stock')
    print('3. Display all medicines in alphabetical order')
    print('4. Add new medicines purchased in stock table')
    print('5. Update price of medicine')
    print('6. Delete a medicine detail from table stock if not available')
    print('7. Accept customer order and save bill')
    print('8. Show details of all sales done from table bill')
    print('9. Enter all customer orders and maintain record')
    print('10. Total bill to be paid customerwise')
    print('11. Total medicines bought according to mobile no. (group by)')
    print('12. Total medicines bought and price of each according to mobile no.')
    print('13. Add new staff detail in staff table')
    print('14. Show records of staff table')
    print('15. Delete staff detail from staff')
    print('16. Update staff mobile no.')
    print('*********************************************')

menu()

def about():
    print('You are welcome in MEDICAL STORE MANAGEMENT SYSTEM. It has 16 choices. It has used 3 tables named as stock, staff and bill')

def showlist():
    print('Display all details of medicines available')
    print()
    df=pd.read_sql('select * from stock',conn)
    print(df)

def sortmedicines():
    print('sorting medicine names in ascending order')
    print()
    df=pd.read_sql('select * from stock',conn)
    df=df.sort_values('mname')
    print(df)

def addstock():
    c1=conn.cursor()
    print('Medicines already in stock')
    print()
    df=pd.read_sql('select * from stock',conn)
    print(df)
    L=[]
    mcode=input('Enter medicine code:')
    L.append(mcode)
    mname=input('Enter name of medicine:')
    L.append(mname)
    dateofexp=input('Enter date of expiry:')
    L.append(dateofexp)
    quan=input('Enter quantity of medicine:')
    L.append(quan)
    price=input('Enter price:')
    L.append(price)
    stock=(L)
    sql='insert into stock(mcode, mname, dateofexp, quan, price)values(%s,%s,%s,%s,%s)'
    c1.execute(sql,stock)
    conn.commit()
    print('Record inserted')

def updatestock():
    print('Change price of medicine')
    c1=conn.cursor()
    print('Old prices')
    df=pd.read_sql('select * from stock',conn)
    print(df)
    c1.execute('Update stock set price=price + 30 where mcode="101"')
    print('Price increased')
    print()
    df=pd.read_sql('select * from stock',conn)
    print(df)

def deletestock():
    print('Before any changes in stock')
    print()
    df=pd.read_sql('select * from stock',conn)
    print(df)
    print()
    mc=conn.cursor()
    mc.execute('Delete from stock where mcode="107"')
    print('Record deleted')
    df=pd.read_sql('select * from stock',conn)
    print(df)

def custorder():
    print('Medicine codes and names and price of each medicine is shown below')
    print()
    df=pd.read_sql('select * from stock',conn)
    print(df)
    print()
    print()
    print()
    print()
    print()
    x=int(input('Enter your medicine code please:'))
    n=int(input('How much quantity do you want to buy?'))
    if(x==101):
        print()
        print('You have bought Dolo')
        print()
        print('Price is Rs.150 each strip')
        s=150*n
    elif(x==102):
        print()
        print('You have bought Ciplox')
        print()
        print('Price is Rs.120 each strip')
        s=120*n
    elif(x==103):
        print()
        print('You have bought sanitizer')
        print()
        print('Price is Rs.220 for 500ml bottle')
        s=220*n
    elif(x==104):
        print()
        print('You have bought Lifebuoy soap')
        print()
        print('Price is Rs.60 per soap')
        s=60*n
    elif(x==105):
        print()
        print('You have bought surgical mask')
        print()
        print('Price is Rs.20 per mask')
        s=20*n
    elif(x==106):
        print()
        print('You have bought Dettol 200ml')
        print()
        print('Price is Rs.90 per 200ml bottle')
        s=90*n
    elif(x==107):
        print()
        print('You have bought Vicks 50mg')
        print()
        print('Price is Rs.50 per 50mg bottle')
        s=50*n
    else:
        print('Please enter correct medicine code')
    print('Your bill is: Rs. ',s,'\n')

def billrecords():
    print('Display contact no. of customers and medicines purchased')
    print()
    df=pd.read_sql('select * from bill',conn)
    print(df)

def recordorder():
    print('List and price of medicines')
    print()
    df=pd.read_sql('select * from stock',conn)
    print(df)
    print()
    print('Insert into bill records new sale')
    mc=conn.cursor()
    L=[]
    mno=input('Enter mobile no.:')
    L.append(mno)
    itemcode=input('Enter item code:')
    L.append(itemcode)
    itemname=input('Enter item name:')
    L.append(itemname)
    q=input('Enter quantity:')
    L.append(q)
    price=input('Enter price per piece:')
    L.append(price)
    billrec=(L)
    sql='insert into bill(mobile,mcode, mname, quan, price)values(%s,%s,%s,%s,%s)'
    mc.execute(sql,billrec)
    conn.commit()
    print('Record inserted')

def sumbillbycust():
    df=pd.read_sql('select * from bill',conn)
    print(df)
    print('Total money spent on various medicines by a customer')
    
    m=float(input('mobile:'))
    print('Your order')
    print()
    print()
    qry='select mname, quan, price from bill where mobile=%s;'%(m,)
    df=pd.read_sql(qry,conn)
    print(df)
    qry1='select quan*price as "Total cost of each item" from bill where mobile=%s;'%(m,)
    df=pd.read_sql(qry1,conn)
    print(df)
    print()
    print()
    qry2='select sum(quan*price) as "You have to pay" from bill where mobile=%s;'%(m,)
    df=pd.read_sql(qry2,conn)
    print(df)

def groupby():
    mc=conn.cursor()
    df=pd.read_sql('select * from bill',conn)
    print(df)
    print()
    print('Total quantity of each item sold along with its code and name')

    mc.execute('select mcode,sum(quan) from bill where mobile="9876515389"')
    for x in mc:
        print(x)

def searchbymobile():
    df=pd.read_sql('select * from bill',conn)
    print(df)
    print()
    print('Enter your mobile no. to find details of your purchasing')
    m=float(input('mobile:'))
    qry='select mname, quan, price from bill where mobile=%s;'%(m,)
    df=pd.read_sql(qry,conn)
    print(df)

def interstaff():
    c1=conn.cursor()
    df=pd.read_sql('select * from staff', conn)
    print(df)
    print('Old satff details')
    print()

    print('Enter new staff information')
    print()
    sid=int(input('Enter ID of staff:'))
    name=input('Enter staff name:')
    age=int(input('Enter age:'))
    profile=input('Enter work profile:')
    mobile=int(input('Enter mobile number:'))
    sql_insert='insert into staff values('''+str(sid)+',"'+name+'",'+str(age)+',"'+profile+'",'+str(mobile)+')'
    c1.execute(sql_insert)
    print('Successfully Registered')
    conn.commit()

def showstaff():
    print('All record of staff details')
    print()
    df=pd.read_sql('select * from staff', conn)
    print(df)

def deletestaff():
    df=pd.read_sql('select * from staff', conn)
    print(df)
    print('Before any changes in staff')
    print()
    print()
    mc=conn.cursor()
    mc.execute('delete from staff where sid="203"')
    print('Record deleted')
    df=pd.read_sql('select * from staff', conn)
    print(df)

def updatestaff():
    print('Before any changes in the staff mobile no.')
    df=pd.read_sql('select * from staff', conn)
    print(df)
    print()
    print()
    mc=conn.cursor()
    mc.execute('update staff set mobile="8562300016" where name="Reshma Tiwari"')
    df=pd.read_sql('select * from staff', conn)
    print('New mobile number')
    print(df)

opt=''
opt=int(input('Enter your choice"'))
if opt==1:
    about()
elif opt==2:
    showlist()
elif opt==3:
    sortmedicines()
elif opt==4:
    addstock()
elif opt==5:
    updatestock()
elif opt==6:
    deletestock()
elif opt==7:
    custorder()
elif opt==8:
    billrecords()
elif opt==9:
    recordorder()
elif opt==10:
    sumbillbycust()
elif opt==11:
    groupby()
elif opt==12:
    searchbymobile()
elif opt==13:
    interstaff()
elif opt==14:
    showstaff()
elif opt==15:
    deletestaff()
elif opt==16:
    updatestaff()
else:
    print('invalid option')

import winsound
winsound.Beep(1000,300)


    
    
