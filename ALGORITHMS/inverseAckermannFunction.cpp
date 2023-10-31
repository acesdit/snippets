#include <iostream>
using namespace std;
 
int inverseAckermann(int n)
{
    // Check if the input is small enough
    // to solve directly
    if (n <= 4) {
        return n;
    }
 
    // Divide the problem into
    // two smaller problems
    int a = inverseAckermann(n - 1);
    int b = inverseAckermann(n - 2);
 
    // Combine the solutions of the
    // two smaller problems
    return a + b;
}
 
int main()
{
    // Define the input
    int n = 10;
 
    // Solve the problem using the
    // inverse Ackermann algorithm
    int result = inverseAckermann(n);
 
    // Print the result
    cout << "Result: " << result << endl;
 
    return 0;
}
