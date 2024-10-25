import requests
from bs4 import BeautifulSoup

# You can add any website you want to scrap :
url = "https://www.bbc.com/news"

# we here send request:
response = requests.get(url)

# we here verify the code
if response.status_code == 200:
    
    soup = BeautifulSoup(response.content, "html.parser")
    
    # As an example we are printing titles of articles here:
    titles = soup.find_all('h3', class_='gs-c-promo-heading__title')
    
    print("News Article Titles:")
    for i, title in enumerate(titles, start=1):
        print(f"{i}. {title.get_text(strip=True)}")

else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")

#Note:
#To run this scripts we will require to install beautifulSoup use:
#pip install requests beautifulsoup4