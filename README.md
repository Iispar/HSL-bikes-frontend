This project is still underway, but all pushed versions should work as intented, so please view it. Committed versions are the latest versions, that don't pass the tests yet.

# Bikes
This is a project where I used data from HSL's citybikes and display this data for the user. The data is located in mongoDB
and the backend is an REST API that I make the calls to. More about the backend can be read in its [repository](https://github.com/Iispar/solita-backend)
# Prerequisites and Configurations
The project can be accessed form [here](https://bikes-frontend-solita.vercel.app/).
The application can be also accessed by cloning the repository and using command npm install and npm start.
This should open the app into localhost:3000 and work with the backend. The project might give eslint errors because
I have some custom rules in the .eslintrc so I can give this file if needed. Please contact me if the project doesn't work.
# Using
The app should be self explanitory, but if not:
  You see all the journeys that have happened on the left and all the stations on the right. The journeys include where it starts and ends and also
  the distance and duration of the journey. You can filter the journeys
  with departure/return station where departure is where the journey start and return is where it ends. You can filter also
  by distance and minimun duration. You need to press search after setting the limits. You can also sort by hovering over the sort button and selecting a     sort. 
  <br />
  <br />
  On the right you can see all the stations with their ID on the left, name and location in the middle and capasity on the right. You can filter the
  stations by searching the name of the station. By clicking a station you open it's data. There you see top stations per month or all time and 
  you can choose top return or departure stations. You also see the count of the journeys and average distance on the right per the selected month.
  You also see the capasity of the station.
# Tests
This project has jest and e2e tests. Simple jest tests that can be used by cloning the project and again using npm install
and then npm run test. E2e tests can be opened with npm run cypress:open and you <ins>NEED</ins> to have an application already running.
# Technologies 
I use React and js for the framework. Api calls are made with axios. E2e testing with cypress and basic unit tests with Jest.
I also use Jquery for the styles.

# TODO (after recruitment process)
-Endpoint to add data.
-Ui for adding data.
-Display station location on map.
-Better tests.
-Sisplay journey start and end on map (?)
