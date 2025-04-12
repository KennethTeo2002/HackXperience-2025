# HackXperience 2025

## Problem Statement

### SmartGifter: Take the guesswork out of gifting

While digital gifts wishlists and gifting platforms have grown in popularity for driving engagement, personalization, and smarter purchasing decisions, key limitations remain. Users are missing out on integrations with online stores, third parties, redeemable loyalty points, updated products and access to discount offers. As a result, gifting platforms struggle with low user retention, limited loyalty system integration, and reduced perceived value for both givers and recipients.

There is an opportunity to transform the gifting experience leveraging on AI and its ecosystem. By enhancing personalization, lifecycle awareness, and integrating loyalty systems, platforms can alert users when they can redeem points, offer timely incentives, and encourage continued engagement maximizing the value of gifting with memberships, improving retention, boosting sales for businesses and reduces wastage.

## Solution - Gify

#### Gifting made easy.

Not sure on what to buy for your friend? Fret not, we have recommendations for you! Simply put, Gify is a gifting platform designed to simplify and enhance the gifting experience for friends and family, designed specifically for gifting occasions like birthdays, baby showers, and housewarmings. Gify features AI tools that consolidate preferences from the Giftee's friends, families & connections and generates questions you may want to probe the Giftee with, as well as recommends gift ideas. Simultaneously, it addresses the challenge of coordinating gifts and budgets from multiple Gifters, all whilst maintaining the element of surprise.

Moreover, by simplifying event coordination and inviting participants through our platform, users can effortlessly manage their calendars. As the platform grows and more users join, it becomes increasingly "sticky," encouraging users to keep using it to plan all their events in one place.

#### Video Demo:

🔗 [Link to Video](https://drive.google.com/drive/folders/1Bj8cmMqy71FtyUclm_XhQRYNbt6Z9jw6?usp=sharing)

## Project Setup

### Frontend

#### Requirements

- Node.js (v14.0 or higher)
- npm (v6.0 or higher)
- React 18
- Vite

#### Steps

1. Clone the repository

   ```bash
   git clone https://github.com/KennethTeo2002/HackXperience-2025.git
   cd HackXperience-2025
   ```

2. Navigate to the frontend directory

   ```bash
   cd frontend
   ```

3. Install dependencies

   ```bash
   yarn install
   ```

4. Run the development server

   ```bash
   yarn start
   ```

5. Access the frontend at http://127.0.0.1:3000

### Backend

#### Requirements

- Python 3.9+
- FastAPI
- OpenAI API key

#### Steps

1. Navigate to the backend directory

   ```bash
   cd backend
   ```

2. Create a virtual environment (optional but recommended)

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use venv\Scripts\activate
   ```

3. Install dependencies

   ```bash
   pip install -r requirements.txt
   ```

4. Set up your environment variables

   ```bash
   # Create a .env file with your OpenAI API key
   echo "OPENAI_API_KEY = 'your-api-key'" > .env
   ```

5. Run the FastAPI server

   ```bash
   uvicorn app:app --reload
   ```

6. The API will be available at http://127.0.0.1:8000

### Key Features

1. **Event Creation and Management**

   - Create gifting events with details like date, time, location
   - Manage guest lists and track RSVPs
   - Set budget ranges for gifting coordination

2. **AI-Powered Gift Recommendations**

   - Generate personalized gift ideas based on recipient preferences
   - Smart suggestions that fit within specified budget ranges
   - Avoid duplicate gifts through coordination features

3. **Smart Questions Generator**

   - AI-generated questions to better understand recipient preferences
   - Categorized by relevance and type to help with information gathering
   - Helps remove the guesswork from gifting decisions

4. **Preference Collection and Aggregation**

   - Gather preferences from multiple sources and connections
   - Consolidate data to create a comprehensive recipient profile
   - Privacy-focused design that maintains surprise element

5. **Gift Coordination**
   - View what others have purchased to avoid duplicates
   - Budget management tools and spending visibility
   - Gift status tracking from purchase to delivery

### API Documentation

#### Gift Recommendation API

- **Endpoint**: `/recommend_gifts/event/{event_id}`
- **Method**: GET
- **Description**: Generates personalized gift ideas based on event preferences
- **Response**: JSON array of gift objects with names and reasons

#### Questions Generator API

- **Endpoint**: `/generate_questions/event/{event_id}`
- **Method**: GET
- **Description**: Creates relevant questions to ask about recipient preferences
- **Response**: JSON array of question objects with text and categories

### Architecture

Gify uses a modern, scalable architecture:

1. **Frontend**:

   - React 18 for component-based UI
   - Chakra UI for responsive design
   - React Query for efficient data fetching and caching
   - React Router for navigation

2. **Backend**:

   - FastAPI for high-performance API endpoints
   - Integration with OpenAI's GPT models for AI features
   - JSON file-based data storage (could be extended to databases)

3. **AI Integration**:
   - Custom prompting for tailored gift recommendations
   - Smart preference extraction and question generation
   - Data formatting for consistent frontend display

### Future Enhancements

1. **Loyalty Program Integration**

   - Connect with retail loyalty programs for point redemption
   - Special offers and discounts for platform users

2. **E-commerce Integration**

   - Direct purchase links to recommended products
   - Price comparison across different retailers

3. **Advanced Event Planning Tools**

   - Calendar integration for scheduling
   - Reminder system for upcoming events

4. **Mobile Application**

   - Native mobile experience for iOS and Android
   - Push notifications for event updates

5. **Machine Learning Personalization**
   - Improved recommendation accuracy over time
   - Personalized suggestions based on past successful gifts

### Team Members

- Kah Ho - [@kahkoii](https://github.com/kahkoii)
- Dong Kiat - [@dongkiat](https://github.com/dongkiat)
- Kenneth - [@KennethTeo2002](https://github.com/KennethTeo2002)
- Tze Xuan - [@tze-xuan](https://github.com/tze-xuan)

### License

This project is licensed under the MIT License - see the LICENSE file for details.
