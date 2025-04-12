import requests
import json

API_URL = "http://127.0.0.1:8000/recommend_gifts/"

preferences_data = {
    "interests": ["technology", "gaming", "music"],
    "hobbies": ["coding", "playing video games", "listening to music"],
    "favorite_things": ["gaming consoles", "smart gadgets", "headphones"],
    "personality_traits": ["adventurous", "curious", "creative"]
}

headers = {"Content-Type": "application/json"}

response = requests.post(API_URL, headers=headers, data=json.dumps(preferences_data))


if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code} - {response.text}")