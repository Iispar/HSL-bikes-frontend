The project can be accessed from [here](https://bikes-frontend.vercel.app/).

# Background
In this project, I use open data from HSL and display city bike trips for three months and also all stations for HSL city bikes. The project is split into two repositories. One for the [backend](https://github.com/Iispar/solita-backend) and this for the frontend. You can learn more about the backend from its own repository. Shortly the data is based in MongoDB and the backend is an REST API that calls the data from Mongo and processes it.

<br />
<br />

The original goal of the project was to overall get better at full-stack development. I chose this kind of project because it had a complex frontend that has taught me a lot about frontend development with the biggest learnings in creating a map with Mapbox, learning Sass and getting better at CSS overall, and also having a good structure for the application. I learned how to structure the frontend with grids, blocks, and elements and especially using the BEM naming has helped me keep a consistent structure. 

I also chose this project because it made me create an API and my own backend for the data. This also taught me a lot, especially about Mongoose and how to query the database in an effective way.

# Prerequisites, Configurations, and using on own computer
The project can be accessed from [here](https://bikes-frontend.vercel.app/).
The application can be also accessed by cloning the repository and using commands ```npm install``` and ```npm start```.
This should open the app into localhost:3000 and work with the backend. The project might give eslint errors because
I have some custom rules in the .eslintrc so I can give this file if needed. Please contact me if the project doesn't work.

# Using
The app should be self-explanatory, but if not:
  You see all the journeys that have happened on the right and all the stations on the left. The journeys include where it starts and ends and also
  the distance and duration of the journey. You can filter the journeys
  with departure/return station where the departure is where the journey starts and return is where it ends. You can filter also
  by distance and minimum duration. You need to press search after setting the limits. You can also sort by hovering over the sort button and selecting a     sort. 
  <br />
  <br />
  On the left, you can see all the stations with their ID on the left, name, and location in the middle, and capacity on the right. You can filter the
  stations by searching the name of the station. By clicking a station you open its data.
  <br />
  <br />
  When a station is clicked you open its information. Here on the left side of the screen is the station name, location, and data about the station. The stats include the top 5 return and departure stations of all time or month whichever is selected by the dropdown menu from the "month". It also includes the current selection count of return and departure trips and an average of a single trip. There is also a selection with stats, return, and departure. Clicking these will switch between showing the stats, all returning trips here, or all departing trips from here. On the right is a map that shows the location of the station. Clicking the selector at the top of the map shows the top 5 return or departure stations for the selected month. Clicking a journey from the returning or departing journeys you will see where this journey is coming from or going to.
# Tests
This project has jest and e2e tests. Simple jest tests that can be used by cloning the project and again using npm install
and then npm run test. E2e tests can be opened with npm run cypress:open and you <ins>NEED</ins> to have an application already running.
# Technologies 
I use React and JS for the framework. API calls are made with axios. E2e testing with Cypress and basic unit tests with Jest.
I also use JQuery for the styles. I write CSS with Sass.
