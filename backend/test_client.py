import requests
import json

API_URL = "http://127.0.0.1:8000/recommend_gifts/event/1"

headers = {"Content-Type": "application/json"}

response = requests.post(API_URL, headers=headers)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code} - {response.text}")