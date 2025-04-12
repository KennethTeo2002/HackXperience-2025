from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import json
from openai_client import openai_client

# Initialize FastAPI app
app = FastAPI()

# Define request body for preferences
class Preference(BaseModel):
    interests: List[str]
    hobbies: List[str]
    favorite_things: List[str]
    personality_traits: List[str]


def generate_gift_ideas(preferences: Preference) -> List[str]:
    prompt = (
        "Given the following preferences:\n"
        "Interests: {', '.join(preferences.interests)}\n"
        "Hobbies: {', '.join(preferences.hobbies)}\n"
        "Favorite Things: {', '.join(preferences.favorite_things)}\n"
        "Personality Traits: {', '.join(preferences.personality_traits)}\n"
        "Suggest a ranked list of gift ideas based on the information provided.\n"
        "Return the list in the following JSON format (and nothing else):\n"
        "{\n"
        '  "gifts": [\n'
        '    "gift_1",\n'
        '    "gift_2",\n'
        '    "gift_3"\n'
        "    // Add more gifts as needed\n"
        "  ]\n"
        "}\n"
    )
    
    messages = [{"role": "user", "content": prompt}]

    try:
        response = openai_client.text_request(messages, "json_object")
        # print(ingredient_info, file=sys.stderr)
        return response
    
    except Exception as e:
        return {"error": str(e)}, 500


@app.post("/recommend_gifts/")
async def recommend_gifts(preferences: Preference):
    try:
        gifts = generate_gift_ideas(preferences)
        return gifts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the app with Uvicorn (in terminal)
# uvicorn app:app --reload