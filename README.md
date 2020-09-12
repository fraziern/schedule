## Schedule: The Signup Sheet App

This is a full-stack "signup sheet" single page app, built on a MongoDB, Express, React, and Node platform.

### [Demo](http://www.nickfrazier.com/projects/1_schedule.html)

### Installation

1. Clone the repo and `cd schedule`

2. `npm install`

3. `npm run build`

4. `touch .env`

5. Add the following to the newly created .env file:

```
DB_URI=mongodb://localhost/test
PORT=3000
APP_URL=http://localhost:3000/
NODE_ENV=development
```

6. Install [MongoDB](https://www.mongodb.com/) if necessary, and start your MongoDB server in a separate terminal window with `mongod`. Note: this app was developed with db v.3.2.4.

7. `npm start`

This project was originally bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
