---
extension: py
author: Nishant Kadlak
category: Data Structures
layout: '../../layouts/SubmissionLayout.astro'
title: Binary Search Tree
---
```py
#This is implementation of binary search tree in python

# base class i.e. where all the operations are defined
class BSTNode:
    def __init__(self, key, value=None) -> None:
        self.key = key
        self.value = value
        self.left = None
        self.right = None
        self.parent = None

    def insert(node, key, value):
        if node is None:
            node = BSTNode(key, value)
        elif key < node.key:
            node.left = BSTNode.insert(node.left, key, value)
            node.left.parent = node
        elif key > node.key:
            node.right = BSTNode.insert(node.right, key, value)
            node.right.parent = node
        return node

    def find(node, key):
        if node is None:
            return None
        if key == node.key:
            return node
        if key < node.key:
            return BSTNode.find(node.left, key)
        if key > node.key:
            return BSTNode.find(node.right, key)

    def update(node, key, value):
        target = BSTNode.find(node, key)
        if target is not None:
            target.value = value

    def list_all(node):
        if node is None:
            return []
        return (
            BSTNode.list_all(node.left)
            + [(node.key, node.value)]
            + BSTNode.list_all(node.right)
        )

    def height(self):
        if self is None:
            return 0
        return 1 + max(BSTNode.height(self.left), BSTNode.height(self.right))

    def display_keys(self, space="\t", level=0):
        if self is None:
            print(space * level + "$")
            return

        if self.left is None and self.right is None:
            print(space * level + str(self.key))
            return

        BSTNode.display_keys(self.right, space, level + 1)
        print(space * level + str(self.key))
        BSTNode.display_keys(self.left, space, level + 1)

    def make_balanced_bst(data, lo=0, hi=None, parent=None):
        if hi is None:
            hi = len(data) - 1
        if lo > hi:
            return None

        mid = (lo + hi) // 2
        key, value = data[mid]

        root = BSTNode(key, value)
        root.parent = parent
        root.left = BSTNode.make_balanced_bst(data, lo, mid - 1, root)
        root.right = BSTNode.make_balanced_bst(data, mid + 1, hi, root)

        return root

    def balance_bst(self):
        return BSTNode.make_balanced_bst(BSTNode.list_all(treemap.root))


class User:
    def __init__(self, username, name, email) -> None:
        self.username = username
        self.name = name
        self.email = email

    def __repr__(self) -> str:
        return f"User( username = '{self.username}', name = '{self.name}', email = {self.email}\n"

    def __str__(self) -> str:
        return self.__repr__()


aakash = User("aakash", "Aakåsh Rai", "aakash@example.com")
biraj = User("biraj ", "Biraj Das", "biraj@example.com")
hemanth = User("hemanth ", "Hemanth Jain", "hemanth@example.com")
jadhesh = User("jadhesh", "Jadhesh Verma ", " jadhesh@example.com")
siddhant = User("siddhant ", "Siddhant Sinha ", "siddhant@example.com")
sonaksh = User("sonaksh", "Sonaksh Kumar", "sonaksh@example.com")
vishal = User("vishal", "Vishal Goel", "vishal@example.com")


class Treemap:
    def __init__(self) -> None:
        self.root = None

    def __setitem__(self, key, value):
        node = BSTNode.find(self.root, key)

        if not node:
            self.root = BSTNode.insert(self.root, key, value)
            self.root = BSTNode.balance_bst(self.root)

        else:
            BSTNode.update(self.root, key, value)

    def __getitem__(self, key):
        node = BSTNode.find(self.root, key)
        return node.value if node else None

    def __iter__(self):
        return (x for x in BSTNode.list_all(self.root))

    def __len__(self):
        return BSTNode.height(self.root)

    def display(self):
        return BSTNode.display_keys(self.root)


# test cases
treemap = Treemap()
treemap["aakash"] = aakash
treemap["biraj"] = biraj
treemap["hemanth"] = hemanth
treemap["jadhesh"] = jadhesh
treemap["siddhant"] = siddhant
treemap["sonaksh"] = sonaksh
treemap["vishal"] = vishal

treemap.display()
print('\n')

print(list(treemap)) #possible due to __iter__ fucntion
print('\n')

print('height of the BST is:',len(treemap),'\n') #possible due to __len__ function

#accessing a value given key
print('value stored in siddhant is:  ', treemap['siddhant'] )




    

```
