---
extension: java
author: Sarthak Deokar
category: Algorithms
layout: '../../layouts/SubmissionLayout.astro'
title: AhoCorasick
---
```java
import java.util.*;

class AhoCorasick {
    private static class Node {
        Map<Character, Node> children = new HashMap<>();
        Node failure;
        List<Integer> output = new ArrayList<>();
    }

    private Node root;

    public AhoCorasick() {
        root = new Node();
    }

    public void insert(String word, int index) {
        Node current = root;
        for (char c : word.toCharArray()) {
            current = current.children.computeIfAbsent(c, k -> new Node());
        }
        current.output.add(index);
    }

    public void buildFailureLinks() {
        Queue<Node> queue = new LinkedList<>();
        for (Node child : root.children.values()) {
            child.failure = root;
            queue.add(child);
        }

        while (!queue.isEmpty()) {
            Node current = queue.poll();
            for (Map.Entry<Character, Node> entry : current.children.entrySet()) {
                char c = entry.getKey();
                Node child = entry.getValue();
                Node failure = current.failure;

                while (failure != null && !failure.children.containsKey(c)) {
                    failure = failure.failure;
                }
                child.failure = failure != null ? failure.children.get(c) : root;

                if (child.failure != null) {
                    child.output.addAll(child.failure.output);
                }
                queue.add(child);
            }
        }
    }

    public List<Integer> search(String text) {
        List<Integer> result = new ArrayList<>();
        Node current = root;

        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            while (current != null && !current.children.containsKey(c)) {
                current = current.failure;
            }
            if (current == null) {
                current = root;
                continue;
            }
            current = current.children.get(c);
            for (int index : current.output) {
                result.add(index);
            }
        }
        return result;
    }

    public static void main(String[] args) {
        AhoCorasick ac = new AhoCorasick();
        String[] patterns = {"he", "she", "his", "hers"};
        for (int i = 0; i < patterns.length; i++) {
            ac.insert(patterns[i], i);
        }
        ac.buildFailureLinks();

        String text = "ushers";
        List<Integer> matches = ac.search(text);
        System.out.println("Pattern matches at indices: " + matches);
    }
}```
