# You Pick!
Did your significant other, family member, friend, co-worker just tell you to pick something to do? Are you tired of always having to pick something fun and interesting to do on the spot? The You Pick app is here to help! The You Pick app knows what you love to do and finds interesting things to do fast and easy. Don't waste time trying to figure out what to do again!


## Features
- Create a profile of things you love to do.
- Save interesting events to revisit later.
- Intergrated weather app allows the results to be sorted by the weather that day.
- Different results based on who you're doing things with (eg. girlfriend, co-worker, friends)
- Randomize function finds interesting things in your area.


## API's
- Yelp API
- Open Weather API
## Data Proof
 - Yelp Data
![Alt text](./app/assets/images/YelpData.png?raw=true)
 - Weather Data
![Alt text](./app/assets/images/WeatherData.png?raw=true)

## Data Modeling
  ### Models:
  - Place Model: what data an individual place should contain.
  - Session Model: used to keep track of user details such as user-name, email ,password, favorite things.
  - Weather Model: used to get local weather report. data used to vary search results.
  - Saved Search Model: information saved for later use.
  ### Collections:
  - Places Collection: used to get search results from Yelp to display to user.
  - Saved Searches Collection: All searches that have been saved by the user.

## Routes
- (HOME) YOU PICK Page
- Login
- Register
- Settings
- Saved Searches Page
## Wire Frames
![Alt text](./app/assets/images/wireframe1.jpg?raw=true)
![Alt text](./app/assets/images/wireframe2.jpg?raw=true)
![Alt text](./app/assets/images/wireframe3.jpg?raw=true)

## Libraries/special Features
- geolocation (geoPlugin)

# MVP
 - Features:
    - Login/Register
    - get random idea based on weather location and type
      - hot vs cold weather
      - sunny vs raining
      - geolocation vs specified location
      - Food, Events, You Pick!
    - Logged in users can modify settings
    - logged in users get more specific suggestions based on settings
