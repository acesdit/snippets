---
extension: py
author: NandiniK2404
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: AreaCalculation
---
```py
import math

class Shape:
    def area(self):
        raise NotImplementedError("Subclass must implement abstract method")

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * (self.radius ** 2)

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height

shapes = [
    Rectangle(5, 10),
    Circle(7),
    Triangle(6, 8)
]

for shape in shapes:
    print(f"The area of the {shape.__class__.__name__} is {shape.area()}")
```
