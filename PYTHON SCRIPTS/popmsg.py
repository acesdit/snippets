import tkinter as tk
from tkinter import messagebox

def submit_form():
    
    print("Submitting form...")
  
    messagebox.showinfo("Form Submitted", "Thank you! Your message has been sent.")


root = tk.Tk()
root.title("Contact Us")
root.geometry("300x200")


tk.Label(root, text="Name:").pack()
name_entry = tk.Entry(root)
name_entry.pack()

tk.Label(root, text="Email:").pack()
email_entry = tk.Entry(root)
email_entry.pack()

tk.Label(root, text="Message:").pack()
message_entry = tk.Entry(root)
message_entry.pack()


submit_button = tk.Button(root, text="Submit", command=submit_form)
submit_button.pack(pady=10)


root.mainloop()
