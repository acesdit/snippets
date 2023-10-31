---
extension: java
author: PratKakade
category: Data Structures
layout: '../../layouts/SubmissionLayout.astro'
title: DoublyLinkedList
---
```java
// Implementation of a doubly linked list

class Node {
    int data;
    Node prev;
    Node next;

    public Node(int data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    private Node head;
    private Node tail;

    public DoublyLinkedList() {
        this.head = null;
        this.tail = null;
    }

    public void insertAtBeginning(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            tail = newNode;
        } else {
            newNode.next = head;
            head.prev = newNode;
            head = newNode;
        }
    }

    public void insertAtEnd(int data) {
        Node newNode = new Node(data);
        if (tail == null) {
            head = newNode;
            tail = newNode;
        } else {
            newNode.prev = tail;
            tail.next = newNode;
            tail = newNode;
        }
    }

    public void deleteFromBeginning() {
        if (head == null) {
            return;
        }
        if (head == tail) {
            head = null;
            tail = null;
            return;
        }
        head = head.next;
        head.prev = null;
    }

    public void deleteFromEnd() {
        if (tail == null) {
            return;
        }
        if (head == tail) {
            head = null;
            tail = null;
            return;
        }
        tail = tail.prev;
        tail.next = null;
    }

    public void display() {
        Node current = head;
        while (current != null) {
            System.out.print(current.data + " ");
            current = current.next;
        }
        System.out.println();
    }
}

public class Main {
    public static void main(String[] args) {
        DoublyLinkedList dll = new DoublyLinkedList();
        dll.insertAtEnd(10);
        dll.insertAtBeginning(5);
        dll.insertAtEnd(15);
        dll.insertAtEnd(20);

        System.out.println("Doubly Linked List: ");
        dll.display();

        dll.deleteFromBeginning();
        System.out.println("After deleting from beginning: ");
        dll.display();

        dll.deleteFromEnd();
        System.out.println("After deleting from end: ");
        dll.display();
    }
}
```
