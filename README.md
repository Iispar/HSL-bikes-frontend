# bikes-frontend-solita
Project for solitas pre assingment that is still underway. But feel free to view it still.
# Bikes
This is a project where I used data from HSL's citybikes and display this data for the user. The data is located in mongoDB
and the backend is an REST API that I make the calls to. More about the backend can be read in its [repository](https://github.com/Iispar/solita-backend)
# Prerequisites and Configurations
At the moment the application can be accessed only by cloning the repository and using command npm install and npm start.
This should open the app into localhost:3000 and work with the backend. The project might give eslint errors because
I have some custom rules in the .eslintrc so I can give this file if needed. Please contact me if the project doesn't work.
# Tests
This project has jest and e2e tests. Simple jest tests that can be used by cloning the project and again using npm install
and then npm run test. E2e tests can be opened with npm run cypress:open.
!!! these will fail at the moment as I'm still developing especially if you view the latest commit !!!
# Technologies 
I use React and js for the framework. Api calls are made with axios. E2e testing with cypress and basic unit tests with Jest.
I also use Jquery for the styles.
# Todo
Add alot of the styles for the project. Also an filter for filtering journey length.
