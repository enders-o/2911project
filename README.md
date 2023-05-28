# TeamPlay
TeamPlay is an application for higher level sports players to join local competitive sport teams.

## Group Members
- Ender Sotelo
- Christopher Tang
- Jonathan Parras

## File Structure
```
./2911project
├── .circleci
│   └── config.yml
├── controller
│   ├── auth_controller.js
│   ├── team_controller.js
│   └── user_controller.js
├── middleware
│   ├── checkAuth.js
│   └── passport.js
├── public
│   ├── index.html
│   └── style.css
├── test
│   └── user.test.js
├── views
│   ├── auth
│   ├── partials
│   ├── team
│   ├── user
│   └──layout.ejs
├── .gitignore
├── database.json
├── index.js
├── package-lock.json
├── package.json
└── README.md
```
- All tests are found in the test folder
- .circleci foldercontains the config.yml file that handles CI/CD
- The controller folder handles the backend
- The public folder contains an html and css file which is the landing page (root) of the website
- The views folder contains the other pages
- The database.json file contains all of the database
- The index.js file handles the backend
## Instructions
### Setup
To run the application clone the repository onto your device.
1. Clone the repository, `git clone https://github.com/enders-o/2911project`
2. Change into the directory cloned `cd 2911project`
3. Install dependencies `npm install`
4. You should now be able to run the application either by doing `npm start` or `node index.js`
5. Open a web browser and in the url input `http://localhost:3001/`
### Using the application
- Note that the application does not update the local storage, so when the server is restarted any values changes will not be updated.
- To log into an account use one of the accounts in the database file, below are accounts that we recommend to use.
  - Recommended Manager Account 
    -  email: ellenyoung@gmail.com
    -  password: ey
  - Recommended Player Account
    - email: johndoe@gmail.com
    - password: jd
