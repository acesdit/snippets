import time

def countdown(seconds):
    while seconds:
        mins, secs = divmod(seconds, 60)
        print(f"{mins:02d}:{secs:02d}", end="\r")
        time.sleep(1)
        seconds -= 1
    print("Time's up!")

if _name_ == "_main_":
    seconds = int(input("Enter time in seconds for countdown: "))
    countdown(seconds)