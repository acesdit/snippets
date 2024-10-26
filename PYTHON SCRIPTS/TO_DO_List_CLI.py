tasks = []

def show_tasks():
    if not tasks:
        print("No tasks found!")
    else:
        for i, task in enumerate(tasks, 1):
            print(f"{i}. {task}")

def add_task(task):
    tasks.append(task)
    print(f"Task '{task}' added!")

def delete_task(index):
    try:
        task = tasks.pop(index - 1)
        print(f"Task '{task}' deleted!")
    except IndexError:
        print("Invalid task number!")

while True:
    print("\nTo-Do List:")
    show_tasks()
    print("\nOptions: (1) Add Task, (2) Delete Task, (3) Quit")
    choice = input("Enter choice: ")

    if choice == '1':
        task = input("Enter task description: ")
        add_task(task)
    elif choice == '2':
        task_num = int(input("Enter task number to delete: "))
        delete_task(task_num)
    elif choice == '3':
        break
    else:
        print("Invalid option!")
