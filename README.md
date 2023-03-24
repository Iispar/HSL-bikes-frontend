This project is still underway and production doesn't include all functions yet. Production should still work as planned.

# Background
In this project I use open data from HSL and display citybike trips for three months and also all stations for HSL citybikes. The project is split into two repositories. One for the [backgend](https://github.com/Iispar/solita-backend) and this for the frontend. You can know more about the backend from it's own repository. Shortly the data is based in mongoDB and the backend is an REST API that calls the data from mongo and processes it.

<br />
<br />

The original goal of the project was to overall get better at fullstack developement. I chose this kind of project because it had a complex frontend that has taught me alot about frontend developement with biggest learnings in creating a map with mapbox, learning Sass and getting better at css overall and also having a good structure for the application. I learned how to structure the frontend with grids, blocks and elements and especially using the BEM naming has helped me keep consistent structure. 

I also chose this project because it made me create an API and an own backend for the data. This also tought me alot especially into mongoose and how to query the database in an effective way.

# Prerequisites and Configurations
The project can be accessed form [here](https://bikes-frontend.vercel.app/).
The application can be also accessed by cloning the repository and using command npm install and npm start.
This should open the app into localhost:3000 and work with the backend. The project might give eslint errors because
I have some custom rules in the .eslintrc so I can give this file if needed. Please contact me if the project doesn't work.
# Using
The app should be self explanitory, but if not:
  You see all the journeys that have happened on the right and all the stations on the left. The journeys include where it starts and ends and also
  the distance and duration of the journey. You can filter the journeys
  with departure/return station where departure is where the journey start and return is where it ends. You can filter also
  by distance and minimun duration. You need to press search after setting the limits. You can also sort by hovering over the sort button and selecting a     sort. 
  <br />
  <br />
  On the left you can see all the stations with their ID on the left, name and location in the middle and capasity on the right. You can filter the
  stations by searching the name of the station. By clicking a station you open it's data.
  <br />
  <br />
  When a station is cliked you open it's information. Here on the left side of the screen is the stations name, location and data about the station. The stats include top 5 return and departure stations of all time or month which ever is selected by the dropdown menu from the "month". It also includes the current selections count of return and departure trips and average of a single trip. There is also an selection with stats, return and departure. Clicking these will switch between showing the stats, all returning trips here or all departing trips from here. On the right is a map that shows the location of the station. Clicking the selector at the top of the map shows the top 5 return or departure stations for the selected month. Clicking a journey from the returning or departing journeys you will see where this journey is coming from or going to.
# Tests
This project has jest and e2e tests. Simple jest tests that can be used by cloning the project and again using npm install
and then npm run test. E2e tests can be opened with npm run cypress:open and you <ins>NEED</ins> to have an application already running.
# Technologies 
I use React and js for the framework. Api calls are made with axios. E2e testing with cypress and basic unit tests with Jest.
I also use Jquery for the styles. I write css with Sass.

# TODO (after recruitment process)
-Endpoint to add data.
-Ui for adding data.
-Better tests.
