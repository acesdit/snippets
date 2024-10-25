

#install plyer library before running this line in console -      pip install plyer


import time
from datetime import datetime
from plyer import notification

def set_reminder(message, reminder_time):
    # Calculate delay in seconds from now until the reminder time
    now = datetime.now()
    delay = (reminder_time - now).total_seconds()

    if delay < 0:
        print("The specified time is in the past. Please set a future time.")
        return

    print(f"Reminder set for {delay} seconds.")
    time.sleep(delay)
    notification.notify(
        title="Reminder",
        message=message,
        timeout=10  # Notification stays for 10 seconds
    )

if __name__ == "__main__":
    message = input("Enter the reminder message: ")
    reminder_time_str = input("Enter the reminder time (HH:MM, 24-hour format): ")

    # Convert input time to a datetime object
    try:
        reminder_time = datetime.strptime(reminder_time_str, "%H:%M")
        # Set the date to today
        reminder_time = reminder_time.replace(year=datetime.now().year, month=datetime.now().month, day=datetime.now().day)
        
        # If the reminder time is before now, set it for the next day
        if reminder_time < datetime.now():
            reminder_time = reminder_time.replace(day=reminder_time.day + 1)

        set_reminder(message, reminder_time)

    except ValueError:
        print("Invalid time format. Please use HH:MM in 24-hour format.")




'''this is a useful CUSTOM REMINDER NOTIFICATION code, since most windows devices dont usually come with a dedicated "REMINDER" app. 
it is simple to use and doesnt require more than 1 library to be installed'''