---
extension: cpp
author: Pranjal Choria
category: Data Structures
layout: '../../layouts/SubmissionLayout.astro'
title: Diamond_problem
---
```cpp
#include <iostream>
using namespace std;

// diamond problem in cpp

// In C++, the "diamond problem" refers to a particular issue that can arise in languages that support multiple inheritance. It occurs when a class inherits from two classes that have a common base class. This can lead to ambiguity in the derived class about which version of the common base class's methods and variables to use.

#include <iostream>
using namespace std;

class A {
public:
    void display() {
        cout << "Class A" << endl;
    }
};

class B : public A {
public:
    void display() {
        cout << "Class B" << endl;
    }
};

class C : public A {
public:
    void display() {
        cout << "Class C" << endl;
    }
};

class D : public B, public C {

};

int main() {
    D d;
    d.B::display();
    d.C::display();
    return 0;
}
// To resolve the diamond problem, you can use virtual inheritance in C++. Virtual inheritance allows you to create a single instance of the base class in the derived class. This way, the derived class has only one copy of the base class, thereby avoiding the ambiguity.

// Here's an updated version of the previous example using virtual inheritance:

```cpp
#include <iostream>
using namespace std;

class A {
public:
    void display() {
        cout << "Class A" << endl;
    }
};

class B : virtual public A { // virtual inheritance
public:
    void display() {
        cout << "Class B" << endl;
    }
};

class C : virtual public A { // virtual inheritance
public:
    void display() {
        cout << "Class C" << endl;
    }
};

class D : public B, public C {

};

int main() {
    D d;
    d.display(); // Now, this will call the correct display function without ambiguity.
    return 0;
}
```

// In this modified version, both classes B and C virtually inherit class A, which ensures that only one instance of class A is present in class D. This resolves the ambiguity and allows you to call the `display()` method directly on the object of class D.

#include <iostream>
using namespace std;

class A {
public:
    void display() {
        cout << "Class A" << endl;
    }
};

class B : virtual public A { // virtual inheritance
public:
    void display() {
        cout << "Class B" << endl;
    }
};

class C : virtual public A { // virtual inheritance
public:
    void display() {
        cout << "Class C" << endl;
    }
};

class D : public B, public C {

};

int main() {
    D d;
    d.display(); // Now, this will call the correct display function without ambiguity.
    return 0;
}

```
