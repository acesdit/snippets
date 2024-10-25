import requests

def get_weather(city):
    api_key = 'your_api_key'  # Get this from OpenWeatherMap
    base_url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    
    response = requests.get(base_url)
    data = response.json()
    
    if data['cod'] == 200:
        main = data['main']
        weather_desc = data['weather'][0]['description']
        temperature = main['temp']
        humidity = main['humidity']
        print(f"City: {city}")
        print(f"Weather: {weather_desc}")
        print(f"Temperature: {temperature}°C")
        print(f"Humidity: {humidity}%")
    else:
        print("City not found.")

city = input("Enter city name: ")
get_weather(city)
