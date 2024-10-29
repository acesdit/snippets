# Problem Statement:

There is a restaurant with a single chef. You are given an array customers, where customers[i] = [arrival i, time i]:

- arrival i is the arrival time of the ith customer. The arrival times are sorted in non-decreasing order.
-  time i is the time needed to prepare the order of the ith customer.
When a customer arrives, he gives the chef his order, and the chef starts preparing it once he is idle. The customer waits till the chef finishes preparing his order. The chef does not prepare food for more than one customer at a time. The chef prepares food for customers in the order they were given in the input.

Return the average waiting time of all customers. Solutions within 10^-5 from the actual answer are considered accepted.

## Example 1:

### Input: customers = [[1,2],[2,5],[4,3]]

### Output: 5.00000

### Explanation:

1) The first customer arrives at time 1, the chef takes his order and starts preparing it immediately at time 1, and finishes at time 3, so the waiting time of the first customer is 3 - 1 = 2.
2) The second customer arrives at time 2, the chef takes his order and starts preparing it at time 3, and finishes at time 8, so the waiting time of the second customer is 8 - 2 = 6.
3) The third customer arrives at time 4, the chef takes his order and starts preparing it at time 8, and finishes at time 11, so the waiting time of the third customer is 11 - 4 = 7.
So the average waiting time = (2 + 6 + 7) / 3 = 5.

## Example 2:

### Input: customers = [[5,2],[5,4],[10,3],[20,1]]

### Output: 3.25000

## Intuition :

1) The first customer arrives at time 5, the chef takes his order and starts preparing it immediately at time 5, and finishes at time 7, so the waiting time of the first customer is 7 - 5 = 2.
2) The second customer arrives at time 5, the chef takes his order and starts preparing it at time 7, and finishes at time 11, so the waiting time of the second customer is 11 - 5 = 6.
3) The third customer arrives at time 10, the chef takes his order and starts preparing it at time 11, and finishes at time 14, so the waiting time of the third customer is 14 - 10 = 4.
4) The fourth customer arrives at time 20, the chef takes his order and starts preparing it immediately at time 20, and finishes at time 21, so the waiting time of the fourth customer is 21 - 20 = 1.
So the average waiting time = (2 + 6 + 4 + 1) / 4 = 3.25.

## Complexity:
### Time Complexity:O(N)
The solution involves a single pass through the list of customers O(n), where n is the number of customers.

### Space Complexity:O(1)
The space complexity of the solution is dominated by the input storage, which is O(N), where n is the number of customers.
Apart from the input storage, the solution uses a constant amount of extra space O(1) for variables like wait and cur.

## Solution:

```py

def averageWaitingTime(Customers):
    wait = 0  # Initialize total waiting time
    
    cur = Customers[0][0]  # Initialize current time to the arrival time of the first customer
    
    for i in Customers:
        arrive = i[0]  # Arrival time of the current customer
        time_for_cooking = i[1]  # Time required for cooking for the current customer
        
        if arrive < cur:
            wait += (cur - arrive + time_for_cooking)  # Customer waits until the current time + their service time
            cur += time_for_cooking  # Update current time to when this customer finishes
        else:
            wait += time_for_cooking  # Customer arrives after or exactly at current time, start service immediately
            cur = arrive + time_for_cooking  # Update current time to when this customer finishes
    
    return wait / len(Customers)  # Calculate and return the average waiting time

customers = [[5,2],[5,4],[10,3],[20,1]]

print(f" Waiting Time : {averageWaitingTime(Customers)}")
"""
Intuition :

-The algorithm simulates the process of serving customers starting from the first customer's arrival time.
-It tracks the current time (cur) to manage when each customer can start being served based on their arrival times and the service times of previous customers.
-By iterating through each customer and updating cur accordingly, it accurately computes the waiting times and subsequently the average waiting time for all customers.
-This approach ensures that each customer's waiting time is correctly calculated based on when they arrive relative to when they can start being served, and it efficiently computes the required average waiting time at the end.
"""





