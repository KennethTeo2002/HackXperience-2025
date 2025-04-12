from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from openai_client import openai_client
from pathlib import Path
import json


app = FastAPI()

class PreferenceRequest(BaseModel):
    preferences: List[str]

DATA_FILE_PATH = Path("../frontend/public/data.json")


def read_data_json():
    try:
        with open(DATA_FILE_PATH, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Data file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error parsing data file")


def generate_gift_ideas(event_id: str = None):
    data = read_data_json()
    events = data.get("events", [])

    all_preferences = []
    if event_id:
        for event in events:
            if event.get("id") == event_id:
                all_preferences = [pref.get("name") for pref in event.get("preferences", [])]
                break
        if not all_preferences:
            raise HTTPException(status_code=404, detail="Event not found or has no preferences")
    else:
        preference_names = set()
        for event in events:
            for pref in event.get("preferences", []):
                preference_names.add(pref.get("name"))
        all_preferences = list(preference_names)
    

    prompt = (
        f"Given the following preferences:\n"
        f"Interests: {', '.join(all_preferences)}\n"
        f"Suggest a ranked list of gift ideas based on the information provided.\n"
        f"Return the list in the following JSON format (and nothing else):\n"
        f"{{\n"
        f'  "gifts": [\n'
        f'    "gift_1",\n'
        f'    "gift_2",\n'
        f'    "gift_3"\n'
        f"    // Add more gifts as needed\n"
        f"  ]\n"
        f"}}\n"
    )
    
    messages = [{"role": "user", "content": prompt}]

    try:
        response = openai_client.text_request(messages, "json_object")
        # print(ingredient_info, file=sys.stderr)
        return response
    
    except Exception as e:
        return {"error": str(e)}, 500


@app.post("/recommend_gifts/event/{event_id}")
async def recommend_gifts(event_id: str):
    try:
        return generate_gift_ideas(event_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the app with Uvicorn (in terminal)
# uvicorn app:app --reload