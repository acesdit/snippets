import psutil
import time
from datetime import datetime

# Function to get CPU usage
def get_cpu_usage():
    return psutil.cpu_percent(interval=1)

# Function to get Memory usage
def get_memory_usage():
    memory = psutil.virtual_memory()
    return memory.percent

# Function to get Disk usage
def get_disk_usage():
    disk = psutil.disk_usage('/')
    return disk.percent

# Function to log data into a file
def log_data():
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    cpu_usage = get_cpu_usage()
    memory_usage = get_memory_usage()
    disk_usage = get_disk_usage()

    log_line = f"{timestamp}, CPU: {cpu_usage}%, Memory: {memory_usage}%, Disk: {disk_usage}%\n"
    
    with open("system_health_log.txt", "a") as log_file:
        log_file.write(log_line)

    print(log_line.strip())

# Main loop
def monitor_system():
    while True:
        log_data()
        time.sleep(10)  # Logs data every 10 seconds

if __name__ == "__main__":
    monitor_system()
