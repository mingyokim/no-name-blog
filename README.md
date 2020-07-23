# No Name Blog

- [No Name Blog](#no-name-blog)
  - [Introduction](#introduction)
    - [Development mode](#development-mode)
    - [Production mode](#production-mode)

## Introduction

This repo contains the front-end and back-end for a blog, without the database. You can use this repo to create your own blog, as long as you create your own Firebase project (which acts like a database) - you just need to supply the configuration of your Firebase project through environment variables. The blog was designed by [Fiona Yang](http://fionayang.me/). If you're just interesting in hosting your own blog, go straight to the [Production mode section](#production-mode).

### Setting up a firebase project
This blog's database is powered by Firebase. To host your own blog, create a Firebase project with Firestore database. When created, go to the Authentication tab > Sign-in methods, and enable Google provider. So far this blog only supports authentication with Google.

Also create a composite index in Database > Indexes, with the following information:

- Collection ID: `blogs_partial`
- Fields:
 1. Field path: `authorId`, `Ascending`
 2. Field path: `createdAt`, `Descending`
- Query scope: `Collection`

### Development mode

In the development mode, we will have 2 servers running. The front end code will be served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading. The server side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.

You will also need to set some environment variables. Go to your terminal and define a `FB_CLIENT` environment variable. It represents the configuration for firebase client - which you can obtain by pressing the gear button on the left panel on your Firebase console > Project Settings.

```
export FB_CLIENT_DEV="{
  \"apiKey\": \"xxx\",
  \"authDomain\": \"xxx.firebaseapp.com\",
  \"databaseURL\": \"https://xxx.firebaseio.com\",
  \"projectId\": \"xxx\",
  \"storageBucket\": \"xxx.appspot.com\",
  \"messagingSenderId\": \"xxx\",
  \"appId\": \"xxx\"
}"
```

You should also make a `.env` file at the root of this project. It should contain the following environment variables:

- `PORT`: The port where this project will run locally. If `PORT` is 8000, then you would go to `localhost:8000` to see your project running.
- `FIREBASE_SERVICE_ACCOUNT`: The service account secret of your Firebase project. Go to your console > Settings > Service Accounts, then click "Generate new private key" button. It should start downloading a json file, and you can just copy paste the content to the `.env` file.
- `FIREBASE_DATABASE_URL`: This is the same as `databaseURL` in the Firebase client configuration from the previous step.

```
PORT=8000
FIREBASE_CONFIG={"type": "service_account","project_id": "xxxx","private_key_id": "xxxx","private_key": "xxxx","client_email": "xxxx","client_id": "xxxx","auth_uri": "xxxx","token_uri": "xxxx","auth_provider_x509_cert_url": "xxxx","client_x509_cert_url": "xxxx"}
FIREBASE_DATABASE_URL="https://xxxx.firebaseio.com"
```

You can run the app locally like so:

```bash
# Clone the repository
git clone https://github.com/mingyokim/no-name-blog

# Go inside the directory
cd no-name-blog

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production mode

In the production mode, we will have only 1 server running. All the client side code will be bundled into static files using webpack and it will be served by the Node.js/Express application.

If you want to keep your development and production databases separate from each other, you can make another Firebase project for production environment. You can spin up as many blog sites as you like as long as you have a separate Firebase project for each blog site.

Which ever deployment method you use, make sure to define the same environment variables as we did in the local environment. To recap, you should define the following (the values for firebase environment variables will be different if you're using a separate firebase instance for production):

- `PORT` (should be `80`)
- `FIREBASE_SERVICE_ACCOUNT`
- `FIREBASE_DATABASE_URL`
- `FB_CLIENT_PROD` (the web configuration for firebase project being used for production environment)

I used Heroku to deploy my app. You can define environment variables for your server by going to Settings > Config vars.

Furthermore, you have to whitelist the domain of your production server in Firebase. Go to your console > Authentication > Sign-in Method. Scroll down to "Authorized domains" section and add your domain (e.g. my-blog.herokuapp.com)

### Firebase Hosting

Login to your firebase account `firebase login`. Then select a firebase project you want to use for your production environment using `firebase use` ((link for more details)[https://firebase.google.com/docs/cli#project_aliases]). Then run `firebase deploy` to deploy your app!
