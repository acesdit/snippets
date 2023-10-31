class Node:
    def __init__(self, v = None):
        self.value = v
        self.next = None
        return

    def isempty(self):
        if self.value == None:
            return(True)
        else:
            return(False)

    def append(self,v):   # append, recursive
        if self.isempty():
            self.value = v
        elif self.next == None:
            newnode = Node(v)
            self.next = newnode
        else:
            self.next.append(v)
        return

    def insert(self,v):
        if self.isempty():
            self.value = v
            return

        newnode = Node(v)

        # Exchange values in self and newnode
        (self.value, newnode.value) = (newnode.value, self.value)
        (self.next, newnode.next) = (newnode, self.next)

        return

    def delete(self,v):   # delete, recursive
        if self.isempty():
            return

        if self.value == v:
            self.value = None
            if self.next != None:
                self.value = self.next.value
                self.next = self.next.next
            return
        else:
            if self.next != None:
                self.next.delete(v)
                if self.next.value == None:
                    self.next = None
        return
                
    def __str__(self):
        selflist = []
        if self.value == None:
            return(str(selflist))

        temp = self
        selflist.append(temp.value)
        
        while temp.next != None:
            temp = temp.next
            selflist.append(temp.value)

        return(str(selflist))

list1 = Node()  

list1.append(1)
list1.append(2)
list1.append(3)
list1.append(4)
