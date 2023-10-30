class Node:
	def _init_(self, value):
		self.value = value
		self.next = None


class Stack:

	# Initializing a stack.
	# Use a dummy node, which is
	# easier for handling edge cases.
	def _init_(self):
		self.head = Node("head")
		self.size = 0

	# String representation of the stack
	def _str_(self):
		cur = self.head.next
		out = ""
		while cur:
			out += str(cur.value) + "->"
			cur = cur.next
		return out[:-2]

	# Get the current size of the stack
	def getSize(self):
		return self.size

	# Check if the stack is empty
	def isEmpty(self):
		return self.size == 0

	# Get the top item of the stack
	def peek(self):

		# Sanitary check to see if we
		# are peeking an empty stack.
		if self.isEmpty():
			raise Exception("Peeking from an empty stack")
		return self.head.next.value

	# Push a value into the stack.
	def push(self, value):
		node = Node(value)
		node.next = self.head.next
		self.head.next = node
		self.size += 1

	# Remove a value from the stack and return.
	def pop(self):
		if self.isEmpty():
			raise Exception("Popping from an empty stack")
		remove = self.head.next
		self.head.next = self.head.next.next
		self.size -= 1
		return remove.value


# Driver Code
if _name_ == "_main_":
	stack = Stack()
	for i in range(1, 11):
		stack.push(i)
	print(f"Stack: {stack}")

	for _ in range(1, 6):
		remove = stack.pop()
		print(f"Pop: {remove}")
	print(f"Stack: {stack}")