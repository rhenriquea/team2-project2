# Team 2 - Project 2 BYUI 
## Moov App :tw-1f42e: 
This project is a team assignment created by Brigham Young University students'.
The objective is to implement a full-stack application using [Node.js](https://nodejs.dev/ "Node.js") with an [Express](https://expressjs.com/ "Express") server and manage data in a [MongoDB](https://www.mongodb.com/ "MongoDB") database.

The frontend uses [NuxtJS](https://nuxtjs.org/ "NuxtJS") to render the [REST API ](https://moovp2.herokuapp.com/ "REST API ") created for our app.

The backend code is deployed in [Heroku](https://www.heroku.com/ "Heroku") while the frontend was deployed using [Vercel](https://vercel.com/ "Vercel").

### Project Structure :tw-1f3e2:
Since the course module is based on the backend, all of the backend code lies on the root of the project, while the frontend is set in a directory called `frontend`. Although they rely on the same repository, this project is ***not*** configured to be a monorepo. Therefore all the dependencies needs to be installed separately.

### Installing the Dependencies :tw-1f4d5:

To install the backend dependencies simply run:

```
yarn install
```

To install the frontend dependencies go to the `frontend` directory and also run:

```
yarn install
```

### Environment  Variables :tw-1f4d9:
To preserve security, the environemnt variables are not available in the repository. They are configured in the live environment projects (Heroku and Vercel), but you need to request access for it when developing locally.

### Running Project Locally :tw-1f4d7:

#### Backend :tw-1f527:

1. Make sure to have your dependencies intalled. 
2. Run `yarn start`
3. The server should have started at `http://localhost:5000`

#### Frontend :tw-1f4ab:

1. Make sure to have your dependencies intalled. 
2. Make sure to have the backend running. 
3. Open a terminal in the frontend directory (`cd frontend`)
4. Run `yarn dev`
5. The server should have started at `http://localhost:3000`
